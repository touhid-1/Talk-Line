import React, { useEffect, useState } from 'react'
import AddRoomModal from '../components/shared/AddRoomModal';
import RoomCard from '../components/shared/RoomCard'
import { getAllRooms } from '../http/index';

// const rooms = [
//   {
//     id: 1,
//     topic: 'Which framework best for frontend ?',
//     speakers: [
//       {
//         id: 1,
//         name: 'Jhon Doe',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/IMG_20221128_015108.jpg?alt=media&token=c32e94e4-8fae-4b22-af10-95a1503f05cd'
//       },
//       {
//         id: 2,
//         name: 'Jane Verdict',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/javascript_icon_130900.png?alt=media&token=f6096366-3055-4423-aa0d-6febcbb8ce67'
//       },
//       {
//         id: 3,
//         name: 'Shaun Michael',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/typescript_plain_logo_icon_146316.png?alt=media&token=037b99dd-520c-44bb-9fc7-c936c6d5da9e'
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 2,
//     topic: 'Which framework best for frontend ?',
//     speakers: [
//       {
//         id: 1,
//         name: 'Jhon Doe',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/IMG_20221128_015108.jpg?alt=media&token=c32e94e4-8fae-4b22-af10-95a1503f05cd'
//       },
//       {
//         id: 2,
//         name: 'Jane Verdict',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/javascript_icon_130900.png?alt=media&token=f6096366-3055-4423-aa0d-6febcbb8ce67'
//       },
//       {
//         id: 3,
//         name: 'Shaun Michael',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/typescript_plain_logo_icon_146316.png?alt=media&token=037b99dd-520c-44bb-9fc7-c936c6d5da9e'
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: 'Which framework best for frontend ?',
//     speakers: [
//       {
//         id: 1,
//         name: 'Jhon Doe',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/IMG_20221128_015108.jpg?alt=media&token=c32e94e4-8fae-4b22-af10-95a1503f05cd'
//       },
//       {
//         id: 2,
//         name: 'Jane Verdict',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/javascript_icon_130900.png?alt=media&token=f6096366-3055-4423-aa0d-6febcbb8ce67'
//       },
//       {
//         id: 3,
//         name: 'Shaun Michael',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/typescript_plain_logo_icon_146316.png?alt=media&token=037b99dd-520c-44bb-9fc7-c936c6d5da9e'
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: 'Which framework best for frontend ?',
//     speakers: [
//       {
//         id: 1,
//         name: 'Jhon Doe',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/IMG_20221128_015108.jpg?alt=media&token=c32e94e4-8fae-4b22-af10-95a1503f05cd'
//       },
//       {
//         id: 2,
//         name: 'Jane Verdict',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/javascript_icon_130900.png?alt=media&token=f6096366-3055-4423-aa0d-6febcbb8ce67'
//       },
//       {
//         id: 3,
//         name: 'Shaun Michael',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/typescript_plain_logo_icon_146316.png?alt=media&token=037b99dd-520c-44bb-9fc7-c936c6d5da9e'
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: 'Which framework best for frontend ?',
//     speakers: [
//       {
//         id: 1,
//         name: 'Jhon Doe',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/IMG_20221128_015108.jpg?alt=media&token=c32e94e4-8fae-4b22-af10-95a1503f05cd'
//       },
//       {
//         id: 2,
//         name: 'Jane Verdict',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/javascript_icon_130900.png?alt=media&token=f6096366-3055-4423-aa0d-6febcbb8ce67'
//       },
//       {
//         id: 3,
//         name: 'Shaun Michael',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/react-gallery-33fe6.appspot.com/o/typescript_plain_logo_icon_146316.png?alt=media&token=037b99dd-520c-44bb-9fc7-c936c6d5da9e'
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {

  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
      console.log(data)
    }
    fetchRooms();
  }, [])

  const openModal = () => {
    setShowModal(true);
  }

  return (
    <div className="border-t-[1px] border-[#323232] ">
      <div className="p-5 max-w-6xl mx-auto flex flex-col text-white">

        <div className="flex flex-col sm:flex-row justify-between items-center">

          <div className="flex items-center justify-between">
            <span className="font-bold mr-4 text-lg w-max">All Rooms</span>
            <div className="flex items-center h-8 bg-[#262626] p-2 rounded-full">
              <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5Zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11Z" fill="#C4C5C5" /></svg>
              <input type="text" className="h-8 bg-[#262626] outline-none ml-2 text-white rounded-r-full py-1" placeholder='Search Rooms' onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="w-full mt-5 sm:mt-0 flex justify-center sm:justify-end items-center">
            <button
              className="bg-gradient-to-t from-[#43E32F] to-[#1FE1BA] bg-[length:100%_100%] hover:bg-[length:100%_125%] py-1 h-8 pr-5 pl-2 rounded-full flex items-center justify-around"
              onClick={openModal}
            >
              <svg width="30px" height="30px" viewBox="-9.12 -9.12 42.24 42.24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M20.9994 16.4767V19.1864C21.0036 20.2223 20.0722 21.0873 19.0264 20.9929C10 21 3 13.935 3.00706 4.96919C2.91287 3.92895 3.77358 3.00106 4.80811 3.00009H7.52325C7.96247 2.99577 8.38828 3.151 8.72131 3.43684C9.66813 4.24949 10.2771 7.00777 10.0428 8.10428C9.85987 8.96036 8.9969 9.55929 8.41019 10.1448C9.69858 12.4062 11.5746 14.2785 13.8405 15.5644C14.4272 14.9788 15.0273 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.8579 15.6021 21.0104 16.0337 20.9994 16.4767Z" fill="#fff"></path> <path d="M14.5 6.5C15.2371 6.64382 15.9689 6.96892 16.5 7.5C17.031 8.03108 17.3561 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9096 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9994 16.4767V19.1864C21.0036 20.2223 20.0722 21.0873 19.0264 20.9929C10 21 3 13.935 3.00706 4.96919C2.91287 3.92895 3.77358 3.00106 4.80811 3.00009H7.52325C7.96247 2.99577 8.38828 3.151 8.72131 3.43684C9.66813 4.24949 10.2771 7.00777 10.0428 8.10428C9.85987 8.96036 8.9969 9.55929 8.41019 10.1448C9.69858 12.4062 11.5746 14.2785 13.8405 15.5644C14.4272 14.9788 15.0273 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.8579 15.6021 21.0104 16.0337 20.9994 16.4767Z" stroke="#fff" strokeWidth="2.16" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              <span className=" text-sm md:text-md tracking-wide">Start a room</span>
            </button>
          </div>

        </div>


        {/* Rooms */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:grid-cols-4 mt-8">
          {
            rooms.filter((room) => {
              if (searchTerm === '') {
                return room;
              } else if (room.topic.toLowerCase().includes(searchTerm.toLowerCase())) {
                return room;
              }
            }).map((room) => (<RoomCard room={room} key={room.id} />))
          }
        </div>

      </div>

      {/* Modal */}
      {showModal && <AddRoomModal closeModal={() => setShowModal(false)} />}

    </div>
  )
}

export default Rooms;