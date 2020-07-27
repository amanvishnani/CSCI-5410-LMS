import { useState, useEffect } from "react";
import Axios from "axios";

function useFetch(url) {
    const [data, setData] = useState(null)
    useEffect(() => {
        async function fetchData() {
            let r = await Axios.get(url);
            setData(r.data)
        }
        fetchData()
        return () => {
            // cleanup
        }
    }, [url])
    return data;
}


export {
    useFetch
}

