'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects/list');
      const data = await res.json();
      setProjects(data.projects);
    };

    fetchProjects();
  }, []);

  const handleLoadProject = (projectId) => {
    router.push(`/?projectId=${projectId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">저장된 프로젝트</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project._id} className="p-4 border rounded shadow">
            <div className="text-lg font-medium">{project.title}</div>
            <div className="text-sm text-gray-500">{new Date(project.createdAt).toLocaleString()}</div>
            <button
              className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
              onClick={() => handleLoadProject(project._id)}
            >
              불러오기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}