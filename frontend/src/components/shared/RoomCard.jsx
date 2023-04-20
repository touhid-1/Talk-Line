import React from 'react'
import { useNavigate } from 'react-router-dom'

const RoomCard = ({ room }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/room/${room.id}`)} className="p-px rounded-2xl bg-gradient-to-tr from-[#43E32F] to-[#1FE1BA]">
      <div className="bg-gradient-to-tl from-[#031404] via-[#0a2015] to-[#1F442A] p-3 rounded-2xl h-40">
        <h3 className="font-semibold h-[20%]">{room.topic}</h3>
        <div className="flex justify-between items-center h-[60%]">
          <div className="flex -space-x-4 items-center">
            {room.speakers.map(speaker => (
              <img key={speaker.id} src={speaker.avatar} alt="speaker img" className="w-10 h-10 rounded-full profile-img-div p-0.5" />
            ))}
          </div>
          <div className="leading-3 my-2">
            {room.speakers.map(speaker => (
              <div key={speaker.id} className="">
                <span className="text-sm">{speaker.name}</span>
                {/* <img src={speaker.avatar} alt="chat" /> */}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center h-[20%]">
          <span className="mr-1 text-sm">{room.totalPeople}</span>
          <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.642 6.623a2.985 2.985 0 1 0 0-5.97 2.985 2.985 0 1 0 0 5.97Zm0 1.493c-1.993 0-5.971 1-5.971 2.986v1.492h11.942v-1.492c0-1.986-3.978-2.986-5.971-2.986Z" fill="#C4C5C5" /></svg>
        </div>
      </div>
    </div>
  )
}

export default RoomCard