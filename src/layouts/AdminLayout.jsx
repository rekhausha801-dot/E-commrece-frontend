import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* Admin Layout Header/Sidebar could go here */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
