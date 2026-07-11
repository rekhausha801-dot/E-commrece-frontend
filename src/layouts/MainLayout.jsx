import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Main Layout Header/Footer could go here */}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
