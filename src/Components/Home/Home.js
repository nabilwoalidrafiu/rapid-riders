import React, { useEffect, useState } from 'react';
import riderData from '../../Data/Data.json'
import Header from '../Header/Header';
import Rider from '../Rider/Rider';
const Home = () => {
    const [rider, setRider] = useState([]);
    useEffect(()=>{
        setRider(riderData)
    },[])
    return (
        <div className="teams mt-5 container">
            <div className='text-center row row-cols-1 row-cols-md-3 g-4'>
                {
                    riderData.map(rider => <Rider key={rider.id} rider= {rider}>{rider.name}</Rider>)
                }
            </div>
        </div>
    );
};

export default Home;