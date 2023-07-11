import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {Table, Button, Container, Row , Col} from 'react-bootstrap';  
import { variables } from './Variables';
import './App.css';
import {Modal} from 'react-bootstrap'; 
import Department from './Department';

const Student = () => {

  const [studentsdetails, setstudentsdetails] = useState([]);
  const [departmentdetails, setdepartmentdetails] = useState([]);
  const [show, setShow] = useState(false);
  const modalClose= () => setShow(false);
  const modelShow = () => setShow(true);
  const [editshow, seteditShow] = useState(false);
    const editmodalClose= () => seteditShow(false);
    const editmodelShow = (id) =>
     {
      seteditShow(true);
      getstudentdetailsbyid(id);

    }

  const [studentName, setstudentName] = useState('');
  const [course, setcourse] = useState('');
  const [specialization, setspecialization] = useState('');
  const [percentage, setpercentage] = useState('');
  const [departmentId, setdepartmentId] = useState();

  const [editstudentName, seteditstudentName] = useState('');
  const [editcourse, seteditcourse] = useState('');
  const [editspecialization, seteditspecialization] = useState('');
  const [editpercentage, seteditpercentage] = useState('');
  const [editdepartmentId, seteditdepartmentId] = useState();
  const [editstudentId, seteditstudentId] = useState();

  const handleChange = (event) => {

    setdepartmentId(event.target.value);
 
  };

  const edithandleChange = (event) => {

    seteditdepartmentId(event.target.value);
 
  };

  const getstudentsdetails = () => {
    axios
        .get(`${variables.apiurl}/Students`)
        .then(res => setstudentsdetails(res.data))
        .catch(error => console.log(error));
        // console.log(studentdetails);
};

const getdepartmentdetails = () => {
  axios
      .get(`${variables.apiurl}/Department`)
      .then(res => setdepartmentdetails(res.data))
      .catch(error => console.log(error));
      // console.log(studentdetails);
};

const getstudentdetailsbyid = (id) =>
{

  seteditstudentId(id);
  axios.get(`${variables.apiurl}/Students/${id}`)
  .then((res) => 
  {
    seteditstudentName(res.data.studentName);
    seteditcourse(res.data.course);
    seteditspecialization(res.data.specialization);
    seteditpercentage(res.data.percentage);
    seteditdepartmentId(res.data.departmentId);
    
  });
}

const handleAdd = () =>
{
  const data = {
     "studentName": studentName,
     "course": course,
     "specialization": specialization,
     "percentage": percentage,
     "departmentId": departmentId
  }
   axios.post(`${variables.apiurl}/Students`,data)
        .then((res) => 
        {getstudentsdetails();
          clear();
          modalClose();
        });
}

const handleDelete = (id) => 
{
  axios.delete(`${variables.apiurl}/Students/${id}`)
  .then((res) => 
  {getstudentsdetails();});

}

const handleUpdate = () => {

  const data = {
    "studentId": editstudentId,
    "studentName": editstudentName,
    "course": editcourse,
    "specialization": editspecialization ,
    "percentage": editpercentage,
    "departmentId": editdepartmentId,
  }

  axios.put(`${variables.apiurl}/Students/${editstudentId}`,data)
  .then((res) => 
  {getstudentsdetails();
    clear();
    editmodalClose();
  });

}

const clear = () =>{
  setstudentName('');
  setcourse('');
  setspecialization('');
  setpercentage('');
  setdepartmentId('');
  seteditstudentName('');
  seteditcourse('');
  seteditspecialization('');
  seteditpercentage('');
  seteditdepartmentId('');


}


useEffect(() => {
  getstudentsdetails();
  getdepartmentdetails();
},[]);

  return (
    <Fragment>
       <div className='depbutton'>
        <Button variant="primary" onClick={modelShow}>Add student</Button> 
        </div>
        <Modal backdrop="static" show={show} onHide={modalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Add student</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
              <Container>
                <Row>
                  <Col>student name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter student name"  required
                 value={studentName} onChange={(e) => setstudentName(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>course</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter course"  required
                 value={course} onChange={(e) => setcourse(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>specialization</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter specialization"  required
                 value={specialization} onChange={(e) => setspecialization(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>percentage</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter percentage"  required
                 value={percentage} onChange={(e) => setpercentage(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>department</Col>
                  <Col> <select value={departmentId} onChange={handleChange}>
                       {departmentdetails.map((department) => (
                        <option value={department.departmentId}>{department.departmentName}</option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>  
            
            <Modal.Footer>  
            <Button variant="secondary" onClick={modalClose}>Cancel</Button>  
            <Button variant="primary" onClick={ ()=> handleAdd() }>Add</Button>  
            </Modal.Footer>  
        </Modal>  
         <div className='p-5'>  
  <Table striped bordered hover size='sm'>  
  <thead>  
    <tr>   
      <th>student ID</th>  
      <th>student Name</th> 
      <th>course</th> 
      <th>specialization</th> 
      <th>percentage</th> 
      <th>Department Id</th>  
    </tr>  
  </thead>  
  <tbody>  
  {studentsdetails.map(student => (
              <tr key={student.studentId}>
                 <td>{student.studentId}</td>
                 <td>{student.studentName}</td>
                <td>{student.course}</td>
                <td>{student.specialization}</td>
                <td>{student.percentage}</td>
                <td>{student.departmentId}</td>
                <td colSpan={2}>
                &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;
                  <button className="btn btn-primary" onClick={()=>editmodelShow(student.studentId)} >Edit</button> &nbsp;
                  <button className="btn btn-danger" onClick={()=>handleDelete(student.studentId)}>Delete</button>
                </td>
              </tr>
            ))}
  </tbody>  
</Table> 
</div>  
<Modal backdrop="static" show={editshow} onHide={editmodalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Edit Student</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
            <Container>
                <Row>
                  <Col>student name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter student name"  required
                 value={editstudentName} onChange={(e) => seteditstudentName(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>course</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter course"  required
                 value={editcourse} onChange={(e) => seteditcourse(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>specialization</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter specialization"  required
                 value={editspecialization} onChange={(e) => seteditspecialization(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>percentage</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter percentage"  required
                 value={editpercentage} onChange={(e) => seteditpercentage(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>department</Col>
                  <Col> <select value={editdepartmentId} onChange={edithandleChange}>
                       {departmentdetails.map((department) => (
                        <option value={department.departmentId}>{department.departmentName}</option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Container>

            </Modal.Body>  
            
            <Modal.Footer>  
            <Button variant="secondary" onClick={editmodalClose}>Cancel</Button>  
            <Button variant="primary" onClick={ ()=> handleUpdate() }>Edit</Button>  
            </Modal.Footer>  
        </Modal>  
    </Fragment>
  )
}

export default Student;