import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the shape of a single module
interface Module {
  id: number;
  title: string;
  summary: string;
}

const EducationModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // We don't need authentication for this, so no token is sent
  const res = await axios.get('https://findefy-14vpu07mo-ojas12062006-7157s-projects.vercel.app/api/content/modules');
        setModules(res.data);
      } catch (error) {
        console.error('Failed to fetch educational modules', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []); // The empty array ensures this runs only once

  if (loading) {
    return <div>Loading modules...</div>;
  }

  return (
    <div className="education-module p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Educational Modules</h2>
      <ul className="space-y-2">
        {modules.map(module => (
          <li key={module.id}>- {module.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EducationModules;