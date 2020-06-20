import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import TextInput from '../../component/textInput/textInput';
import SelectInput from '../../component/selectInput/selectInput';
import { partnerBank } from '../../../../../../../config/bank';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import './remindListModal.scss';

var banks = ['Kiantobank'];
banks = banks.concat(partnerBank.map((item) => item.name));

const RemindListModal = (props) => {
  const [bankName, setBankName] = useState(banks[0]);
  const [creditNumber, setCreditNumber] = useState();
  const [remindName, setRemindName] = useState();
  const handleClose = () => props.setShow(false);

  useEffect(() => {
    if(props.isModalEdit === true){
      setBankName(props.item.partner_code)
      setCreditNumber(props.item.credit_number)
      setRemindName(props.item.remind_name)
    }
  }, [props.isModalEdit])

  const handleCreate = () => {
    if (!creditNumber) {
      NotificationManager.warning('Vui lòng nhập số tài khoản');
      return;
    }
    if (!remindName) {
      NotificationManager.warning('Vui lòng nhập tên gợi nhớ');
      return;
    }
    props.createRemindList(creditNumber, remindName, bankName);
  };

  const handleUpdate = () => {
    if (!creditNumber) {
      NotificationManager.warning('Vui lòng nhập số tài khoản');
      return;
    }
    if (!remindName) {
      NotificationManager.warning('Vui lòng nhập tên gợi nhớ');
      return;
    }
    props.updateRemindList(props.item.remind_id, creditNumber, remindName, bankName)
  }

  return (
    <Modal show={props.show} onHide={handleClose} className="modal-custom">
      <Modal.Header closeButton>
        {props.isModalEdit === false && (
          <Modal.Title>Tạo người nhận</Modal.Title>
        )}
        {props.isModalEdit === true && <Modal.Title>Cập nhật</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        <div>
          <SelectInput
            title="Ngân hàng"
            items={banks}
            defaultValue={props.isModalEdit === true ? props.item.partner_code : bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <TextInput
            title="Số tài khoản"
            placeholder="Nhập số tài khoản"
            defaultValue={props.isModalEdit === true ? props.item.credit_number : ''}
            onChange={(e) => setCreditNumber(e.target.value)}
          />
          <TextInput
            title="Tên gợi nhớ"
            placeholder="Nhập tên gợi nhớ"
            defaultValue={props.isModalEdit === true ? props.item.remind_name : ''}
            onChange={(e) => setRemindName(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        {props.isModalEdit === false && (
          <button className="btn btn-success" onClick={handleCreate}>
            Tạo
          </button>
        )}
        {props.isModalEdit === true && (
          <button className="btn btn-success" onClick={handleUpdate}>
            Cập nhật
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClose}>
          Hủy bỏ
        </button>
      </Modal.Footer>
      <NotificationContainer />
    </Modal>
  );
};

export default RemindListModal;
