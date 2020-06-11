import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/sidebar';
import Content from './components/content/content';
import Navbar from './components/navbar/navbar';
import "./homePage.component.scss"
import SideBarRouter from './sidebarRouter';

const HomePage = () => {
    const [showSidebar, setShowSidebar] = useState("true");
  return (
    <div className="employee">
      <div className="banner"></div>
      <div className={showSidebar ? "d-flex" : "d-flex toggled"} id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
          <div className="rightContentContainer card mt-3">
            <SideBarRouter/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
