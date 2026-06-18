import { useState, useEffect } from 'react';

// Define the Event interface to type our data
interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export const Events = () => {
  // State to hold our events data
  const [events, setEvents] = useState<Event[]>([]);
  // State to handle loading UI
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState('');

  // useEffect runs when the component mounts
  // This is where we fetch data from our backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // In the future, this will be replaced with the actual backend URL
        const response = await fetch('http://localhost:5000/api/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        // Fallback dummy data so the UI isn't completely empty before backend is built
        setError('Backend is not running yet. Displaying dummy data.');
        setEvents([
          { _id: '1', title: 'Campus Clean Drive', description: 'Cleaning the college campus.', date: '2026-07-01', location: 'HIT Campus' },
          { _id: '2', title: 'Dog Feeding Drive', description: 'Feeding stray dogs in the locality.', date: '2026-07-05', location: 'City Center' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div className="text-center py-10">Loading events...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Upcoming Events</h1>
      
      {error && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-6 border border-yellow-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-card text-card-foreground border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {new Date(event.date).toLocaleDateString()} | {event.location}
              </p>
              <p className="text-foreground line-clamp-3">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && !error && (
        <p className="text-muted-foreground text-center py-10">No events found.</p>
      )}
    </div>
  );
};
