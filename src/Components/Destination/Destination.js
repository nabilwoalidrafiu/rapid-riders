import React, { useContext, useEffect, useState } from 'react';
import riderData from '../../Data/Data.json';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import {} from './Destination.css'
import { useParams } from 'react-router';
import SimpleMap from '../SimpleMap/SimpleMap';

const Destination = (props) => {
    const {id} = useParams();

    const [rider, setRider] = useState([]);
    useEffect(()=>{
        setRider(riderData)
    },[]);

    const riders = riderData.find(ride => ride.id == id);
    console.log(riders);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
     const [submit, setSubmit] = useState(false)
     const onSubmit = data =>{
        //  console.log(data)
         setSubmit(data);
        };
    // console.log(watch("example"));
    return (
        <div >
            <div className="row">
                <div className="col-md-4">
                <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Pick From</label>    
            <input name="example" defaultValue="test" ref={register({ required: true })}/>
            <br/>
            <label htmlFor="">Pick To</label>    
            <input name="exampleRequired" ref={register({ required: true })} />
            <br/>
            {errors.exampleRequired && <span className='error'>This field is required</span>}
            
            <input type="submit" />
            {
              submit && 
              <div className='rider-name d-flex justify-content-around'>
                  <img src={riders.img} height='40px' width='50px' alt=""/>
                  <h5>{riders.name}</h5>
                  <h5>{riders.capacity}</h5>
                  <h5>{riders.cost}</h5>
              </div>
            }
            
            
            </form>
                </div>
                <div className="col-md-8">
                    <SimpleMap></SimpleMap>
                </div>
            </div>
            
            
        </div>
    );
};

export default Destination;