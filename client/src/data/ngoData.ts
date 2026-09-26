import type { ImpactMetric, ProgramCause, NGOEvent, StoryPost, DonationTier } from '../types/ngo';

export const mockImpactMetrics: ImpactMetric[] = [
  {
    id: 'children-taught',
    value: 150,
    prefix: '',
    suffix: '+',
    label: 'Underprivileged Children',
    sublabel: 'Educated daily in free evening classes',
    category: 'education',
    trend: '+25% this semester'
  },
  {
    id: 'animals-rescued',
    value: 120,
    prefix: '',
    suffix: '+',
    label: 'Stray Animals Rescued',
    sublabel: 'Provided emergency medical aid & surgeries',
    category: 'animal',
    trend: '24/7 rescue helpline'
  },
  {
    id: 'hit-volunteers',
    value: 60,
    prefix: '',
    suffix: '+',
    label: 'Student Volunteers',
    sublabel: 'Dedicated engineers & changemakers from HIT',
    category: 'community',
    trend: 'Active campus squad'
  },
  {
    id: 'rural-drives',
    value: 45,
    prefix: '',
    suffix: '+',
    label: 'Community Events',
    sublabel: 'Book donations, food relief & rabies camps',
    category: 'community',
    trend: 'Haldia & rural periphery'
  },
  {
    id: 'vaccinations',
    value: 280,
    prefix: '',
    suffix: '+',
    label: 'Anti-Rabies Shots',
    sublabel: 'Administered across Haldia neighborhoods',
    category: 'animal',
    trend: '100% infection-free zones'
  },
  {
    id: 'fund-transparency',
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'Fund Transparency',
    sublabel: 'Every rupee accounted on public student ledgers',
    category: 'community',
    trend: 'Zero overhead deduction'
  }
];

export const mockPrograms: ProgramCause[] = [
  {
    _id: 'cause-1',
    slug: 'free-primary-evening-school',
    title: 'Free Daily Evening Schools',
    subtitle: 'Nurturing young minds in rural Haldia under the banyan canopy',
    description:
      'Providing consistent primary education, homework guidance, stationery kits, and nutritious evening snacks to children from marginalized laborer communities near Haldia.',
    category: 'Education',
    imageUrl: '/eklavya_human_hero.jpg',
    raisedAmount: 92000,
    goalAmount: 140000,
    beneficiariesCount: 150,
    beneficiariesUnit: 'Students Enrolled',
    activeVolunteers: 28,
    isFeatured: true,
    tags: ['Primary Education', 'Stationery Distribution', 'Evening Classes']
  },
  {
    _id: 'cause-2',
    slug: 'stray-animal-care-feeding',
    title: 'Stray Animal Rescue & Campus Feeding',
    subtitle: 'Compassionate medical care and emergency first-aid for voiceless lives',
    description:
      'Operating emergency rescue response for injured stray animals, conducting regular veterinary wound dressings, anti-rabies vaccination camps, and clean daily feeding stations across campus.',
    category: 'Animal Welfare',
    imageUrl: '/eklavya_animal_care.jpg',
    raisedAmount: 68000,
    goalAmount: 100000,
    beneficiariesCount: 120,
    beneficiariesUnit: 'Animals Treated',
    activeVolunteers: 22,
    isFeatured: true,
    tags: ['Emergency First-Aid', 'Vaccination', 'Daily Feeding']
  },
  {
    _id: 'cause-3',
    slug: 'rural-winter-flood-relief',
    title: 'Rural Relief & Winter Blanket Relief',
    subtitle: 'Warmth and disaster assistance for underprivileged families',
    description:
      'Distributing warm blankets, clean drinking water kits, dry ration packets, and sanitary hygiene kits to riverside settlements vulnerable to monsoons and winter chill.',
    category: 'Emergency Relief',
    imageUrl: '/eklavya_hero_bg.jpg',
    raisedAmount: 48000,
    goalAmount: 75000,
    beneficiariesCount: 300,
    beneficiariesUnit: 'Families Supported',
    activeVolunteers: 35,
    tags: ['Winter Blankets', 'Ration Kits', 'Emergency Support']
  },
  {
    _id: 'cause-4',
    slug: 'student-social-leadership',
    title: 'Student Volunteer Leadership & Mentorship',
    subtitle: 'Empowering college engineers to champion grassroot social impact',
    description:
      'Training student volunteers in first-aid response, pedagogical mentorship, leadership ethics, and community organizing—transforming youth potential into lasting social progress.',
    category: 'Student Empowerment',
    imageUrl: '/eklavya_human_hero.jpg',
    raisedAmount: 32000,
    goalAmount: 50000,
    beneficiariesCount: 65,
    beneficiariesUnit: 'Active Fellows',
    activeVolunteers: 40,
    tags: ['Leadership', 'Skill Building', 'Youth Fellowship']
  }
];

