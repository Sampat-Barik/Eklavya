// MongoDB & Service Layer Data Types for Eklavya Socio-Animal Welfare Society

export interface ImpactMetric {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  category: 'education' | 'animal' | 'community' | 'all';
  trend?: string;
}

export interface ProgramCause {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Education' | 'Animal Welfare' | 'Emergency Relief' | 'Student Empowerment';
  imageUrl: string;
  raisedAmount: number;
  goalAmount: number;
  beneficiariesCount: number;
  beneficiariesUnit: string; // e.g. "Children Enrolled", "Animals Vaccinated"
  activeVolunteers: number;
  isFeatured?: boolean;
  tags: string[];
}

export interface NGOEvent {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO format: '2026-08-10'
  time?: string;
  location: string;
  category: 'Social Relief' | 'Education' | 'Animal Welfare' | 'Campus Drive';
  isUpcoming: boolean;
  attendeesCount: number;
  capacity?: number;
  imageUrl?: string;
  organizer?: string;
}

export interface StoryPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  publishedAt: string;
  readTime: string;
  category: 'Village Impact' | 'Animal Care' | 'Volunteer Voice' | 'Field Report';
  imageUrl: string;
  impactHighlight?: string;
  tags: string[];
}

export interface DonationTier {
  id: string;
  amount: number;
  title: string;
  impactDescription: string;
  iconName: string;
  isPopular?: boolean;
}
