import React from 'react';
import { FaEdit } from 'react-icons/fa';

const SkillsTab = ({ skillsData, handleSkillsEdit }) => {

  console.log(skillsData,"----------skills data");
  const getSkillsArray = () => {
    if (!skillsData?.skills) return [];
    
    // If skills is a string, accept either JSON array or comma-separated text
    if (typeof skillsData.skills === 'string') {
      const raw = skillsData.skills.trim();
      if (!raw) return [];

      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch (error) {
        // Not JSON — fall back to comma-separated values
        return raw
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
    
    // If skills is already an array, return it
    if (Array.isArray(skillsData.skills)) {
      return skillsData.skills;
    }
    
    return [];
  };

  const skillsArray = getSkillsArray();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <button
          onClick={handleSkillsEdit}
          className='border-1 border-gray-500 rounded-full p-2'
        >
          <FaEdit size={20} className='hover:text-orange-500'/>
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {skillsArray.length > 0 ? (
          skillsArray.map((skill, index) => (
            <span
              key={`skill-${index}-${skill}`}
              className="bg-[#1A1A1A] text-white px-4 py-2 rounded-full border border-gray-700"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-400">No skills added yet. Click edit to add skills.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Work Experience</h2>
        <div className="space-y-6">
          {skillsData?.experiences?.length > 0 ? (skillsData?.experiences?.map((exp, index) => (
            <div key={index} className="border-l-2 border-orange-500 pl-4">
              <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
              <p className="text-orange-500">{exp.company}</p>
              <p className="text-gray-400">{exp.period}</p>
              <p className="text-gray-400 mt-2">{exp.description}</p>
            </div>
          ))):(
            <p className="text-gray-400">No work experience added yet. Click edit to add work experience.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab; 