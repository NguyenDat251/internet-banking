import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import './sidebar.scss'
import { userActions } from '../../../../../actions/customer/user'
import { connect } from 'react-redux'

const SideBar = ({logout}) => {

    const match = useRouteMatch();
    const Services = [
        {name: 'Danh sách tài khoản', url: `${match.path}/bankaccount`},
        {name: 'Chuyển tiền trong KiantoBank', url: `${match.path}/transfer/kiantobank`},
        {name: 'Chuyển tiền đến ngân hàng khác', url: `${match.path}/transfer/otherbank`},
        {name: 'Lịch sử giao dịch', url: `${match.path}/history`},
        {name: 'Quản lý nhắc nợ', url: `${match.path}/loan-reminder`},
    ]
    
    const Account = [
        {name: 'Cài đặt người hưởng', url: `${match.path}/receiver`},
        {name: 'Đổi mật khẩu', url: `${match.path}/change-password`},
        {name: 'Thoát', url: `${match.path}/logout`, onClick: () => logout()}
    ]

    let servicesComponents = Services.map((item, index) => {
        return(
            <div key={index}>
            <li className={'nav'}>
                <NavLink className='navLink' activeClassName={'activeNavLink'} to={item.url}>> {item.name}</NavLink>
            </li>
            <hr/>
            </div>
        )
    })

    let accountComponents = Account.map((item, index) => {
        return(
            <div key={index}>
            <li className={'nav'}>
                <NavLink className='navLink' activeClassName={'activeNavLink'} to={item.url} onClick = {item.onClick}>> {item.name}</NavLink>
            </li>
            <hr/>
            </div>
        )
    })
    return (
        <div className = "sideBarContainer">
            <div className='leftNavContainer card'>
                <div className="title">
                    <span className="text-white font-weight-bold">DỊCH VỤ</span>
                </div>
                <ul>
                    {servicesComponents}
                </ul>
            </div>
            <div className='leftNavContainer card'>
                <div className="title">
                    <span className="text-white font-weight-bold">iB@NKING CỦA TÔI</span>
                </div>
                <ul>
                    {accountComponents}
                </ul>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userActions.logout())
})

export default connect(null, mapDispatchToProps)(SideBar)