export const mockEvents: NGOEvent[] = [
  {
    _id: 'event-1',
    title: 'Flood Relief & Dry Ration Distribution Camp 2026',
    description:
      'Distributing essential food packets, clean water chlorination kits, and emergency medicines to flood-affected families near Haldia riverside basin.',
    date: '2026-10-12',
    time: '09:00 AM - 04:00 PM',
    location: 'Haldia Riverside Colony, Haldia',
    category: 'Social Relief',
    isUpcoming: true,
    attendeesCount: 42,
    capacity: 60,
    imageUrl: '/eklavya_hero_bg.jpg',
    organizer: 'Eklavya Relief Taskforce'
  },
  {
    _id: 'event-2',
    title: 'Mega Book, Notebook & Geometry Kit Event',
    description:
      'Annual academic supplies collection event to equip 150+ village children for the upcoming academic session with schoolbags, pencils, and books.',
    date: '2026-10-28',
    time: '11:00 AM - 05:00 PM',
    location: 'HIT Student Activity Center, Main Quad',
    category: 'Education',
    isUpcoming: true,
    attendeesCount: 78,
    capacity: 100,
    imageUrl: '/eklavya_human_hero.jpg',
    organizer: 'Eklavya Education Cell'
  },
  {
    _id: 'event-3',
    title: 'Anti-Rabies Vaccination & Health Checkup Camp',
    description:
      'Vaccinating over 90 community dogs in and around the Haldia Campus periphery in collaboration with registered veterinary doctors.',
    date: '2026-11-05',
    time: '08:30 AM - 01:00 PM',
    location: 'HIT Gate 1 & Surrounding Rural Belt',
    category: 'Animal Welfare',
    isUpcoming: true,
    attendeesCount: 30,
    capacity: 40,
    imageUrl: '/eklavya_animal_care.jpg',
    organizer: 'Eklavya Animal Protection Squad'
  },
  {
    _id: 'event-4',
    title: 'Independence Day Cleanliness & Cloth Distribution',
    description:
      'Distributing clean clothes and setting up waste awareness kiosks across rural Haldia school zones.',
    date: '2026-08-15',
    time: '10:00 AM - 02:00 PM',
    location: 'Bhabanipur Village Center',
    category: 'Campus Event',
    isUpcoming: false,
    attendeesCount: 55,
    imageUrl: '/eklavya_human_hero.jpg',
    organizer: 'Eklavya Volunteer Cohort'
  }
];

