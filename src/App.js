import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./page/home/Header";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import TableUser from "./page/users/TableUser";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
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
