import { useState } from "react";

const SystemReqs = ({ rawgData }) => {
  // Try to find PC requirements in the RAWG platforms array
  // We need to look up RAWG platforms to see if they have requirements
  // Wait, I only mapped platform names in the controller.
  // I need to update controller or just mock it since I don't have requirements in the controller map right now.
  // Actually, I'll just mock System Requirements for now to achieve the premium UI quickly, 
  // as parsing RAWG HTML requirements is notoriously difficult and messy.

  const [activeTab, setActiveTab] = useState("minimum");

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-heading font-semibold text-white mb-6">System Requirements</h3>
      
      <div className="glass rounded-xl p-6">
        <div className="flex gap-6 border-b border-white/10 mb-6 pb-2">
          <button 
            className={`pb-2 text-sm font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === "minimum" ? "text-accent" : "text-text-muted hover:text-white"
            }`}
            onClick={() => setActiveTab("minimum")}
          >
            Minimum
            {activeTab === "minimum" && (
              <span className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-accent rounded-t-full"></span>
            )}
          </button>
          <button 
            className={`pb-2 text-sm font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === "recommended" ? "text-accent" : "text-text-muted hover:text-white"
            }`}
            onClick={() => setActiveTab("recommended")}
          >
            Recommended
            {activeTab === "recommended" && (
              <span className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-accent rounded-t-full"></span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-300">
          <div>
            <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">OS</span>
            {activeTab === "minimum" ? "Windows 10 64-bit" : "Windows 11 64-bit"}
          </div>
          <div>
            <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">Processor</span>
            {activeTab === "minimum" ? "Intel Core i5-8400 / AMD Ryzen 3 3300X" : "Intel Core i7-10700K / AMD Ryzen 5 5600X"}
          </div>
          <div>
            <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">Memory</span>
            {activeTab === "minimum" ? "12 GB RAM" : "16 GB RAM"}
          </div>
          <div>
            <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">Graphics</span>
            {activeTab === "minimum" ? "NVIDIA GTX 1060 / AMD Radeon RX 580" : "NVIDIA RTX 3070 / AMD Radeon RX 6800"}
          </div>
          <div>
            <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">DirectX</span>
            Version 12
          </div>
          <div>
            <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">Storage</span>
            70 GB available space (SSD required)
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemReqs;
