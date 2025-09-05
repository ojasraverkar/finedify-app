import React from "react";
import UserEducationModules from "../components/UserEducationModules";

export default function DashboardModules() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-orange-500 mb-8">Learning Modules</h2>
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-100">
        {/* Empty state for modules */}
        <UserEducationModules />
        {/* TODO: If no modules, show empty state UI */}
      </div>
    </div>
  );
}
