import React, { useState, useEffect } from 'react';
import Title from '../component/title/title';
import DatePicker from 'react-datepicker';
import { bankAccountActions } from '../../../../../../actions/customer/bankAccount';
import './transferHistory.scss';

import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';

const TransferHistory = ({ bankAccount, getTransactionHistory }) => {
  const now = new Date().getTime();
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(now);
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    if (bankAccount.getTransactionHistorySuccess === true) {
      const allTransaction = bankAccount.transactionHistory;
      const compose = allTransaction.sendto_history.concat(
        allTransaction.receivefrom_history
      );
      compose.sort((a, b) => a.ts - b.ts);
      const start = Math.round(startDate / 1000);
      const end = Math.round(endDate / 1000);
      const searchTransaction = compose.filter(
        (item) => item.ts >= start && item.ts <= end
      );
      setTransactions(searchTransaction);
    }
  }, [bankAccount]);

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate);
    }
  }, [endDate]);

  const handleSearch = () => {
    getTransactionHistory();
  };

  const tsToDate = (ts) => {
    const date = new Date(ts*1000)
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formatDate = `${day}-${month}-${year}`
    return formatDate
  }

  const formatMoney = (money) => {
    const formatedMoney = money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  + " VND"
    return formatedMoney
  }

  return (
    <div className="transferHistory">
      <Title title="TRA CỨU LỊCH SỬ GIAO DỊCH" />
      <div className="mt-4">
        <h5 className="text-success">LỊCH SỬ GIAO DỊCH</h5>
        <hr />
        <div className="row">
          <DatePicker
            className="col-10 ml-4"
            placeholderText="Ngày bắt đầu"
            onChange={(date) => setStartDate(date.getTime())}
            selected={startDate}
            dateFormat="dd-MM-yyyy"
          />
          <DatePicker
            className="col-10 "
            placeholderText="Ngày kết thúc"
            onChange={(date) => setEndDate(date.getTime())}
            selected={endDate}
            dateFormat="dd-MM-yyyy"
          />
          <div className="col-2"></div>
          <button className="btn btn-success" onClick={handleSearch}>
            Xem lịch sử
          </button>
        </div>
      </div>
      <div>
        <table className="table table-hover mt-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Ngày giao dịch</th>
              <th scope="col">Số ID</th>
              <th scope="col">Loại giao dịch</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((item) => (
                <tr className={item.from_credit_number ? "table-success" : "table-danger"} key={item.transaction_id}>
                  <td>{tsToDate(item.ts)}</td>
                  <td>{item.transaction_id}</td>
                  {item.to_credit_number &&
                  <td>Gửi</td>}
                  {item.from_credit_number &&
                  <td>Nhận</td>}
                  <td>{formatMoney(item.amount)}</td>
                  <td className="max-width-desc">
                    <span><b>Tài khoản gửi: </b>{item.to_credit_number ? item.credit_number : item.from_credit_number}</span>
                    <br />
                    <span><b>Tài khoản nhận: </b>{item.to_credit_number ? item.to_credit_number : item.credit_number}</span>
                    <br />
                    <span>
                      <b>Nội dung: </b>{item.message}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bankAccount: state.bankAccount,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionHistory: () =>
    dispatch(bankAccountActions.getTransactionHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferHistory);
