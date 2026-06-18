export const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">About Eklavya</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Eklavya - HIT's Socio-Animal Welfare Society is dedicated to making a positive impact on society and animal welfare.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This dummy website is a simplified version of our actual platform. It serves as a training ground for junior developers to understand the MERN (MongoDB, Express.js, React.js, Node.js) stack architecture without being overwhelmed by complex features like OAuth, complex state management, or third-party integrations.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Our Goal</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To build a strong technical foundation for our team members so they can confidently contribute to the main Eklavya project.
        </p>
      </div>
    </div>
  );
};
