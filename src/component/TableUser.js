// import { Table } from "antd";
import { useEffect, useState } from "react";
import _ from "lodash";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllUser } from "../services/UserService";
import ModalAddNewUser from "./ModalUser";
import { Button } from "react-bootstrap";
import ModalDelete from "./ModalDelete";
import { Input } from "antd";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const [statusForm, setStatusForm] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  // const [keySearch, setKeySearch] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const handleAddNewUser = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleUpdateUser = (user) => {
    let copyListUser = _.cloneDeep(listUser);
    let index = _.findIndex(listUser, (item) => item.id === user.id);
    copyListUser[index].first_name = user.first_name;
    copyListUser[index].email = user.email;
    setListUser(copyListUser);
  };

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
    let copyListUser = _.cloneDeep(listUser);
    copyListUser = _.filter(copyListUser, (item) => item.id !== user.id);
    setListUser(copyListUser);
  };

  //debounce: dùng để hạn chế call API quá nhiều lần trong cùng 1 thời điểm mà có thể set time
  const handleSearch = _.debounce((e) => {
    let keySearch = e.target.value;
    if (keySearch) {
      let copyListUser = _.cloneDeep(listUser);
      copyListUser = _.filter(copyListUser, (item) =>
        item.email.includes(keySearch)
      );
      setListUser(copyListUser);
    } else {
      getUser();
    }
  }, 500);

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
      <div>
        <h3 className="my-3">List User:</h3>
        <div className="my-3 d-flex justify-content-between">
          <Input
            className="col-4"
            placeholder="Search by UserName..."
            // value={keySearch}
            onChange={(e) => handleSearch(e)}
          />
          <Button
            className=""
            variant="outline-primary"
            onClick={() => {
              setShow(!show);
              setStatusForm("add");
            }}
          >
            Add new user
          </Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mail</th>
            <th>User Name</th>
            {/* <th>Last Name</th> */}
            <th>Actions</th>
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
                  {/* <td>{user.last_name}</td> */}
                  <td>
                    <Button
                      className="mx-1"
                      variant="outline-warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDataUserEdit(user);
                        setShow(!show);
                        setStatusForm("edit");
                      }}
                    >
                      <EditOutlined style={{ fontSize: "18px" }} />
                    </Button>
                    <Button
                      className="mx-1"
                      variant="outline-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDataUserDelete(user);
                        setShowDelete(!showDelete);
                      }}
                    >
                      <DeleteOutlined style={{ fontSize: "18px" }} />
                    </Button>
                  </td>
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
        handleAddNewUser={handleAddNewUser}
        handleUpdateUser={handleUpdateUser}
        statusForm={statusForm}
        dataUserEdit={dataUserEdit}
      />
      <ModalDelete
        show={showDelete}
        hide={() => setShowDelete(!showDelete)}
        handleDeleteUser={handleDeleteUser}
        dataUserDelete={dataUserDelete}
      />
      {/* <Table columns={columns} dataSource={data} onChange={onChange} />; */}
    </>
  );
};

export default TableUser;
