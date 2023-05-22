import React, { useState } from 'react';

import NavBar from "@/components/nav-bar";

const DashboardLayout: React.FC = ({ children }) => {

  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar/>
        <div className="flex flex-1">
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
  );
};

export default DashboardLayout;
