import React, { useState } from 'react';
import {
  Plus,
  ArrowUpRight,
  Pencil,
  Trash2,
  X,
  Upload,
  Calendar,
  Search,
  Filter,
  Sparkles
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface EventItem {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  img: string;
  instagramUrl?: string;
}

const INITIAL_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Flood Relief Camp',
    year: '2026',
    category: 'Disaster Relief',
    description: 'On August 18, 2026, Team Eklavya delivered emergency relief—including dry food, clean water, ORS, Dettol, and sanitation essentials—to 200+ flood-affected families.',
    img: '/eklavya_human_hero.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '2',
    title: 'Survey 2k26',
    year: '2026',
    category: 'Education',
    description: 'On the bright morning of 10th May 2026, Team Eklavya carried forward its mission of empowering new minds through an extensive primary schooling needs survey across Haldia.',
    img: '/eklavya_hero_bg.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '3',
    title: "Rabindra Jayanti & Mother's Day",
    year: '2026',
    category: 'Cultural & Social',
    description: 'On 9th May 2026, Team Eklavya organized a heartwarming celebration of Rabindra Jayanti and Pre-Mother’s Day with rural children, distributing sketchbooks and sweets.',
    img: '/eklavya_animal_care.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '4',
    title: 'Animal Rescue & Feeding',
    year: '2023',
    category: 'Animal Welfare',
    description: 'Eklavya’s dedicated team organizes regular rescue missions to aid stray animals in distress, providing medical care, antiseptic dressing, and daily nourishment.',
    img: '/eklavya_animal_care.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '5',
    title: 'Nukkad: Swadhinatar Mane',
    year: '2025',
    category: 'Cultural & Social',
    description: 'This street play delves into the profound meaning of independence. It moves beyond historical milestones to ignite reflections on communal empathy and human rights.',
    img: '/eklavya_human_hero.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '6',
    title: 'Animal Feeding Drive',
    year: '2023',
    category: 'Animal Welfare',
    description: 'Our recent Animal Feeding Drive nourished over 40 stray animals across Haldia. Volunteers united to distribute healthy porridge and fresh water bowls.',
    img: '/eklavya_animal_care.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '7',
    title: "Students’ Survey 2k25",
    year: '2025',
    category: 'Education',
    description: 'Field survey mapping primary educational deficits across brick-kiln worker settlements in Haldia to allocate evening volunteer tutors.',
    img: '/eklavya_hero_bg.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '8',
    title: 'Animal Welfare Awareness Camp',
    year: '2025',
    category: 'Animal Welfare',
    description: 'Interactive classroom workshop introducing humane handling of community animals and anti-rabies guidance for local youth.',
    img: '/eklavya_human_hero.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  },
  {
    id: '9',
    title: 'Sterilisation & Rabies Drive',
    year: '2024',
    category: 'Animal Welfare',
    description: 'Comprehensive animal birth control and vaccination drive in collaboration with registered veterinary doctors across Haldia municipal wards.',
    img: '/eklavya_animal_care.jpg',
    instagramUrl: 'https://instagram.com/eklavya_hit'
  }
];

const CATEGORIES = [
  'All',
  'Disaster Relief',
  'Education',
  'Animal Welfare',
  'Cultural & Social',
  'Awareness Drive'
];

