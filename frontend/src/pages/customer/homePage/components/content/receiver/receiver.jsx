import React, { useEffect, useState } from 'react';
import Title from '../component/title/title';
import { bankAccountActions } from '../../../../../../actions/customer/bankAccount';
import { connect } from 'react-redux';
import RemindListModal from './components/remindListModal'
import './receiver.scss';


const Receiver = ({ bankAccount, getRemindList }) => {
  const [show, setShow] = useState(false);
  const [remindList, setRemindList] = useState([]);
  const [isModalEdit, setIsModalEdit] = useState(false)

  const handleCreate = () =>  {
    setShow(true)
    setIsModalEdit(false)
  }

  const handleEdit = () =>  {
    setShow(true)
    setIsModalEdit(true)
  }
  useEffect(() => {
    getRemindList();
  }, []);

  useEffect(() => {
    if (bankAccount.getRemindListSuccess === true) {
      setRemindList(bankAccount.remindList);
    }
  }, [bankAccount]);
  return (
    <div className="receiver">
      <Title title="DANH SÁCH NGƯỜI NHẬN" />
      <div className="mt-5">
        <div className="row ml-0 mr-0">
          <input
            className="col-5 font-weight-lighter"
            placeholder="Nhập tên gợi nhớ/ số tài khoản"
          />
          <button className="btn btn-success">Tìm kiếm</button>
          <button className="btn btn-success ml-4" onClick={handleCreate}>Tạo mới</button>
          <RemindListModal show={show} setShow = {setShow} isModalEdit={isModalEdit}/>
        </div>
        <div>
          <table className="table table-hover mt-5">
            <thead className="thead-light">
              <tr>
                <th scope="col">Tên gợi nhớ</th>
                <th scope="col">Số tài khoản</th>
                <th scope="col">Ngân hàng</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {remindList &&
                remindList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.remind_name}</td>
                    <td>{item.credit_number}</td>
                    <td>{item.partner_code}</td>
                    <td>
                      <ul className="list-inline m-0">
                        <li className="list-inline-item">
                          <button
                            onClick = {() => handleEdit()}
                            className="btn btn-success btn-sm rounded-0"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit">
                            <i className="fa fa-edit"></i>
                          </button>
                        </li>
                        <li className="list-inline-item">
                          <button
                            className="btn btn-danger btn-sm rounded-0"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete">
                            <i className="fa fa-trash"></i>
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bankAccount: state.bankAccount,
});

const mapDispatchToProps = (dispatch) => ({
  getRemindList: () => dispatch(bankAccountActions.getRemindList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Receiver);
