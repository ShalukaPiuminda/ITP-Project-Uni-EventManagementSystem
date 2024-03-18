import React from "react";
import logo from "../Images/LFN-logo3.png";
import profile1 from "../Images/profileimg.jpg";

const Header = () => {
  return (
    <header className="bg-white text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
         
        </div>
        
        {/* User Profile */}
        <div className="flex items-center">
          
          <div>
            <p className="font-semibold text-black text-xl">John Doe</p>
            
          </div>
          <div className="mr-4 mx-6">
            <img src={profile1} alt="Profile" className="h-16 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
