import React from 'react';
import NavBar from './components/menu/menu';
import SideBar from './components/sidebar/sidebar'
import './homepage.component.scss';

const customerHomepage = () => {
  return (
    <div className="home-page">
      <div className="banner float-left" />
      <NavBar />
      <div className="container">
        <SideBar/>
      </div>
    </div>
  );
};

export default customerHomepage;
