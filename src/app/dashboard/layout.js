'use client';

import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-grow bg-gray-100">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="p-4 flex-grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
