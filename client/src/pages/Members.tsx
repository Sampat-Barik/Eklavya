import { useState, useEffect } from 'react';

interface Member {
  _id: string;
  name: string;
  role: string;
  department: string;
}

export const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/members');
        if (!response.ok) throw new Error('Failed to fetch members');
        
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error(err);
        setError('Backend is not running yet. Displaying dummy data.');
        setMembers([
          { _id: '1', name: 'Alice Smith', role: 'President', department: 'Management' },
          { _id: '2', name: 'Bob Jones', role: 'Volunteer', department: 'Operations' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <div className="text-center py-10">Loading members...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Our Team</h1>
      
      {error && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-6 border border-yellow-200">
          {error}
        </div>
      )}

      <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted text-muted-foreground border-b">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Department</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium">{member.name}</td>
                <td className="p-4">{member.role}</td>
                <td className="p-4">{member.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {members.length === 0 && !error && (
          <p className="text-center py-8 text-muted-foreground">No members found.</p>
        )}
      </div>
    </div>
  );
};
