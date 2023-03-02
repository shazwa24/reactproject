import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar/NavBar';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactCard } from './components/ContactCard/ContactCard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";


function App() {
  const [form, setForm] = useState(null);
  // const [showCards, setShowCards] = useState(null);
  const [user, setUser] = useState([]);
  // const user1 = {
  //   email: "abc@abc",
  //   firstName: "Abc",
  //   gender: "female",
  //   id: 11,
  //   lastName: "DEF",
  //   phone: "+60 184 408 0824"
  // }

  
  useEffect( () => {
    console.log("executed only once!");
    async function fetchData() {
      fetch("https://dummyjson.com/users?limit=10&select=id,firstName,lastName,email,gender,phone")
        .then((response) => response.json())
        .then((data) => {
          setUser(data["users"]);
          console.log(user);
        });
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    if (form != null) {
      setUser([form, ...user]);
    }

  }, [form]);

  return (
    <div className="App">
      <NavBar />
      <Row className="justify-content-md-center">
        <Col xs lg="4"> <ContactForm onFormSubmit={setForm} /> </Col>
        <Col xs lg="4" className="m-5">
          <Form.Group className="my-3 mx-5">
            <Form.Control type="text" placeholder="Filter Contacts..." />
          </Form.Group>

          {user.map((key, index) => (
            <ContactCard key={index} id = {index} form={key} />
          ))}

        </Col>
      </Row>

    </div>
  );
}

export default App;
