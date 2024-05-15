import React, { useState, useEffect } from 'react';
import CashDetails from './cashdetails';
import PaymentDetails from '../CustomerComponent/paymentdetails';
import adminHeader from "./adminheader";
function PaymentAdmin(){
    const [selectedTab, setSelectedTab] = useState('cash');
    return (
        <div>
          <adminHeader />
          <div className="admin-content">
            <div className="admin-tabs">
              <button onClick={() => setSelectedTab('cash')} className={selectedTab === 'cash' ? 'active' : ''}>
                Cash Details
              </button>
              <button onClick={() => setSelectedTab('payment')} className={selectedTab === 'payment' ? 'active' : ''}>
                Payment Details
              </button>
            </div>
            <div className="admin-details">
              {renderContent()}
            </div>
          </div>
        </div>
      );
    }
    

export default PaymentAdmin