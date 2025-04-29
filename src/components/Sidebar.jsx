import React from 'react';
import { Link } from 'react-router-dom';
import { BiHome, BiUser, BiBriefcase, BiMessageSquare, BiBookmark } from 'react-icons/bi';

const Sidebar = () => {
  const menuItems = [
    { title: 'Home', icon: <BiHome size={24} />, path: '/' },
    { title: 'Profile', icon: <BiUser size={24} />, path: '/profile' },
    { title: 'Jobs', icon: <BiBriefcase size={24} />, path: '/jobs' },
    { title: 'Messages', icon: <BiMessageSquare size={24} />, path: '/messages' },
    { title: 'Saved', icon: <BiBookmark size={24} />, path: '/saved' },
  ];

  return (
    <div className="w-64 h-screen bg-[#232323] fixed left-0 top-0 pt-20 border-r border-gray-800">
      <div className="px-4 py-6">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-[#2A2A2A] hover:text-orange-500 rounded-lg transition-colors"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
