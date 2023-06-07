import { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/img/logo192.png";
import { toast } from "react-toastify";

// const items = [
//   {
//     label: "Navigation One",
//     key: "mail",
//     icon: <MailOutlined />,
//   },
//   {
//     label: "Navigation Two",
//     key: "app",
//     icon: <AppstoreOutlined />,
//     disabled: true,
//   },
//   {
//     label: "Navigation Three - Submenu",
//     key: "SubMenu",
//     icon: <SettingOutlined />,
//     children: [
//       {
//         type: "group",
//         label: "Item 1",
//         children: [
//           {
//             label: "Option 1",
//             key: "setting:1",
//           },
//           {
//             label: "Option 2",
//             key: "setting:2",
//           },
//         ],
//       },
//       {
//         type: "group",
//         label: "Item 2",
//         children: [
//           {
//             label: "Option 3",
//             key: "setting:3",
//           },
//           {
//             label: "Option 4",
//             key: "setting:4",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: (
//       <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//         Navigation Four - Link
//       </a>
//     ),
//     key: "alipay",
//   },
// ];

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Log out success!!!");
  };
  // const [current, setCurrent] = useState("mail");
  // const onClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };
  // return (
  //   <Menu
  //     onClick={onClick}
  //     selectedKeys={[current]}
  //     mode="horizontal"
  //     items={items}
  //   />
  // );

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} className="App-logo-header" alt="logo" />
          <span>ReactJS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Manage Users
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavLink className="dropdown-item" to="/login">
                Login
              </NavLink>
              <NavDropdown.Item onClick={() => handleLogout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
