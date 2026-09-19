import React from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';

export const EventsAdmin: React.FC = () => {
  const events = [
    {
      id: '1',
      title: 'Flood Relief Camp',
      year: '2026',
      description: 'On August 18, 2026, Team Eklavya delivered emergency relief—including dry food, clean water, ORS, Dettol...',
      img: '/eklavya_human_hero.jpg'
    },
    {
      id: '2',
      title: 'Survey 2k26',
      year: '2026',
      description: 'On the bright morning of 10th May 2026, Team Eklavya carried forward its mission of empowering new minds...',
      img: '/eklavya_hero_bg.jpg'
    },
    {
      id: '3',
      title: "Rabindra Jayanti & Mother's Day",
      year: '2026',
      description: 'On 9th May 2026, Team Eklavya organized a heartwarming celebration of Rabindra Jayanti and Pre-Mother’s Day at...',
      img: '/eklavya_animal_care.jpg'
    },
    {
      id: '4',
      title: 'Animal Rescue & Feeding',
      year: '2023',
      description: 'Eklavya’s dedicated team organizes regular rescue missions to aid stray animals in distress, providing medical care,...',
      img: '/eklavya_animal_care.jpg'
    },
    {
      id: '5',
      title: 'Nukkad: Swadhinatar Mane',
      year: '2025',
      description: 'This street play delves into the profound meaning of independence. It moves beyond historical milestones to...',
      img: '/eklavya_human_hero.jpg'
    },
    {
      id: '6',
      title: 'Animal Feeding Drive',
      year: '2023',
      description: 'Our recent Animal Feeding Drive nourished over 40 stray animals across Haldia. Volunteers united to distribute...',
      img: '/eklavya_animal_care.jpg'
    },
    {
      id: '7',
      title: 'Students’ Survey 2k25',
      year: '2025',
      description: 'Field survey mapping primary educational deficits across brick-kiln worker settlements in Haldia...',
      img: '/eklavya_hero_bg.jpg'
    },
    {
      id: '8',
      title: 'Animal Welfare Awareness Camp',
      year: '2025',
      description: 'Interactive classroom workshop introducing humane handling of community animals and anti-rabies guidance...',
      img: '/eklavya_human_hero.jpg'
    },
    {
      id: '9',
      title: 'Sterilisation & Rabies Drive',
      year: '2024',
      description: 'Comprehensive animal birth control and vaccination drive in collaboration with registered veterinary doctors...',
      img: '/eklavya_animal_care.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-black text-slate-900">
              Events Management
            </h1>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {events.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage all Eklavya events, drives, photo schedules, and Instagram dispatches.
          </p>
        </div>

        <button
          onClick={() => alert('New Event modal triggered')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus size={15} />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Events Grid matching Screenshot 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="h-44 overflow-hidden bg-slate-100">
                <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{ev.title}</h3>
                  <span className="text-[10px] font-bold text-slate-400">{ev.year}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {ev.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between text-xs pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <span>View Instagram Post</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                onClick={() => alert(`Edit event: ${ev.title}`)}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-900"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
