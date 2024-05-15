import '../Utills/header.css';
import { useState } from 'react';

function AdminHeader() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <div>
      <div className="navbar">
        <a href="/cashdetails" className={activeLink === 0 ? 'active' : ''} onClick={() => handleLinkClick(0)}>Cash Details</a>
        <a href="/paymentdetails" className={activeLink === 1 ? 'active' : ''} onClick={() => handleLinkClick(1)}>Payment Details</a>
      </div>
    </div>
  );
}

export default AdminHeader;
