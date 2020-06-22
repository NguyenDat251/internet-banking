import React, { useEffect, useState } from 'react';
import Title from '../component/title/title';
import { bankAccountActions } from '../../../../../../actions/customer/bankAccount';
import { connect } from 'react-redux';
import RemindListModal from './components/remindListModal';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import './receiver.scss';

const Receiver = ({
  bankAccount,
  getRemindList,
  createRemindList,
  deleteRemindList,
  updateRemindList,
}) => {
  const [show, setShow] = useState(false);
  const [remindList, setRemindList] = useState([]);
  const [backupRemindList, setBackupRemindList] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [item, setItem] = useState();

  const handleCreate = () => {
    setShow(true);
    setIsModalEdit(false);
  };

  const handleEdit = (item) => {
    setShow(true);
    setIsModalEdit(true);
    setItem(item);
  };

  const handleDelete = (remind_id) => {
    deleteRemindList(remind_id);
  };

  const handleSearch = () => {
    const searchValue = backupRemindList.filter(
      (item) =>
        item.remind_name.toLowerCase().includes(search.toLowerCase()) ||
        item.credit_number.includes(search)
    );
    setRemindList(searchValue);
  };

  useEffect(() => {
    if(search){
      handleSearch()
    }
  }, [backupRemindList])

  useEffect(() => {
    getRemindList();
  }, []);

  useEffect(() => {
    if (bankAccount.getRemindListSuccess === true) {
      setRemindList(bankAccount.remindList);
      setBackupRemindList(bankAccount.remindList);
    }
    if (bankAccount.createRemindListSuccess === true) {
      NotificationManager.success('Khởi tạo thành công');
      getRemindList();
      setShow(false);
    }
    if (bankAccount.createRemindListError) {
      NotificationManager.error('Số tài khoản đã tồn tại', 'Khởi tạo thất bại');
    }
    if (bankAccount.deleteRemindListSuccess === true) {
      getRemindList();
    }
    if (bankAccount.updateRemindListSuccess === true) {
      NotificationManager.success('Cập nhật thành công');
      getRemindList();
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
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button className="btn btn-success ml-4" onClick={handleCreate}>
            Tạo mới
          </button>
          <RemindListModal
            show={show}
            setShow={setShow}
            isModalEdit={isModalEdit}
            createRemindList={createRemindList}
            updateRemindList={updateRemindList}
            item={item}
          />
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
                            onClick={() => handleEdit(item)}
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
                            onClick={() => handleDelete(item.remind_id)}
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
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  bankAccount: state.bankAccount,
});

const mapDispatchToProps = (dispatch) => ({
  getRemindList: () => dispatch(bankAccountActions.getRemindList()),
  createRemindList: (credit_number, remind_name, partner_code) =>
    dispatch(
      bankAccountActions.createRemindList(
        credit_number,
        remind_name,
        partner_code
      )
    ),
  deleteRemindList: (remind_id) =>
    dispatch(bankAccountActions.deleteRemindList(remind_id)),
  updateRemindList: (remind_id, credit_number, remind_name, partner_code) =>
    dispatch(
      bankAccountActions.updateRemindList(
        remind_id,
        credit_number,
        remind_name,
        partner_code
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Receiver);
