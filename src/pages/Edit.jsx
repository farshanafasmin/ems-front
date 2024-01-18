import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormLabel, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser, allUsers, editUser } from '../services/AllApi';
import { registerContext } from './Contextshare';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';



function Edit() {

  // call the context inside usecontext hook,for using it in components
  const { registerData, setregisterData } = useContext(registerContext)

  const navigate = useNavigate()

  // from react-select for creating dropdown
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  const [showspin, setshowpin] = useState(true)
  // create this state for getting values through api and to hold normal user input
  const [normalInputs, setNormalUserInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })

  // create two state for hold status and profile

  const [status, setStatus] = useState("")

  const [profile, setProfile] = useState("")

  const [preview, setPreview] = useState("")

  useEffect(() => {

    if (profile) {
      setexistingImg("")
      URL.createObjectURL(profile)   //it is used to change file to url
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {
      setshowpin(false)

    }, 2000);

  }, [profile])


  // to get single item for edit

  const {id}=useParams()
  console.log(id);

  const [existingImg,setexistingImg]=useState("")

  useEffect(() => {
    
  getuser()
   
  }, [])
  
  // to get all employee details from backend

  const getuser=async()=>{
    const {data}=await allUsers("")
    console.log(data);

    let existingUser=data.find(item=>item._id===id)
    // console.log(existingUser);
    setNormalUserInputs(existingUser)
    setStatus(existingUser.status)
    setexistingImg(existingUser.profile)

  }
  // define normaluserinput function

  const getandsetuserNormalInputs = (e) => {
    // here name is the name attribute to get the value in name when onchnage event happened
    const { name, value } = e.target
    setNormalUserInputs({ ...normalInputs, [name]: value }) //key always enclosed in square brackets

  }
  // define handlefile function

  const handlefile = (e) => {
    // when happeniing events on file ,we get value from the 0th position of files session of target of event
    // console.log(e.target.files[0]);
    // setProfile(URL.createObjectURL(e.target.files[0]))
    setProfile(e.target.files[0])
  }


  



  // define handlesubmit function

  const handleSubmit = async (e) => {

    e.preventDefault()

    // destructure normal inputs

    const { fname, lname, email, mobile, gender, location } = normalInputs

    if (!fname || !lname || !email || !mobile || !gender || !status || !profile || !location) {

      alert('Please fill the form completely.....')

    }
    else {
      // alert('form submitted successfully.....')

      // when our form contains any uploading content,then it should be change to form data

      const data = new FormData()

      // body/data
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      profile? data.append("profile", profile):data.append("profile",existingImg)
      data.append("location", location)

      // header

      if(profile){

        var headers = {
          "content-type": "multipart/form-data"
        }

      }else{
        var headers=""
      }

      

      // api call

      const response = await editUser(id,data,headers)
      console.log(response);

      if (response.status == 200) {

        navigate('/')
       
      }
      else {
        alert('Request failed')
      }

    }

  }
  return (
    <>
   {
        showspin ?
          <LoadingSpinner /> :
          <div className='container mt-3'>


            <h1 className='text-center fw-bolder'>Update Employee Details</h1>

            <div className='mt-3 shadow border rounded p-2'>

              <div className='text-center'>

                <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={preview ? preview : `${BASE_URL}/Uploads/${existingImg}`} alt="no image" />

              </div>

              <Form className='mt-4'>
                <Row>
                  {/* react bootstrap->forms->floatinglabels */}
                  {/* first name */}
                  {/* set name attribute for all normal inputs */}
                  {/* we get value by performing onchange event  */}

                  {/* to get value we set a value attribute to each normal inputs */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First Name">
                    <Form.Control type="text" name='fname' placeholder="First Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.fname} />
                  </FloatingLabel>

                  {/* last name */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last Name">
                    <Form.Control type="text" name='lname' placeholder="Last Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.lname} />
                  </FloatingLabel>

                  {/* email */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
                    <Form.Control type="email" name='email' placeholder="Email" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.email} />
                  </FloatingLabel>

                  {/* mobile number */}

                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
                    <Form.Control type="text" name='mobile' placeholder="Mobile" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.mobile} />
                  </FloatingLabel>

                  {/* gender */}

                  <FormGroup className='mb-3 col-lg-6'>

                    <FormLabel>Select Gender</FormLabel>
                    <Form.Check type={"radio"} name='gender' value={"Male"} label={"Male"} onChange={e => getandsetuserNormalInputs(e)} checked={normalInputs.gender==="Male"?true:false}/>
                    {/* set name='gender' for select only one radio button */}
                    <Form.Check type={"radio"} name='gender' value={"Female"} label={"Female"} onChange={e => getandsetuserNormalInputs(e)} checked={normalInputs.gender==="Female"?true:false}/>


                  </FormGroup>

                  {/* status */}

                  <FormGroup className='mb-3 col-lg-6'>

                    <FormLabel>Select Employee Status</FormLabel>

                    <Select placeholder={status} options={options} onChange={e => setStatus(e.value)} />


                  </FormGroup>

                  {/* .file upload */}

                  <FormGroup className='mb-3 col-lg-6'>

                    <FormLabel>Choose a profile picture</FormLabel>
                    <Form.Control type="file" onChange={e => handlefile(e)} name='profile' />

                  </FormGroup>

                  {/* location */}

                  <FloatingLabel className='mb-3 mt-3 col-lg-6' controlId="floatingInputlocation" label="Location">
                    <Form.Control type="text" name='location' placeholder="Location" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.location} />
                  </FloatingLabel>

                  {/* button */}

                  <Button type='submit' variant='primary' onClick={e => handleSubmit(e)}>Submit</Button>

                </Row>



              </Form>


            </div>

          </div>

      }


    </>
  )
}

export default Edit