import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {Table, Button, Container, Row , Col} from 'react-bootstrap';  
import { variables } from './Variables';
import './App.css';
import {Modal} from 'react-bootstrap';  

const Department = () => {

    const [departmentdetails, setdepartmentdetails] = useState([]);
    const [show, setShow] = useState(false);
    const modalClose= () => setShow(false);
    const modelShow = () => setShow(true);

    const [departmentName, setdepartmentName] = useState('');

    const [editshow, seteditShow] = useState(false);
    const editmodalClose= () => seteditShow(false);
    const editmodelShow = (id) =>
     {
      seteditShow(true);
      getdepartmentdetailsbyid(id);

    }
    const [editid,seteditid] = useState('');

    const [editdepartmentName, seteditdepartmentName] = useState('');

    const getdepartmentdetails = () => {
        axios
            .get(`${variables.apiurl}/Department`)
            .then(res => setdepartmentdetails(res.data))
            .catch(error => console.log(error));
            // console.log(studentdetails);
    };

    const getdepartmentdetailsbyid = (id) =>
    {

      seteditid(id);
      axios.get(`${variables.apiurl}/Department/${id}`)
      .then((res) => 
      {seteditdepartmentName(res.data.departmentName)});
    }

    const handleAdd = () =>
    {
      const data = {
        "departmentName": departmentName
      }
       axios.post(`${variables.apiurl}/Department`,data)
            .then((res) => 
            {getdepartmentdetails();
              clear();
              modalClose();
            });
    }

    const handleDelete = (id) => 
    {
      axios.delete(`${variables.apiurl}/Department/${id}`)
      .then((res) => 
      {getdepartmentdetails();});

    }

    const handleUpdate = () => {

      const data = {
        "departmentId" : editid,
        "departmentName": editdepartmentName
      }

      axios.put(`${variables.apiurl}/Department/${editid}`,data)
      .then((res) => 
      {getdepartmentdetails();
        clear();
        editmodalClose();
      });

    }

    const clear = () =>{
      setdepartmentName('');
      seteditdepartmentName('');
    }
    
    useEffect(() => {
        getdepartmentdetails();
      },[]);

  return (
    <Fragment>
        <div className='depbutton'>
        <Button variant="primary" onClick={modelShow}>Add department</Button> 
        </div>
        <Modal backdrop="static" show={show} onHide={modalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Add department</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
              <Container>
                <Row>
                  <Col>Department name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter department"  required
                 value={departmentName} onChange={(e) => setdepartmentName(e.target.value)} /></Col>
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
      <th>Department ID</th>  
      <th>Department Name</th>  
    </tr>  
  </thead>  
  <tbody>  
  {departmentdetails.map(department => (
              <tr key={department.departmentId}>
                 <td>{department.departmentId}</td>
                <td>{department.departmentName}</td>
                <td colSpan={2}>
                &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;
                  <button className="btn btn-primary" onClick={()=>editmodelShow(department.departmentId)}>Edit</button> &nbsp;
                  <button className="btn btn-danger" onClick={()=>handleDelete(department.departmentId)}>Delete</button>
                </td>
              </tr>
            ))}
  </tbody>  
</Table> 
</div>  
<Modal backdrop="static" show={editshow} onHide={editmodalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Edit department</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
              <Container>
                <Row>
                  <Col>Department name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter department"  required
                 value={editdepartmentName} onChange={(e) => seteditdepartmentName(e.target.value)} /></Col>
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

export default Department