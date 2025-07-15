import React from "react";

const Preloader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple"></div>
  </div>
);

export default Preloader;