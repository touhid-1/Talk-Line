import React, { useEffect, useState } from 'react'
import { useWebRTC } from '../hooks/useWebRTC'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRoom } from '../http';

const Room = () => {
    const { id: roomId } = useParams();
    const user = useSelector(state => state.auth.user)
    const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
    // console.log(user);
    const [room, setRoom] = useState(null);
    const [isMute, setMute] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        handleMute(isMute, user?.id)
    }, [isMute])

    const handleManualLeave = () => {
        navigate('/rooms');
    }

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            console.log(data)
            setRoom((prev) => data);
        };
        fetchRoom();

    }, [roomId])



    const handleMuteClick = (clientId) => {
        if (clientId !== user?.id) return;
        setMute((isMute) => !isMute);
    }

    return (
        <div className="text-white">
            <div className="max-w-6xl mx-auto">
                <button onClick={handleManualLeave} className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="none" d="M0 0h24v24H0V0z" opacity="1" /><path fill="white" d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" /></svg>
                <h2 className="font-bold text-md md:text-lg ml-2">All connected Clients</h2>
                </button>
            </div>

            <div className="rounded-t-xl p-5 mt-10 bg-[#112a02] h-[calc(100vh-188px)]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg md:text-xl ml-2 h-10">{room?.topic}</h2>
                    <div className="flex flex-row justify-between items-center">
                        <button className="rounded-full bg-gray-500 py-1 px-2 mr-2">✋</button>
                        <button onClick={handleManualLeave} className="rounded-full bg-gray-500 py-1 px-3">✌ Leave quietly</button>
                    </div>
                </div>

                <div className="flex flex-row">
                    {clients.map((client) => {
                        return (
                            <div className="flex flex-col justify-center items-center" key={client._id}>
                                <div className="w-28 flex flex-col justify-center items-center" >
                                    <audio
                                        autoPlay
                                        // controls
                                        ref={(instance) => {
                                            provideRef(instance, client.id);
                                        }}
                                    />
                                    <div className="profile-img-div relative rounded-full flex justify-center items-center w-14 h-14 sm:w-20 sm:h-20">
                                        <img className="w-14 h-14 sm:w-20 sm:h-20 rounded-full profile-img p-1 " src={client.avatar} alt='client-image' />

                                        <button onClick={() => handleMuteClick(client.id)} className="absolute bottom-0 right-1 bg-[#262626] rounded-full p-1">

                                            {client.muted ? (
                                                <img src="/images/mic-mute.png" className="w-4 h-4" alt="mic-mute" />
                                            ) : (
                                                <img src="/images/mic.png" className="w-4 h-4" alt="mic-on" />
                                            )
                                            }

                                        </button>
                                    </div>
                                </div>
                                <h4>{client.name}</h4>
                            </div>
                        );
                    })}
                </div>

            </div>

        </div>
    )
}

export default Room;