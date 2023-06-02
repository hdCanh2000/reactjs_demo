// import { Table } from "antd";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { getAllUser } from "../services/UserService";
import ModalAddNewUser from "./ModalAddNewUser";
import { Button } from "react-bootstrap";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const [show, setShow] = useState(false);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };

  const getUser = async (page) => {
    const response = await getAllUser(page);
    if (response && response.data) {
      setTotalUser(response.total);
      setTotalPage(response.total_pages);
      setListUser(response.data);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
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
      <div className="my-3 d-flex justify-content-between">
        <h3>List User:</h3>
        <Button
          className=""
          variant="outline-primary"
          onClick={() => {
            setShow(!show);
          }}
        >
          Add new user
        </Button>
      </div>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >>>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="<<< Previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNewUser
        show={show}
        hide={() => setShow(!show)}
        handleUpdateTable={handleUpdateTable}
      />
      {/* <Table columns={columns} dataSource={data} onChange={onChange} />; */}
    </>
  );
};

export default TableUser;
