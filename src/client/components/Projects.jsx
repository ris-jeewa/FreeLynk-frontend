import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaPlus } from "react-icons/fa";

export const Projects = ({ projects, setProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProjects, setEditedProjects] = useState(projects);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    budget: '',
    postedDate: 'Just now'
  });

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...editedProjects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setEditedProjects(updatedProjects);
  };

  const handleNewProjectChange = (field, value) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProject = () => {
    setEditedProjects([...editedProjects, newProject]);
    setNewProject({
      title: '',
      description: '',
      budget: '',
      postedDate: 'Just now'
    });
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = editedProjects.filter((_, i) => i !== index);
    setEditedProjects(updatedProjects);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProjects(projects);
  };

  const handleSave = () => {
    setProjects(editedProjects);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProjects(projects);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-6">Posted Projects</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className='border-1 border-gray-500 rounded-full p-2 hover:bg-green-500 hover:border-green-500 transition-colors'
            >
              <FaSave size={20} className='hover:text-white'/>
            </button>
            <button
              onClick={handleCancel}
              className='border-1 border-gray-500 rounded-full p-2 hover:bg-red-500 hover:border-red-500 transition-colors'
            >
              <FaTimes size={20} className='hover:text-white'/>
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className='border-1 border-gray-500 rounded-full p-2 hover:bg-orange-500 hover:border-orange-500 transition-colors'
          >
            <FaEdit size={20} className='hover:text-white'/>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editedProjects.map((project, index) => (
          <div key={index} className="bg-[#1A1A1A] rounded-lg p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 h-24"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Budget</label>
                  <input
                    type="text"
                    value={project.budget}
                    onChange={(e) => handleProjectChange(index, 'budget', e.target.value)}
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <FaTimes /> Remove Project
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500">{project.budget}</span>
                  <span className="text-gray-400">{project.postedDate}</span>
                </div>
              </>
            )}
          </div>
        ))}

        {isEditing && (
          <div className="bg-[#1A1A1A] rounded-lg p-6 border-2 border-dashed border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => handleNewProjectChange('title', e.target.value)}
                  className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => handleNewProjectChange('description', e.target.value)}
                  className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 h-24"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Budget</label>
                <input
                  type="text"
                  value={newProject.budget}
                  onChange={(e) => handleNewProjectChange('budget', e.target.value)}
                  className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                onClick={handleAddProject}
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus /> Add Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
