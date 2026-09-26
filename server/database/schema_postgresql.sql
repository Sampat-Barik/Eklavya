-- ============================================================================
-- 5-LEVEL ROLE-BASED ACCESS CONTROL (RBAC) SCHEMA FOR CLUB / NGO ORGANIZATION
-- PostgreSQL DDL with Constraints, Triggers, Foreign Keys & Indexes
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ENUMS FOR ROLES, DOMAINS, PRIORITIES, AND STATUSES
-- ============================================================================

CREATE TYPE role_level_type AS ENUM (
    'super_admin',      -- Level 1: Complete system control & sole role assigner
    'admin',            -- Level 2: General club management, events, onboarding
    'domain_lead',      -- Level 3: Department-specific management & task delegation
    'club_member',      -- Level 4: Personalized profile & domain-internal access
    'public_user'       -- Level 5: Public read-only access
);

CREATE TYPE club_domain_slug AS ENUM (
    'video_editing',
    'graphics_design',
    'teaching',
    'volunteering',
    'content_writing',
    'web_development',
    'pr',
    'management'
);

CREATE TYPE task_priority_type AS ENUM (
    'low',
    'medium',
    'high',
    'urgent'
);

CREATE TYPE task_status_type AS ENUM (
    'pending',
    'in_progress',
    'submitted',
    'completed'
);

CREATE TYPE event_status_type AS ENUM (
    'draft',
    'published',
    'archived'
);

-- ============================================================================
-- 2. ROLES TABLE (Static 5-Level Definition)
-- ============================================================================

CREATE TABLE roles (
    level INT PRIMARY KEY CHECK (level BETWEEN 1 AND 5),
    role_key role_level_type UNIQUE NOT NULL,
    role_name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO roles (level, role_key, role_name, description) VALUES
(1, 'super_admin', 'Level 1: Super Admin', 'Complete system control. The only role authorized to assign, modify, or revoke user roles and modify website settings.'),
(2, 'admin', 'Level 2: Admin', 'General club management. Can create, edit, delete events, onboard members (cannot assign Admin/Super Admin), and manage content.'),
(3, 'domain_lead', 'Level 3: Domain Lead', 'Department-specific management. Can create, assign, and track tasks strictly for Level 4 members in their domain.'),
(4, 'club_member', 'Level 4: Active Club Member', 'Domain internal access. Access to personalized profile, view internal schedule, and view/submit assigned tasks.'),
(5, 'public_user', 'Level 5: Normal User', 'Normal public users. Cannot be active members. Public read-only access to portal, events calendar, and about us.');

-- ============================================================================
-- 3. DOMAINS TABLE (8 Designated Club Departments)
-- ============================================================================

CREATE TABLE domains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug club_domain_slug UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    lead_user_id UUID, -- Foreign key added below after users table
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed the 8 required domains
INSERT INTO domains (slug, name, description) VALUES
('video_editing', 'Video Editing', 'Reels, event recaps, docu-shorts, promotional edits and animations.'),
('graphics_design', 'Graphics Design', 'Posters, social media creatives, brochures, banners and event kits.'),
('teaching', 'Teaching', 'Village evening classes, remedial tutoring, STEM and literacy sessions.'),
('volunteering', 'Volunteering', 'Ground relief operations, animal feeding drives and community camps.'),
('content_writing', 'Content Writing', 'Annual reports, newsletters, blog articles, scripts and press releases.'),
('web_development', 'Web Development', 'Club portals, live operations mapping, certificates ledger and web apps.'),
('pr', 'Public Relations (PR)', 'Sponsor outreach, college liaison, media coverage and stakeholder partnerships.'),
('management', 'Management', 'Logistics coordination, meeting schedules, resource planning and finance tracking.');

-- ============================================================================
-- 4. USERS TABLE
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_level INT NOT NULL REFERENCES roles(level) ON UPDATE CASCADE,
    domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
    is_suspended BOOLEAN DEFAULT FALSE,
    department VARCHAR(150),
    batch VARCHAR(20),
    phone VARCHAR(30),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Level 1-4 are active organization members; Level 5 normal users are strictly non-members
    is_active_member BOOLEAN GENERATED ALWAYS AS (role_level <= 4) STORED,

    -- Constraint: Domain Leads & Members MUST belong to a domain; Level 5 normal users CANNOT have a domain
    CONSTRAINT check_domain_assignment CHECK (
        ((role_level NOT IN (3, 4)) OR (domain_id IS NOT NULL)) AND
        ((role_level != 5) OR (domain_id IS NULL))
    )
);

-- Complete circular FK for domains.lead_user_id
ALTER TABLE domains 
ADD CONSTRAINT fk_domain_lead_user 
FOREIGN KEY (lead_user_id) REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_level ON users(role_level);
CREATE INDEX idx_users_domain_id ON users(domain_id);

-- ============================================================================
-- 5. TASKS TABLE (Strict Domain Delegation Model)
-- ============================================================================

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    assigned_to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    created_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    priority task_priority_type DEFAULT 'medium',
    status task_status_type DEFAULT 'pending',
    due_date DATE NOT NULL,
    submission_note TEXT,
    submission_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_domain_id ON tasks(domain_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to_user_id);
CREATE INDEX idx_tasks_status ON tasks(status);

-- Trigger: Ensure assigned_to member belongs to the same domain as the task
CREATE OR REPLACE FUNCTION validate_task_member_domain()
RETURNS TRIGGER AS $$
DECLARE
    member_domain UUID;
    member_level INT;
BEGIN
    SELECT domain_id, role_level INTO member_domain, member_level
    FROM users WHERE id = NEW.assigned_to_user_id;

    IF member_domain IS DISTINCT FROM NEW.domain_id THEN
        RAISE EXCEPTION 'Constraint Violation: Assigned member does not belong to this task domain.';
    END IF;

    IF member_level NOT IN (3, 4) THEN
        RAISE EXCEPTION 'Constraint Violation: Tasks can only be assigned to Level 4 Club Members (or Level 3 Leads). Level 5 users are normal users and cannot be active members.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_task_member_domain
BEFORE INSERT OR UPDATE OF domain_id, assigned_to_user_id ON tasks
FOR EACH ROW EXECUTE FUNCTION validate_task_member_domain();

-- ============================================================================
-- 6. EVENTS TABLE (Club Management)
-- ============================================================================

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    banner_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status event_status_type DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_is_public ON events(is_public);

-- ============================================================================
-- 7. AUDIT LOGS TABLE (Super Admin Oversight)
-- ============================================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_email VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_resource VARCHAR(255) NOT NULL,
    details JSONB,
    result VARCHAR(20) DEFAULT 'success',
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
