import React, { useState } from 'react'
import StepOtp from './Steps/StepOtp'
import StepPhone from './Steps/StepPhone'


const steps = {
    1: StepPhone,
    2: StepOtp
}

const Login = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step]

    const onNext = () => {
        setStep(step + 1);
    }
    return (
        <div className='text-white'>
            <Step onNext={onNext} />
        </div>
    )
}

export default Login