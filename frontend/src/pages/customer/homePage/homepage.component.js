import React from 'react';
import NavBar from './components/menu/menu';
import SideBar from './components/sidebar/sidebar';
import './homepage.component.scss';
import SidebarRouter from './sidebarRouter';


const CustomerHomepage = () => {
  return (
    <div className="home-page">
      <div className="banner float-left" />
      <NavBar />
      <div className="container card custom">
        <div className="row">
          <SideBar className="col" />
          <div className="rightContentContainer card mt-5 ml-5 mr-5 col">
            <SidebarRouter/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHomepage;
