'use client';

import { useState, memo } from 'react';
import { FaHome, FaBars, FaChevronDown, FaChevronUp , FaUser, FaCog, FaSignOutAlt, FaChartBar, FaAd, FaBook, FaEnvelope, FaUsers, FaBlog, FaPlus, FaEdit } from 'react-icons/fa';
import {MdAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [blogDropdown, setBlogDropdown] = useState(false);
  const [adsDropdown, setAdsDropdown] = useState(false);

  return (
    <div className="flex">
      <div className={`h-screen bg-gray-900 text-white p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-24'}`}>
        <button className="mb-7" onClick={() => setIsOpen(prev => !prev)} title="Menu">
          <FaBars size={24} />
        </button>
        <nav className="space-y-4">
          <SidebarItem icon={<FaHome size={24} />} text="Home" link="/" isOpen={isOpen} />
          <SidebarItem icon={<FaUser size={24} />} text="User Management" link="/dashboard/user-management" isOpen={isOpen} />
          <SidebarItem icon={<MdAdminPanelSettings size={24} />} text="Mod Management" link="/dashboard/mod-management" isOpen={isOpen} />
          <div className="h-[1px] bg-gray-700 my-2"></div>

          <Dropdown 
            title="Blog" 
            icon={<FaBlog size={24} />} 
            isOpen={isOpen} 
            dropdownState={blogDropdown} 
            setDropdownState={setBlogDropdown} 
            items={[{ icon: <FaPlus size={20} />, text: 'Add Blog', link: '/dashboard/blog/add' }, { icon: <FaEdit size={20} />, text: 'Edit Blog', link: '/dashboard/blog/edit' }]} 
          />

          <div className="h-[1px] bg-gray-700 my-2"></div>
          
          <Dropdown 
            title="Ads" 
            icon={<FaAd size={24} />} 
            isOpen={isOpen} 
            dropdownState={adsDropdown} 
            setDropdownState={setAdsDropdown} 
            items={[{ icon: <FaPlus size={20} />, text: 'Add Ads', link: '/dashboard/ads/add' }, { icon: <FaEdit size={20} />, text: 'Edit Ads', link: '/dashboard/ads/edit' }]} 
          />

          <hr className="border-gray-700 my-2" />
          <SidebarItem icon={<FaUsers size={24} />} text="Client Management" link="/dashboard/client-management" isOpen={isOpen} />
          <SidebarItem icon={<FaEnvelope size={24} />} text="Messages" link="/dashboard/messages" isOpen={isOpen} />
          <SidebarItem icon={<FaBook size={24} />} text="Books" link="/dashboard/books" isOpen={isOpen} />
          <SidebarItem icon={<FaChartBar size={24} />} text="Analytics" link="/dashboard/analytics" isOpen={isOpen} />
          <SidebarItem icon={<FaCog size={24} />} text="Settings" link="/dashboard/settings" isOpen={isOpen} />
          <SidebarItem icon={<FaSignOutAlt size={24} />} text="Logout" link="/dashboard/logout" isOpen={isOpen} />
        </nav>
      </div>
    </div>
  );
};

const SidebarItem = memo(({ icon, text, link, isOpen }) => {
  return (
    <Link href={link} className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-700" title={text}>
      {icon}
      {isOpen && <span className="text-lg">{text}</span>}
    </Link>
  );
});

const Dropdown = ({ title, icon, isOpen, dropdownState, setDropdownState, items }) => {
  return (
    <div>
      <button 
        className="flex items-center justify-between p-2 w-full rounded-md hover:bg-gray-700" 
        onClick={() => setDropdownState(!dropdownState)} 
        title={title}
      >
        <div className="flex items-center space-x-4">
          {icon}
          {isOpen && <span className="text-lg">{title}</span>}
        </div>
        <span>
          {dropdownState ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </span>
      </button>
      {dropdownState && (
        <div className="ml-6 space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} icon={item.icon} text={item.text} link={item.link} isOpen={isOpen} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
