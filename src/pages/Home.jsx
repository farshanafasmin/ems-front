import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeTable from '../components/HomeTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from './Contextshare'
import Alert from 'react-bootstrap/Alert';
import { allUsers, deleteUser } from '../services/AllApi'





function Home() {
  const { registerData, setregisterData } = useContext(registerContext)

  const[showspin,setshowpin]=useState(true)

  const[Allusers,setAllusers]=useState([])

  // create state for search 

  const[search,setSearch]=useState("")

  useEffect(() => {

    getAllEmployees()

   setTimeout(()=>{
    setshowpin(false)

   },2000);

    
  }, [search])
  
// function definition for get all data(All employees)


const getAllEmployees=async()=> {

  const response=await allUsers(search)

  console.log(response);
  // update the state by set the data of response to setAllusers
  setAllusers(response.data)
  
}

// delete employee

const removeUser=async(id)=>{
  const response=await deleteUser(id)
  console.log(id);

  if(response.status===200){
    getAllEmployees()
  }else{
    alert('Operation failed!!! please try after some time')
  }
}


  return (
    <>

    {
       registerData && <Alert variant='success' onClose={()=>setregisterData("")} dismissible>
        {registerData.fname.toUpperCase()} Registered successfully...........
       </Alert>
    }


    {
      showspin?
        <LoadingSpinner/>:
        <div className='container '>
  
          <div className='search-all d-flex align-items-center'>
  
            <div className="search d-flex align-items-center mt-4">
  
              <span className='fw-bolder'>Search:</span>
  
              <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='Search By Employee Name' className='form-control ms-3' style={{ width: '400px' }} />
  
            </div>
  
            <Link to={'/add'} className='btn btn-success ms-auto mt-3 '>
              Add<i class="fa-solid fa-user-plus ms-1"></i>
            </Link>
  
          </div>
  
          <div className='table mt-5'>
  
            <h1 className='fw-bolder'>List Of All Employees</h1>
            
            <HomeTable displayData={Allusers} removeuser={removeUser}/>
  
          </div>
  
        </div>
}
    
    </>
  )
}

export default Home