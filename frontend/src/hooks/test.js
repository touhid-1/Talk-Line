import { useCallback, useEffect, useRef } from 'react'
import { useStateWithCallback } from './useStateWithCallback';
import { socketInit } from '../socket';
import { ACTIONS } from '../actions';
import freeice from "freeice";


export const useWebRTC = (roomId, user) => {
    // users list
    const [clients, setClients] = useStateWithCallback([]);

    //  user and there player audio instance
    const audioElements = useRef({});

    // Peer connections
    const connections = useRef({});

    // audio mic data capture
    const localMediaStream = useRef(null);

    const socket = useRef(null);
    // const clientsRef = useRef([]);
    const clientsRef = useRef(null);

    useEffect(() => {
        socket.current = socketInit();
    }, []);

    const addNewClient = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find(
                (client) => client.id === newClient.id
            );

            if (lookingFor === undefined) {
                setClients(
                    (existingClients) => [...existingClients, newClient],
                    cb
                );
            }
        },
        [clients, setClients]
    );

    // Capture media

    useEffect(() => {
        const startCapture = async () => {
            // Start capturing local audio stream.
            localMediaStream.current =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
        };

        startCapture().then(() => {
            addNewClient({ ...user, muted: true }, () => {
                const localElement = audioElements.current[user?.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }

                // socket emit JOIN socket io
                socket.current.emit(ACTIONS.JOIN, { roomId, user });
            });
        });
        
        return () => {
            localMediaStream.current
                .getTracks()
                .forEach((track) => track.stop());
            socket.current.emit(ACTIONS.LEAVE, { roomId });
        };
    });

    useEffect(() => {
        const handleNewPeer = async ({
            peerId,
            createOffer,
            user: remoteUser,
        }) => {
            // if already connected then give warning
            if (peerId in connections.current) {
                return console.warn(`You are already connected with ${peerId} (${user?.name})`);
            }

            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice(),
            });

            // Handle new ice candidate
            connections.current[peerId].onicecandidate = (event) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate,
                });
            };

            // Handle on track on this connection

            connections.current[peerId].ontrack = ({
                streams: [remoteStream],
            }) => {
                addNewClient({ ...remoteUser, muted: true }, () => {
                    if (audioElements.current[remoteuser?.id]) {
                        audioElements.current[remoteuser?.id].srcObject =
                            remoteStream;
                    } else {
                        let settled = false;
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteuser?.id]) {
                                audioElements.current[remoteuser?.id].srcObject =
                                    remoteStream;
                                settled = true;
                            }
                            if (settled) {
                                clearInterval(interval);
                            }
                        }, 300);
                    }
                });
            };

            // Add local track to remote connections
            localMediaStream.current.getTracks().forEach((track) => {
                connections.current[peerId].addTrack(
                    track,
                    localMediaStream.current
                );
            });

            // Create offer
            if (createOffer) {
                const offer = await connections.current[peerId].createOffer();

                await connections.current[peerId].setLocalDescription(offer);

                // send offer to another client
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: offer,
                });
            }
        };

        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socket.current.off(ACTIONS.ADD_PEER);
        };
    });

    // Handle ice candidate
    useEffect(() => {
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
            if (icecandidate) {
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        });

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE);
        };
    }, []);

    // Handle SDP
    useEffect(() => {
        const handleRemoteSdp = async ({
            peerId,
            sessionDescription: remoteSessionDescription,
        }) => {
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription)
            );

            // if session description is type of offer then create an answer

            if (remoteSessionDescription.type === 'offer') {
                const connection = connections.current[peerId];
                const answer = await connection.createAnswer();

                connection.setLocalDescription(answer);

                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer,
                });
            }
        };
        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);

        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        };
    }, []);

    // Handle remove peer
    useEffect(() => {
        const handleRemovePeer = async ({ peerId, userId }) => {
            if (connections.current[peerId]) {
                connections.current[peerId].close();
            }

            delete connections.current[peerId];
            delete audioElements.current[peerId];
            setClients((list) => list.filter((client) => client.id !== userId));
        };

        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            socket.current.off(ACTIONS.REMOVE_PEER);
        };
    });


    useEffect(() => {
        clientsRef.current = clients;
    }, [clients]);

    // Listen fro Mute Unmute
    useEffect(() => {
        socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
            setMute(true, userId);
        })
        socket.current.on(ACTIONS.UN_MUTE, ({ peerId, userId }) => {
            setMute(false, userId);
        })

        const setMute = (mute, userId) => {
            console.log('mute/unmute', mute)
            const clientIdx = clientsRef.current.map(client => client.id).indexOf(userId);
            console.log('idx', clientIdx);

            const connectedClients = JSON.parse(
                JSON.stringify(clientsRef.current)
            );
            if (clientIdx > -1) {
                connectedClients[clientIdx].muted = mute;
                setClients(connectedClients);
            } else {
                console.log('No User');
            }
        }
    })
 
    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    // Handling Mute

    const handleMute = (isMute, userId) => {
        console.log('Handle', isMute)


        let settled = false;

        let interval = setInterval(() => {
            if (localMediaStream.current) {
                localMediaStream.current.getTracks()[0].enabled = !isMute
                if (isMute) {
                    socket.current.emit(ACTIONS.MUTE, {
                        roomId,
                        userId,
                    })
                } else {
                    socket.current.emit(ACTIONS.UN_MUTE, {
                        roomId,
                        userId,
                    })
                }
                settled = true;
            }
            if (settled) {
                clearInterval(interval);
            }
        }, 200)
    }

    return { clients, provideRef, handleMute };
};

