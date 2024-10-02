import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
// Components import
import Navbar from "./components/Navbar/Navbar";
import NavbarResponsive from "./components/NavbarResponsive/NavbarResponsive";
import Routes from "./routes";
import { Container } from "react-bootstrap";
import { Toast } from "./components/custom/ToastMessage";

const App = () => {
  const [hamActive, setHamActive] = useState(false);

  return (
    <div className="App">
      <Toast />
      <Container fluid className="p-0" >
        <Navbar hamActive={hamActive} setHamActive={setHamActive} />
        <NavbarResponsive hamActive={hamActive} />
        <div>
          <Routes />
        </div>
      </Container>
    </div>
  );
};

export default App;
