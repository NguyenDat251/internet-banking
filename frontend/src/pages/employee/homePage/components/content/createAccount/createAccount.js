import React, { useState, useEffect } from 'react';
import Title from '../components/title/title';
import TextInput from '../components/textInput/textInput';
import DateInput from '../components/dateInput/dateInput';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { employeeActions } from '../../../../../../actions/employee/employee';
import { connect } from 'react-redux';

const CreateAccount = ({employee, addCustomer}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [idNumber, setIdNumber] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState(new Date())
  const [email, setEmail] = useState();

  const changeDateFormat = (date) => {
    const formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatDate;
  }

  const checkUnder18 = (date) => {
    const now = new Date();
    if(now.getFullYear() - date.getFullYear() > 18){
      return true
    } else if (now.getFullYear() - date.getFullYear() < 18)
    {
      return false
    } else {
      if(now.getMonth() > date.getMonth()){
        return true
      } else if(now.getMonth() < date.getMonth()){
        return false
      } else {
        if(now.getDate() >= date.getDate()){
          return true
        } else if(now.getDate() < date.getDate()){
          return false
      }
    }
  }
}

  const handleSubmit = (e) =>  {
    e.preventDefault();
    if(!username){
      NotificationManager.warning('Vui lòng nhập tài khoản');
      return;
    }
    if(!password){
      NotificationManager.warning('Vui lòng nhập mật khẩu');
      return;
    }
    if(!lastname){
      NotificationManager.warning('Vui lòng nhập họ và tên lót khách hàng');
      return;
    }
    if(!firstname){
      NotificationManager.warning('Vui lòng nhập tên khách hàng');
      return;
    }
    
    if(!idNumber){
      NotificationManager.warning('Vui lòng nhập số CMND');
      return;
    }

    if(!phone){
      NotificationManager.warning('Vui lòng nhập số điện thoại');
      return;
    }
    if(checkUnder18(date) === false){
      NotificationManager.warning('Khách hàng chưa đủ 18 tuổi');
      return;
    }
    const stringDate = changeDateFormat(date)
    if(!email){
      NotificationManager.warning('Vui lòng nhập email');
      return;
    }
    addCustomer(username, password, idNumber, phone, firstname, lastname, stringDate, email)
  }

  useEffect(() => {
    if(employee.addCustomerSuccess === true){
      NotificationManager.success('Thêm tài khoản thành công');
    }
    if(employee.addCustomerError){
      NotificationManager.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  }, [employee])

  return (
    <div className="creatAccountContainer">
      <Title title="Tạo tài khoản khách hàng" />
      <form onSubmit = {e => handleSubmit(e)}>
        <div className="mt-5">
          <h5 className="text-success">Thông tin đăng nhập</h5>
          <hr />
          <TextInput
            title="Tài khoản"
            autoFocus
            placeholder="Nhập tài khoản"
            type="text"
            onChange={e => setUsername(e.target.value)}
          />
          <TextInput
            title="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <h5 className="text-success">Thông tin cá nhân</h5>
          <hr />
          <TextInput
            title="Họ khách hàng"
            placeholder="Nhập họ và tên lót khách hàng"
            value={lastname || ''}
            onChange={e => setLastname(e.target.value.toUpperCase())}
            type="text"
          />
          <TextInput
            title="Tên khách hàng"
            placeholder="Nhập tên khách hàng"
            value={firstname || ''}
            onChange={e => setFirstname(e.target.value.toUpperCase())}
            type="text"
          />
          <TextInput
            title="CMND"
            placeholder="Nhập chứng minh nhân dân"
            onChange={e => setIdNumber(e.target.value)}
            type="number"
          />
          <TextInput
            title="Số điện thoại"
            placeholder="Nhập Số ĐT khách hàng"
            onChange={e => setPhone(e.target.value)}
            type="number"
          />
          <DateInput title="Ngày sinh" date = {date} setDate = {setDate}/>
          <TextInput type="email" title="Email" placeholder="Nhập email" type="email" onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="mt-5 center-align">
          <button className="btn btn-success float-center" type="submit">
            Xác nhận
          </button>
        </div>
      </form>
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

const mapDispatchToProps = (dispatch) => ({
  addCustomer: (
    username,
    password,
    idNumber,
    phone,
    firstname,
    lastname,
    date_of_birth,
    email
  ) =>
    dispatch(
      employeeActions.addCustomer(
        username,
        password,
        idNumber,
        phone,
        firstname,
        lastname,
        date_of_birth,
        email
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
