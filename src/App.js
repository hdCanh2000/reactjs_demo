import logo from "./logo.svg";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./component/Header";
import TableUser from "./component/TableUser";

function App() {
  return (
    <div className="App-container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Header />
      <Container>
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
