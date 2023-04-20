import React, { useState } from 'react'
import StepPhone from './Steps/StepPhone';
import StepOtp from './Steps/StepOtp';
import StepName from './Steps/StepName';
import StepAvatar from './Steps/StepAvatar';
import StepUsername from './Steps/StepUsername';

const steps = {
    1: StepPhone,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: StepUsername
}

const Register = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step]

    const onNext =() => {
      setStep(step + 1);
    }

  return (
    <div className='text-white'>
        <Step onNext={onNext} />
    </div>
  )
}

export default Register