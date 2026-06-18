import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Function to handle form submission for creating a new event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setStatus(null);

    // Get the JWT token from localStorage (saved during login)
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Send the token in the Authorization header to prove admin status
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, date, location }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event. Ensure backend is running.');
      }

      setStatus({ type: 'success', message: 'Event created successfully!' });
      // Reset form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: err.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome, {user?.name}. Use this panel to manage platform data.</p>

      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Create New Event</h2>
        
        {status && (
          <div className={`p-3 rounded-md mb-4 ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md p-2 bg-background"
              placeholder="e.g. Annual Meetup"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2 bg-background min-h-[100px]"
              placeholder="What is this event about?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-md p-2 bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input 
                type="text" 
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-md p-2 bg-background"
                placeholder="e.g. HIT Campus"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors mt-2"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};
