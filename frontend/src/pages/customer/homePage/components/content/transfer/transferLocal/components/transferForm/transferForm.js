import React, { useState, useEffect } from 'react';
import SenderInformation from '../../../component/senderInformation/senderInformation';
import TransferInformation from '../../../component/transferInformation/transferInformation';
import InputWithSearch from '../../../component/inputWithSearch/inputWithSearch';
import TextInput from '../../../../component/textInput/textInput';
import { transferActions } from '../../../../../../../../../actions/customer/transfer';
import './transferForm.scss';
import CheckBox from '../../../../component/checkBox/checkBox';
import { connect } from 'react-redux';
import {NotificationManager, NotificationContainer} from 'react-notifications'

const TransferForm = (props) => {
  const credit_account = props.bankAccount.credit_account[0];
  const SoTK = [credit_account.credit_number];
  const phiChuyenTien = ['Người chuyển trả', 'Người nhận trả'];
  const money = credit_account.balance;
  const [remindList, setRemindList] = useState([]);

  const [value, setValue] = useState();

  useEffect(() => {
    if(props.transfer.findReceiverError !== null && props.soTaiKhoan){
      NotificationManager.error('Không tìm thấy tài khoản thẻ')
    }
    if(!props.soTaiKhoan || props.transfer.findReceiverError !== null){
      props.setTenNguoiHuong();
    }
    if(props.transfer.findReceiverSuccess === true){
      props.setTenNguoiHuong(props.transfer.full_name);
    }
    if(props.transfer.getRemindListSuccess === true){
      setRemindList(props.transfer.remindList)
    }
  }, [props.transfer])

  useEffect( () => {
    props.getRemindList();
  }, [])

  const handleForSubmit = (e) => {
    e.preventDefault();
    props.setStep(2);
  };

  return (
    <div className="transferForm">
      <div className="mt-4">
        <h5 className="text-success">THÔNG TIN NGƯỜI CHUYỂN</h5>
        <hr />
      </div>
      <SenderInformation items={SoTK} money={money} />
      <div className="mt-5">
        <h5 className="text-success">THÔNG TIN NGƯỜI HƯỞNG</h5>
        <hr />
        <InputWithSearch
          title="Tìm kiếm"
          items={remindList}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextInput
          title="Số tài khoản"
          placeholder="Nhập số tài khoản"
          onBlur={() => props.findReceiver(props.soTaiKhoan)}
          onChange={(e) => props.setSoTaiKhoan(e.target.value)}
        />
        <TextInput
          title="Tên người hưởng"
          placeholder="Tên người huởng"
          value = {props.tenNguoiHuong || ""}
          disabled={true}
        />
        <CheckBox
          label="Lưu thông tin người hưởng"
          onChange={() => props.setLuuThongTin(!props.luuThongTin)}
        />
        {props.luuThongTin && (
          <TextInput title="Tên gợi nhớ" placeholder="Nhập tên gợi nhớ" />
        )}
      </div>

      <div className="mt-5">
        <h5 className="text-success">NỘI DUNG CHUYỂN TIỀN</h5>
        <hr />
        <TransferInformation {...props} items={phiChuyenTien} />
      </div>
      <div className="mt-5 center-align">
        <button
          className="btn btn-success float-center"
          type="button"
          onClick={() => handleForSubmit}>
          Chuyển tiền
        </button>
      </div>
      <NotificationContainer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  transfer: state.transfer,
});

const mapDispatchToProps = (dispatch) => ({
  findReceiver: (credit_number) => dispatch(transferActions.findReceiver(credit_number)),
  getRemindList: () => dispatch(transferActions.getRemindList())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferForm);