export const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formYear, setFormYear] = useState(new Date().getFullYear().toString());
  const [formCategory, setFormCategory] = useState('Disaster Relief');
  const [formDescription, setFormDescription] = useState('');
  const [formImg, setFormImg] = useState('/eklavya_human_hero.jpg');
  const [formInstagramUrl, setFormInstagramUrl] = useState('https://instagram.com/eklavya_hit');
  const [previewUrl, setPreviewUrl] = useState('');

  // Open modal for new event
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormYear(new Date().getFullYear().toString());
    setFormCategory('Disaster Relief');
    setFormDescription('');
    setFormImg('/eklavya_human_hero.jpg');
    setFormInstagramUrl('https://instagram.com/eklavya_hit');
    setPreviewUrl('/eklavya_human_hero.jpg');
    setIsModalOpen(true);
  };

  // Open modal for editing event
  const handleOpenEdit = (event: EventItem) => {
    setEditingId(event.id);
    setFormTitle(event.title);
    setFormYear(event.year);
    setFormCategory(event.category);
    setFormDescription(event.description);
    setFormImg(event.img);
    setFormInstagramUrl(event.instagramUrl || 'https://instagram.com/eklavya_hit');
    setPreviewUrl(event.img);
    setIsModalOpen(true);
  };

  // Delete event
  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setEvents((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Handle local image upload preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormImg(url);
    }
  };

  // Save event (Create or Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      // Update
      setEvents((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: formTitle,
                year: formYear,
                category: formCategory,
                description: formDescription,
                img: formImg || previewUrl || '/eklavya_human_hero.jpg',
                instagramUrl: formInstagramUrl
              }
            : item
        )
      );
    } else {
      // Create New
      const newEvent: EventItem = {
        id: Date.now().toString(),
        title: formTitle,
        year: formYear,
        category: formCategory,
        description: formDescription,
        img: formImg || previewUrl || '/eklavya_human_hero.jpg',
        instagramUrl: formInstagramUrl
      };
      setEvents((prev) => [newEvent, ...prev]);
    }

    setIsModalOpen(false);
  };

  // Distinct list of available years for filter
  const years = ['All', ...Array.from(new Set(events.map((e) => e.year))).sort().reverse()];

  // Filtered list
  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || ev.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-black text-teal-950">Events Management</h1>
            <span className="text-xs font-bold text-teal-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              {events.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Organize, publish, and update Eklavya social welfare drives, surveys, and live field operations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-800 to-emerald-700 hover:from-teal-700 hover:to-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-teal-900/10 hover:shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white/80 backdrop-blur-sm border border-emerald-100/80 p-3 rounded-2xl shadow-2xs">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-slate-900"
          />
        </div>

        {/* Category & Year Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
            <Filter size={13} />
            <span className="hidden sm:inline">Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-600"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0 ml-2">
            <Calendar size={13} />
            <span className="hidden sm:inline">Year:</span>
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-600"
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white/60 border border-dashed border-emerald-200 rounded-2xl p-8 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-teal-700 flex items-center justify-center">
            <Sparkles size={22} />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No events match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or filters, or add a new event using the button above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedYear('All');
            }}
            className="text-xs font-bold text-teal-800 hover:underline pt-2 inline-block cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white/90 backdrop-blur-sm border border-emerald-100/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Event Photo Cover */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[10px] font-bold text-teal-950 shadow-xs">
                      {ev.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono font-bold text-white shadow-xs">
                      {ev.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="font-bold text-base text-teal-950 leading-snug group-hover:text-teal-700 transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {ev.description}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-5 pt-0 border-t border-emerald-50 flex items-center justify-between text-xs pt-3.5 bg-slate-50/50">
                <a
                  href={ev.instagramUrl || 'https://instagram.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-800 hover:text-teal-950 font-bold flex items-center gap-1.5 transition-colors group/link"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                  <span>View Instagram Post</span>
                  <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(ev)}
                    className="p-1.5 text-slate-500 hover:text-teal-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Event"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id, ev.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD / EDIT EVENT MODAL (Matching User's Snipping Tool Requirement)       */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-emerald-100 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div>
                <h2 className="text-xl font-serif font-black text-teal-950">
                  {editingId ? 'Edit Event' : 'Add New Event'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter details to publish or update this community drive.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Cover Image Upload / Dropzone */}
              <div>
                <label className="block text-xs font-bold text-teal-950 mb-1.5">
                  Event Cover Image*
                </label>
                <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-4 text-center hover:border-teal-600 transition-colors bg-emerald-50/30 relative">
                  {previewUrl ? (
                    <div className="relative h-36 w-full rounded-xl overflow-hidden mb-2 group">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold bg-slate-900/80 px-3 py-1.5 rounded-full">
                          Click to change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 space-y-1">
                      <Upload size={24} className="mx-auto text-emerald-600 mb-1" />
                      <p className="text-xs font-bold text-teal-900">Choose File or drag & drop</p>
                      <p className="text-[10px] text-slate-500">Upload a high-quality photo (JPG, PNG)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>

              {/* Title & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-teal-950 mb-1">Event Title*</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Annual Relief Drive 2026"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-700 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-teal-950 mb-1">Year*</label>
                  <input
                    type="text"
                    required
                    placeholder="2026"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-700 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-teal-950 mb-1">Category*</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-700 bg-slate-50/50"
                >
                  <option value="Disaster Relief">Disaster Relief</option>
                  <option value="Education">Education</option>
                  <option value="Animal Welfare">Animal Welfare</option>
                  <option value="Cultural & Social">Cultural & Social</option>
                  <option value="Awareness Drive">Awareness Drive</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-teal-950 mb-1">Description*</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail the event objectives, date, beneficiary impact, and volunteer headcount..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-700 bg-slate-50/50 resize-none"
                />
              </div>

              {/* Instagram URL */}
              <div>
                <label className="block text-xs font-bold text-teal-950 mb-1">Instagram Post URL</label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/p/..."
                  value={formInstagramUrl}
                  onChange={(e) => setFormInstagramUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-700 bg-slate-50/50"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-800 to-emerald-700 hover:from-teal-700 hover:to-emerald-600 text-white text-xs font-bold shadow-sm shadow-teal-900/10 cursor-pointer transition-all"
                >
                  {editingId ? 'Save Changes' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsAdmin;
