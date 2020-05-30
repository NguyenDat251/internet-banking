import React from 'react';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading bg-success text-white font-weight-bolder">GIAO DỊCH VIÊN </div>
      <div className="list-group list-group-flush">
      <a href="employee/dashboard" className="list-group-item list-group-item-action bg-light">
          Tra cứu tài khoản
        </a>
        <a href="employee/dashboard" className="list-group-item list-group-item-action bg-light">
          Tạo tài khoản
        </a>
        <a href="employee/dashboard" className="list-group-item list-group-item-action bg-light">
          Nạp tiền
        </a>
        <a href="employee/dashboard" className="list-group-item list-group-item-action bg-light">
          Xem lịch sử giao dịch
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