export const mockStories: StoryPost[] = [
  {
    _id: 'story-1',
    slug: 'from-village-courtyard-to-honors-roll',
    title: 'From an Evening Class under the Tree to Class Topper: Meet Rajesh',
    excerpt:
      'Rajesh, a 10-year-old child of a local brick-kiln worker, struggled to read simple sentences. Six months at Eklavya changed everything.',
    content:
      'When Rajesh first joined our evening class conducted under the banyan tree near Haldia riverbank, he was shy and hesitant to hold a pencil. Our engineering student volunteers took turns mentoring him one-on-one with illustrated flashcards and playful math games.\n\nToday, Rajesh has scored top marks in his municipal school exams and dreams of becoming a software engineer. His mother tearfully shared: "I never learned to read my own name, but seeing my son read English signs fills our home with pride." This is why Eklavya exists.',
    author: {
      name: 'Priya Sharma',
      role: 'Head of Education Mentorship, 4th Year CSE, HIT'
    },
    publishedAt: '2026-09-10',
    readTime: '4 min read',
    category: 'Village Impact',
    imageUrl: '/eklavya_human_hero.jpg',
    impactHighlight: 'Rajesh now reads at Grade 6 level and coaches younger siblings.',
    tags: ['Primary Education', 'Rural Transformation', 'Student Mentorship']
  },
  {
    _id: 'story-2',
    slug: 'the-recovery-of-sheru-campus-guardian',
    title: 'The Miraculous Healing of Sheru: Haldia’s Campus Companion',
    excerpt:
      'Hit by a speeding truck on the highway, Sheru was left bleeding and paralyzed in his hind legs. The Eklavya emergency rescue squad swung into action.',
    content:
      'Late on a rainy Tuesday evening, a distress call reached our emergency volunteer WhatsApp line. Sheru, a friendly stray dog loved by college students, was found severely injured near the NH junction.\n\nOur student volunteers rushed him to the local veterinary clinic, pooled personal pocket money for medications, and tended his wounds daily for seven weeks. Today, Sheru walks again without a limp, enthusiastically wagging his tail whenever students walk past the college library.',
    author: {
      name: 'Aniket Mukherjee',
      role: 'Animal Rescue Lead, 3rd Year ME, HIT'
    },
    publishedAt: '2026-08-24',
    readTime: '3 min read',
    category: 'Animal Care',
    imageUrl: '/eklavya_animal_care.jpg',
    impactHighlight: 'Sheru fully recovered after 7 weeks of intensive volunteer rehabilitation.',
    tags: ['Animal Rescue', 'Campus Pets', 'Compassion in Action']
  },
  {
    _id: 'story-3',
    slug: 'why-engineering-students-choose-social-good',
    title: 'Beyond Textbooks: How Teaching Village Children Rebuilt Our Purpose',
    excerpt:
      'Between circuit theory and coding assignments, 60 college students spend their dusk hours teaching children and nursing stray animals.',
    content:
      'College life is often defined by exams and placements. But for our volunteers at Eklavya, true education begins when we step outside the campus gates into the rural settlements of Haldia.\n\nTeaching a child how fractions work or staying up till 2 AM to watch over a dehydrated puppy teaches leadership and empathy that no classroom lecture ever could.',
    author: {
      name: 'Rohit Sen',
      role: 'President, Eklavya Society'
    },
    publishedAt: '2026-08-01',
    readTime: '5 min read',
    category: 'Volunteer Voice',
    imageUrl: '/eklavya_hero_bg.jpg',
    impactHighlight: 'Over 12,000+ volunteer hours clocked by HIT student leaders.',
    tags: ['Student Leadership', 'Youth Impact', 'Culture of Giving']
  }
];

export const mockDonationTiers: DonationTier[] = [
  {
    id: 'tier-250',
    amount: 250,
    title: 'School Starter Kit',
    impactDescription: 'Provides notebooks, pencils, eraser & crayons for 1 village child for a full quarter.',
    iconName: 'BookOpen'
  },
  {
    id: 'tier-500',
    amount: 500,
    title: 'Animal First-Aid & Vaccine',
    impactDescription: 'Sponsors 1 anti-rabies vaccine and anti-parasitic treatment for a stray dog.',
    iconName: 'Shield',
    isPopular: true
  },
  {
    id: 'tier-1000',
    amount: 1000,
    title: 'Month of Evening Education',
    impactDescription: 'Sponsors teaching supplies and nutritious evening milk & biscuits for 3 children for 1 month.',
    iconName: 'Heart'
  },
  {
    id: 'tier-2500',
    amount: 2500,
    title: 'Emergency Medical Camp Squad',
    impactDescription: 'Funds medical dressing supplies, antiseptic washes, and volunteer field kits for a monthly camp.',
    iconName: 'Sparkles'
  }
];
