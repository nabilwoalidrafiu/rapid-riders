import React, { useEffect, useState } from 'react';
import riderData from '../../Data/Data.json'
import Rider from '../Rider/Rider';
import {} from './Home.css';
import w1 from './w1.jpg'
const Home = () => {
    const [rider, setRider] = useState([]);
    useEffect(()=>{
        setRider(riderData)
    },[])
    return (
        <div style={{ height: "600px", backgroundImage: `url(${w1})`,  backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div className='text-center row row-cols-1 row-cols-md-3 g-4'>
                {
                    riderData.map(rider => <Rider key={rider.id} rider= {rider}>{rider.name}</Rider>)
                }
            </div>
        </div>
    );
};

export default Home;