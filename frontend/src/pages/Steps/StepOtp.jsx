import React, { useState } from 'react'
import Button from '../../components/shared/Button/Button';
import Card from '../../components/shared/Card/Card';
import TextInput from '../../components/shared/TextInput';
import { verifyOtp } from '../../http/index';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.auth.otp)

  async function submit() {
    console.log(otp, phone, hash)
    if (!otp || !phone || !hash) return;

    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      dispatch(setAuth(data?.data));
      // onNext();
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Card title="Enter Your OTP" icon="logo192.png" >
      <TextInput
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
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