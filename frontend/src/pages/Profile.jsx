import React from 'react'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';


const Profile = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <div className="text-white">
    <div className="max-w-6xl mx-auto">
        <Link to='/rooms' className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="none" d="M0 0h24v24H0V0z" opacity="1" /><path fill="white" d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" /></svg>
        <h2 className="font-bold text-md md:text-lg ml-2">Proceed to Rooms</h2>
        </Link>
    </div>

    <div className="rounded-t-xl p-5 mt-10 bg-[#112a02] h-[calc(100vh-188px)]">
        <div className="flex text-white justify-between items-center">
          <img src={user.avatar} alt="profile-img" />
          {user.name}
        </div>

        <div className="flex flex-row">
        </div>

    </div>

</div>
  )
}

export default Profile;