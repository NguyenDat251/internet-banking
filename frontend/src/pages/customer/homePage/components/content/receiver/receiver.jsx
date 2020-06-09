import React from 'react'
import Title from '../component/title/title'
import "./receiver.scss"

const Receiver = () => {
    return (
        <div className="receiver">
            <Title title="DANH SÁCH NGƯỜI NHẬN"/>
            <div className="mt-5 ml-3">
                <div className="row">
                    <input className="col-5 font-weight-lighter" placeholder="Nhập tên gợi nhớ/ số tài khoản"/>
                    <button className="btn btn-success">Tìm  kiếm</button>
                    <button className="btn btn-success ml-4">Tạo mới</button>
                </div>
                <div>
                    <table className="table table-hover mt-5">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Tên người hưởng</th>
                                <th scope="col">Tên gợi nhớ</th>
                                <th scope="col">Số tài khoản</th>
                                <th scope="col">Ngân hàng</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nguyễn Thanh Lâm</td>
                                <td>Jindo</td>
                                <td>0123456789123</td>
                                <td>@KiantoBank</td>
                                <td>
                                    <ul className="list-inline m-0">
                                        <li className="list-inline-item">
                                            <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></button>
                                        </li>
                                        <li class="list-inline-item">
                                            <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default Receiver
