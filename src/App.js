import logo from "./logo.svg";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./component/Header";
import TableUser from "./component/TableUser";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App-container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Header />
        <Container>
          <TableUser />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
