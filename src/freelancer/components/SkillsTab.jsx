import React from 'react';
import { FaEdit } from 'react-icons/fa';

const SkillsTab = ({ skillsData, handleSkillsEdit }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
        <button
          onClick={handleSkillsEdit}
          className='border-1 border-gray-500 rounded-full p-2'
        >
          <FaEdit size={20} className='hover:text-orange-500'/>
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {skillsData.skills.split(',').map((skill) => (
          <span
            key={skill.trim()}
            className="bg-[#1A1A1A] text-white px-4 py-2 rounded-full border border-gray-700"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Work Experience</h2>
        <div className="space-y-6">
          {skillsData.experiences.map((exp, index) => (
            <div key={index} className="border-l-2 border-orange-500 pl-4">
              <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
              <p className="text-orange-500">{exp.company}</p>
              <p className="text-gray-400">{exp.period}</p>
              <p className="text-gray-400 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab; 