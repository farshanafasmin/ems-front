import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormLabel, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser } from '../services/AllApi';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';


function Add() {

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


  useEffect(() => {

    if (profile) {
      URL.createObjectURL(profile)   //it is used to change file to url
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {
      setshowpin(false)

    }, 2000);

  }, [profile])



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
      data.append("profile", profile)
      data.append("location", location)

      // header

      const headers = {
        "content-type": "multipart/form-data"
      }

      // api call

      const response = await addUser(data, headers)
      console.log(response);
      if (response.status == 200) {
        setNormalUserInputs({
          ...normalInputs,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        })

        setStatus("")
        setProfile("")
        setregisterData(response.data)

        // navigate to home page

        navigate('/')
      }
      else {
        alert('Request failed')
      }

    }

  }

  // console.log(normalInputs);
  // console.log(status);
  // console.log(profile);




  return (
    <>
      {
        showspin ?
          <LoadingSpinner /> :
          <div className='container mt-3'>


            <h1 className='text-center fw-bolder'>Add New Employee Details</h1>

            <div className='mt-3 shadow border rounded p-2'>

              <div className='text-center'>

                <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="no image" />

              </div>

              <Form className='mt-4'>
                <Row>
                  {/* react bootstrap->forms->floatinglabels */}
                  {/* first name */}
                  {/* set name attribute for all normal inputs */}
                  {/* we get value by performing onchange event  */}

                  {/* to get value we set a value attribute to each normal inputs */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First Name">
                    <Form.Control type="text" name='fname' placeholder="First Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                  </FloatingLabel>

                  {/* last name */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last Name">
                    <Form.Control type="text" name='lname' placeholder="Last Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                  </FloatingLabel>

                  {/* email */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
                    <Form.Control type="email" name='email' placeholder="Email" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                  </FloatingLabel>

                  {/* mobile number */}

                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
                    <Form.Control type="text" name='mobile' placeholder="Mobile" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                  </FloatingLabel>

                  {/* gender */}

                  <FormGroup className='mb-3 col-lg-6'>

                    <FormLabel>Select Gender</FormLabel>
                    <Form.Check type={"radio"} name='gender' value={"Male"} label={"Male"} onChange={e => getandsetuserNormalInputs(e)} />
                    {/* set name='gender' for select only one radio button */}
                    <Form.Check type={"radio"} name='gender' value={"Female"} label={"Female"} onChange={e => getandsetuserNormalInputs(e)} />


                  </FormGroup>

                  {/* status */}

                  <FormGroup className='mb-3 col-lg-6'>

                    <FormLabel>Select Employee Status</FormLabel>

                    <Select options={options} onChange={e => setStatus(e.value)} />


                  </FormGroup>

                  {/* .file upload */}

                  <FormGroup className='mb-3 col-lg-6'>

                    <FormLabel>Choose a profile picture</FormLabel>
                    <Form.Control type="file" onChange={e => handlefile(e)} name='profile' />

                  </FormGroup>

                  {/* location */}

                  <FloatingLabel className='mb-3 mt-3 col-lg-6' controlId="floatingInputlocation" label="Location">
                    <Form.Control type="text" name='location' placeholder="Location" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
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

export default Add 