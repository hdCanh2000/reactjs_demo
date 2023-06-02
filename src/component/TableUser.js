// import { Table } from "antd";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllUser } from "../services/UserService";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await getAllUser();
    if (response && response.data) {
      setListUser(response.data);
    }
  };

  //   const columns = [
  //     {
  //         title: "STT",
  //         dataIndex: "stt",
  //         sorter: (a, b) => a.stt - b.stt,
  //         sortDirections: ["descend"],
  //       },
  //     {
  //       title: "Name",
  //       dataIndex: "name",
  //       sorter: (a, b) => a.name.length - b.name.length,
  //       sortDirections: ["descend"],
  //     },
  //     {
  //       title: "Age",
  //       dataIndex: "age",
  //       defaultSortOrder: "descend",
  //       sorter: (a, b) => a.age - b.age,
  //     },
  //     {
  //       title: "Address",
  //       dataIndex: "address",
  //     },
  //   ];
  //   const data = [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //     },
  //   ];
  //   const onChange = (pagination, filters, sorter, extra) => {
  //     console.log("params", pagination, filters, sorter, extra);
  //   };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mail</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={`user - ${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>@{user.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {/* <Table columns={columns} dataSource={data} onChange={onChange} />; */}
    </>
  );
};

export default TableUser;
