import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export const EditSkills = ({skillsData, setSkillsData, setIsSkillsEditOpen}) => {

    const normalize = (data) => ({
      skills: data?.skills ?? "",
      experiences: Array.isArray(data?.experiences) ? data.experiences : [],
    });

    const [form, setForm] = useState(() => normalize(skillsData));

    // If the parent loads a different skillsData while modal is open, refresh form.
    useEffect(() => {
      setForm(normalize(skillsData));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skillsData]);

    const handleSkillsSave = (e) => {
        e.preventDefault();
        setSkillsData(form);
        setIsSkillsEditOpen(false);
      };
    
      const handleSkillsChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleNewExperienceChange = (e) => {
        const { name, value } = e.target;
        setNewExperience(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleAddExperience = (e) => {
        e.preventDefault();
        setForm((prev) => ({
          ...prev,
          experiences: [...(prev.experiences ?? []), newExperience],
        }));
        setNewExperience({
          position: '',
          company: '',
          period: '',
          description: ''
        });
      };
    
      const handleRemoveExperience = (index) => {
        setForm((prev) => ({
          ...prev,
          experiences: (prev.experiences ?? []).filter((_, i) => i !== index),
        }));
      };

      const [newExperience, setNewExperience] = useState({
        position: '',
        company: '',
        period: '',
        description: ''
      });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Edit Skills & Experience
          </h2>
          <button onClick={() => setIsSkillsEditOpen(false)}>
            <FaTimes size={24} className="hover:text-orange-500" />
          </button>
        </div>
        <form onSubmit={handleSkillsSave} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">
              Skills (comma-separated)
            </label>
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleSkillsChange}
              autoFocus
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 h-32"
              placeholder="Enter skills separated by commas"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Work Experience
            </h3>
            <div className="space-y-4">
              {form?.experiences?.map((exp, index) => (
                <div key={index} className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{exp.position}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <p className="text-orange-500">{exp.company}</p>
                  <p className="text-gray-400">{exp.period}</p>
                  <p className="text-gray-400 mt-2">{exp.description}</p>
                </div>
              ))}

              <div className="bg-[#1A1A1A] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-4">
                  Add New Experience
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={newExperience.position}
                      onChange={handleNewExperienceChange}
                      className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={newExperience.company}
                      onChange={handleNewExperienceChange}
                      className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Period</label>
                    <input
                      type="text"
                      name="period"
                      value={newExperience.period}
                      onChange={handleNewExperienceChange}
                      className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                      placeholder="e.g., 2020 - Present"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newExperience.description}
                      onChange={handleNewExperienceChange}
                      className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 h-24"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add Experience
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsSkillsEditOpen(false)}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};