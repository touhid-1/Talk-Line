import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';


export default function useLoadingWithRefresh() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
                    withCredentials: true,
                });
                dispatch(setAuth(data));
                console.log(data)
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        })();
    })

    return { loading };

}
