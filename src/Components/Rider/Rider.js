import React from 'react';
import { useHistory } from 'react-router';
import {} from './Rider.css'
const Rider = (props) => {
    const {id, name, cost, img, capacity} = props.rider;
    const history = useHistory();
    const handleRider = () => {
        history.push(`/destination/${id}`)
    }
    return (
        <div className="team-card col-sm-8 col-md-3 mt-5">
            <div onClick={handleRider} className="rider card bg-primary h-100 shadow">
                <div className="card-photo m-auto w-75">
                    <img src={img} className="card-img-top w-100" alt="..."/>
                </div>
                <div className="card-body">
                    <h5 className="card-title fw-bold">{name} </h5>

                </div>
            </div>
        </div>
    );
};

export default Rider;