import React from 'react';

const ZoneContainer = () => {
  return (
    <div className="flex flex-wrap font-sans w-full">
      <div className="zone-col bg-purple-800 text-white p-4 h-52 relative flex-col">
        <span className="zone-num text-4xl flex-wrap">1</span>
        <h2 className="mb-4 font-semibold text-xl leading-tight">Interest</h2>
        <div className="arrow"></div>
      </div>
      <div className="zone-col bg-yellow-500 text-white p-4 h-52 relative flex-col">
        <span className="zone-num text-4xl flex-wrap">2</span>
        <h2 className="mb-4 font-semibold text-xl leading-tight">Pre-Construction</h2>
        <div className="arrow"></div>
      </div>
      <div className="zone-col bg-red-800 text-white p-4 h-52 relative flex-col">
        <span className="zone-num text-4xl flex-wrap">3</span>
        <h2 className="mb-4 font-semibold text-xl leading-tight">Construction</h2>
        <div className="arrow"></div>
      </div>
      <div className="zone-col bg-cyan-500 text-white p-4 h-52 relative flex-col">
        <span className="zone-num text-4xl flex-wrap">4</span>
        <h2 className="mb-4 font-semibold text-xl leading-tight">Active</h2>
      </div>
    </div>
  );
};

export default ZoneContainer;
