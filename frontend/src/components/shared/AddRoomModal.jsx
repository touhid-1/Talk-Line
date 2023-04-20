import React, { useState } from 'react';
import Button from './Button/Button';
import TextInput from './TextInput';
import { createRoom as create } from '../../http/index';
import { useNavigate } from 'react-router-dom';

const AddRoomModal = ({ closeModal }) => {
    const navigate = useNavigate();
    const [roomType, setRoomType] = useState('open');
    const [topic, setTopic] = useState('');

    const createRoom = async () => {
        // server call
        try {
            if (!topic) return;
            const { data } = await create({ topic, roomType });
            navigate(`/room/${data.id}`);
        } catch (error) {
            console.log(error.message);
        }
    }

    const tabStyle = {
        height: '8rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.5rem',
    };
    const activeTab = {
        background: '#09260b',
        height: '8rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.5rem',
    };

    return (
        <div className="text-white fixed top-0 left-0 bottom-0 right-0 bg-[#00000099] flex justify-center items-center">
            <div className="w-[28rem] bg-[#031404] rounded-lg">

                <div className="text-end pr-1 pt-1">
                    <button onClick={closeModal}><img src="/images/close.png" alt="close" /></button>
                </div>

                <div className="px-6">
                    <h3 className="text-md md:text-lg">Enter the topic to be disscussed</h3>
                    <div className="my-2">
                        {/* <TextInput value={topic} onChange={(e) => setTopic(e.target.value)} /> */}
                        <input type="text" className="h-8 w-full bg-[#09260b] outline-none text-white rounded-md px-4 py-1"
                         value={topic} onChange={(e) => setTopic(e.target.value)} />
                    </div>
                    <div className="">
                        <h3 className="text-md md:text-lg py-3">Room type</h3>
                        <div className="grid grid-cols-3 gap-3 pb-4">
                            <div
                                style={roomType === 'open' ? activeTab : tabStyle}
                                onClick={() => setRoomType('open')}
                            >
                                <img src="/images/globe.png" alt="globe" />
                                <span className="">Open</span>
                            </div>
                            {/* <div
                                style={roomType === 'social' ? activeTab : tabStyle}
                                onClick={() => setRoomType('social')}
                            >
                                <img src="/images/social.png" alt="social" />
                                <span className="">Social</span>
                            </div>
                            <div
                                style={roomType === 'private' ? activeTab : tabStyle}
                                onClick={() => setRoomType('private')}
                            >
                                <img src="/images/lock.png" alt="lock" />
                                <span className="">Private</span>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="border-t-[1px] border-[#323232]"></div>
                <div className="p-6">
                    <h2 className="text-center text-md">Start a room, open to everyone</h2>
                    <div className="w-full text-center mt-2">
                        <Button btnText="Let's Go" onClick={createRoom} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal;