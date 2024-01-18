import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { allUsers } from '../services/AllApi';
import { BASE_URL } from '../services/baseUrl';


function View() {
  const[showspin,setshowpin]=useState(true)

  const[user,setUser]=useState({})

  // useparams is used to get path parameter of url
  // we get the parametr as an object so destructure it with a variable
  const {id}=useParams()
  console.log(id);



  useEffect(() => {

    getuser()
   setTimeout(()=>{
    setshowpin(false)

   },2000);
    
  }, [])

    // api call for getting single user details
    const getuser=async()=>{
      const {data}=await allUsers("")
      // console.log(data);
      // console.log(data.find(item=>item._id===id));

      setUser(data.find(item=>item._id===id))
    }
    console.log(user);
  
  return (
    <>
    {
    showspin?
    <LoadingSpinner/>:
      <div className='container' style={{ height: '80vh' }}>
       { 
          user?

        <Card className='shadow col-lg-6 ms-auto p-3 mt-5'>

          {/* image div */}
          <div className='text-center'>

            <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={`${BASE_URL}/Uploads/${user.profile}`} alt="no image" />

          </div>

          {/* contents */}

          <div className='text-center'>

            <h3>{user.fname} {user.lname}</h3>
            <h5>{user.email}</h5>
            <h5>{user.mobile}</h5>
            <h5>{user.gender}</h5>
            <h5>{user.status}</h5>
            <h5>{user.location}</h5>

          </div>
        </Card>:""
        
        
        }
      </div>
}                                                                                                            
    </>
  )
}

export default View