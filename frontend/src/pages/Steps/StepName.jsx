import React, { useState } from 'react';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import TextInput from '../../components/shared/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../store/activateSlice';

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate)
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);

  function nextStep() {
    if (!fullname) {
      return;
    }

    dispatch(setName(fullname));
    onNext();
  }

  return (
    <Card title="What's your Name ?" icon="logo192.png" >
      <TextInput
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <div className="my-5">
        <Button btnText="Next" onClick={nextStep} />
      </div>
      <p className="text-[#808B82] my-5 w-[70%] mx-auto text-center">
        People use real names at Talk Line :)       </p>
    </Card>
  )
}

export default StepName