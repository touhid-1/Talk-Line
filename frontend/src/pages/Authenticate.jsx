import React, { useState } from 'react'
import StepOtp from './Steps/StepOtp'
import StepPhone from './Steps/StepPhone'


const steps = {
    1: StepPhone,
    2: StepOtp,
};

const Authenticate = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];

    function onNext() {
        setStep(step + 1);
    }

    return <Step onNext={onNext} />;
};

export default Authenticate;