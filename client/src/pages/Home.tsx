import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
        Welcome to Eklavya
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        This is a dummy training website for junior developers. Learn the basics of the MERN stack by exploring this simplified version of our NGO platform.
      </p>
      
      <div className="flex gap-4">
        <Link 
          to="/events" 
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          View Events
        </Link>
        <Link 
          to="/about" 
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};
