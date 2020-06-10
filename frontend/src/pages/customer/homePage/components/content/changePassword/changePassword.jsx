import React, { useState } from 'react';
import Title from '../component/title/title';
import ConfirmPassword from './components/confirmPassword/confirmPassword';
import ConfirmOTP from './components/confirmOTP/confirmOTP';

const ChangePassword = () => {
  const hinhThuc = ['Qua email'];
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [step, setStep] = useState(1);

  return (
    <div className="accountInfo">
      <Title title="THÔNG TIN CÁ NHÂN" />
      {step === 1 && (
        <ConfirmPassword
          setStep={setStep}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          hinhThuc={hinhThuc}
        />
      )}
      {step === 2 && (
        <ConfirmOTP
          newPassword={newPassword}
          setStep={setStep}
          hinhThuc={hinhThuc}
        />
      )}
    </div>
  );
};

export default ChangePassword;
