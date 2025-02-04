import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../../http/index';
import { setAuth } from '../../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector(state => state.auth);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="sticky top-0 p-5 max-w-6xl z-20 mx-auto flex justify-between items-center bg-[#031404]">
      <Link to='/' className="flex justify-center items-center">
        {/* <img src="https://i.pinimg.com/originals/c2/61/eb/c261eb4f5b4d38cf4f320f9188430c41.png" className="w-8 h-8 mr-2" alt="logo" /> */}
        <img src="https://i.pinimg.com/originals/c2/61/eb/c261eb4f5b4d38cf4f320f9188430c41.png" className="w-20 h-20" alt="logo" />
        <p className="text-[#FFFFFF] sm:text-2xl text-xl font-extrabold">Talk Line</p>
      </Link>

      {
        isAuth &&
        (
          <div className="flex justify-center items-center text-[#FFFFFF]">
            <h3 className="font-bold mr-4 hidden sm:block text-xl">{user?.name}</h3>
            <div className="profile-img-div rounded-full flex justify-center items-center w-16 h-16 ">
              <Link to="/profile">
                <img
                  src={user?.avatar ? user?.avatar : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}
                  alt="profile image"
                  className="w-16 h-16 rounded-full p-1 profile-img"
                />
              </Link>
            </div>
            {isAuth && <button onClick={logoutUser} className="text-white ml-2">Logout</button>}
          </div>
        )
      }

    </div>
  )
}

export default Navigation
