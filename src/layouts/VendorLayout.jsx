import React from 'react';

const VendorLayout = ({ children }) => {
  return (
    <div>
      {/* Vendor Layout Header/Sidebar could go here */}
      <main>{children}</main>
    </div>
  );
};

export default VendorLayout;
