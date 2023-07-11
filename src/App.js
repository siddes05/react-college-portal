
import { Fragment } from 'react';
import {Container, Nav,Navbar} from 'react-bootstrap';
import { BrowserRouter, Routes, Route,Outlet } from "react-router-dom";
import Home from './Home';
import Student from './Student';
import Department from './Department';
import Navbarheader from './Navbarheader';



function App() {
  return (
    <Fragment>  
  
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbarheader />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="student" element={<Student />} />
          <Route path="department" element={<Department />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
 
    </Fragment>
  );
}

export default App;
