import React, { useState } from 'react'
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../store/activateSlice';
import { activate } from '../.././http/index'
import { setAuth } from '../../store/authSlice';
import Loader from '../../components/shared/Loader';

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/IMG_20221128_015108.jpg?alt=media&token=c32e94e4-8fae-4b22-af10-95a1503f05cd');
  const [loading, setLoading] = useState(false);

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result))
    }
  }
  
  async function submit() {
    if (!name || !avatar) return;

    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader message="Activation in progress..." />;

  return (
    <Card title={`Okay, ${name}!`} icon="logo192.png" >
      <p className="text-[#808B82] mb-5 w-[70%] mx-auto text-center text-md">How’s this photo?</p>
      <div className="profile-img-div rounded-full flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20">
        <img
          src={image}
          alt="profile image"
          className=" w-16 h-16 sm:w-20 sm:h-20 p-1 rounded-full profile-img"
        />
      </div>
      <div className="cursor-pointer">
        <input
          onChange={captureImage}
          id="avatarInput"
          className="w-12 h-12 sm:w-16 sm:h-16 hidden"
          type="file"
        />
        <label htmlFor='avatarInput' className='gradient-text text-sm bg-gradient-to-t hover:bg-gradient-to-b from-[#43E32F] to-[#1FE1BA] w-max mx-auto text-bold'>Select your Photo here</label>
      </div>
      <div className="mb-5">
        <Button btnText="Next" onClick={submit} />
      </div>
    </Card>
  )
}

export default StepAvatar