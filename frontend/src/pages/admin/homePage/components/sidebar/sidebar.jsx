import React from 'react';
import './sidebar.scss';
import {NavLink, useRouteMatch} from 'react-router-dom'
import {employeeActions} from '../../../../../actions/employee/employee'
import './sidebar.scss'
import { connect } from 'react-redux';
import { AdminActions } from '../../../../../actions/admin/admin';

const Sidebar = ({logout}) => {
  const match = useRouteMatch()
  const SideBarList = [
    {name: 'Danh sách nhân viên', url: `${match.path}`},
    {name: 'Danh sách giao dịch', url: `${match.path}/transaction`},
    {name: 'Thoát', url: `${match.path}/logout`, onClick: () => logout()},
  ]

  let SideBarComponent = SideBarList.map((item, index) => {
    return(
      <NavLink to={item.url} className="list-group-item list-group-item-action bg-light navLink" onClick={item.onClick} activeClassName='activeNavLink'>
        {item.name}
      </NavLink>
    )
  })
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading bg-success text-white font-weight-bolder center-align"><a className="text-white" href={match.path}>GIAO DỊCH VIÊN</a></div>
      <div className="list-group list-group-flush">
      {SideBarComponent}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AdminActions.logout())
})
export default connect(null, mapDispatchToProps)(Sidebar);
