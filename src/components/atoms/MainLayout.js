import React from "react";
const MainLayout = ({ children }) => {
  return (
    <div
      className="flex bg-cover"
      style={{
        backgroundImage: "url('/images/backdrop.png')",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="flex-1 mt-16" style={{ marginLeft: "260px" }}>
        <div className="main">
          <div className="pl-5 py-4 w-[84rem]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
