import React, { useState } from 'react';
import Button from '../../components/shared/Button/Button';
import Card from '../../components/shared/Card/Card';
// import TextInput from '../../components/shared/TextInput';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { sendOtp } from '../../http/index';

import { useDispatch } from 'react-redux';
import { setOtp } from '../.././store/authSlice';

const StepPhone = ({ onNext }) => {
  const [value, setValue] = useState();
  // const [phoneNumber, setPhoneNumber] = useState();
  const dispatch = useDispatch();


  async function submit() {
    if(!value) return console.log('first');
    // server request
    try {
      const { data } = await sendOtp({ phone: value });
      console.log(data);
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
      onNext();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Card title="Enter Your Phone Number" icon="logo192.png" >
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
        className=""
      />
      {/* <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      /> */}

      <div className="my-5">
        <Button btnText="Send OTP" onClick={submit} />
      </div>
      <p className="text-[#808B82] my-5 w-[70%] mx-auto">
        By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
      </p>
    </Card>
  )
}

export default StepPhone