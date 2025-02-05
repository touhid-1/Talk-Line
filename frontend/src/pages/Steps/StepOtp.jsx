import React, { useState } from 'react'
import Button from '../../components/shared/Button/Button';
import Card from '../../components/shared/Card/Card';
import TextInput from '../../components/shared/TextInput';
import { verifyOtp } from '../../http/index';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';

const StepOtp = ({ onNext }) => {
  const [inputOtp, setInputOtp] = useState();
  const dispatch = useDispatch();
  const { phone, hash, otp } = useSelector((state) => state.auth.otp || {});
  console.log({ otp });


  async function submit() {
    // console.log(inputOtp, phone, hash)
    if (!inputOtp || !phone || !hash) return;

    try {
      const { data } = await verifyOtp({ otp: inputOtp, phone, hash });
      dispatch(setAuth(data?.data));
      // onNext();
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Card title="Enter Your OTP" icon="logo192.png" >
      <p className="text-[#808B82] my-5 ">
        {otp ?? 'no otp'}
      </p>
      <TextInput
        value={inputOtp}
        onChange={(e) => setInputOtp(e.target.value)}
      />
      <div className="my-5">
        <Button btnText="Verify" onClick={submit} />
      </div>
      <p className="text-[#808B82] my-5 w-[70%] mx-auto">
        By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
      </p>
    </Card>
  )
}

export default StepOtp