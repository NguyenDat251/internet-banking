import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import './sidebar.scss'

const SideBar = ({match}) => {
    const Services = [
        {name: 'Danh sách tài khoản', url: `${match.url}/action1`},
        {name: 'Chuyển tiền trong KiantoBank', url: `${match.url}/action2`},
        {name: 'Chuyển tiền đến ngân hàng khác', url: `${match.url}/action3`},
        {name: 'Lịch sử giao dịch', url: `${match.url}/action4`},
        {name: 'Quản lý nhắc nợ', url: `${match.url}/action5`},
    ]
    
    const Account = [
        {name: 'Thông tin cá nhân', url: `${match.url}/action6`},
        {name: 'Cài đặt người hưởng', url: `${match.url}/action7`},
        {name: 'Đổi mật khẩu', url: `${match.url}/action8`},
        {name: 'Thoát', url: `${match.url}/action9`},
    ]

    let servicesComponents = Services.map((item, index) => {
        return(
            <div>
            <li key={index} className={'nav'}>
                <NavLink className='navLink' activeClassName={'activeNavLink'} to={item.url}>> {item.name}</NavLink>
            </li>
            <hr/>
            </div>
        )
    })

    let accountComponents = Account.map((item, index) => {
        return(
            <div>
            <li key={index} className={'nav'}>
                <NavLink className='navLink' activeClassName={'activeNavLink'} to={item.url}>> {item.name}</NavLink>
            </li>
            <hr/>
            </div>
        )
    })
    return (
        <div>
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
                    <span className="text-white font-weight-bold">iB@NGKING CỦA TÔI</span>
                </div>
                <ul>
                    {accountComponents}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(SideBar)
