import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button/Button';
import Card from '../components/shared/Card/Card';

const Home = () => {
  const navigate = useNavigate();
  
  function startRegister() {
    navigate('authenticate');
    console.log('redirecting to authenticate');
  }

  return (
    <Card
      title="Welcome to Talk Line !"
      icon="logo192.png"
    >
      <p className="text-[#808B82] my-5 text-center">
        We’re working hard to get Talk Line ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks :)
      </p>
      <div className="my-4">
        <Button onClick={startRegister} btnText="Let's talk" />
      </div>
      {/* <div className="gradient-text text-sm bg-gradient-to-t hover:bg-gradient-to-b from-[#43E32F] to-[#1FE1BA] w-max mx-auto text-semibold">
          <span>Have an invite text?</span>
          <Link to="authenticate"> Sign in</Link>
        </div> */}
    </Card >
  )
}

export default Home