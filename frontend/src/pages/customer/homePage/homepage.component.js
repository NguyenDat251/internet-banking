import React from 'react';
import NavBar from './components/menu/menu';
import SideBar from './components/sidebar/sidebar';
import './homepage.component.scss';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

const customerHomepage = () => {
  let { path, url } = useRouteMatch;
  console.log(path);
  return (
    <div className="home-page">
      <div className="banner float-left" />
      <NavBar />
      <div className="container card custom">
        <div className="row">
          <SideBar className="col" />
          <div className="rightContentContainer card mt-5 ml-5 mr-5 col">
            <Switch>
              <Route exact path={path}>
                <h3>This is content</h3>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default customerHomepage;
