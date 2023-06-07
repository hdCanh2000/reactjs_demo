// import { Table } from "antd";
import { useEffect, useState } from "react";
import _ from "lodash";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { getAllUser } from "../../services/UserService";
import ModalAddNewUser from "./ModalUser";
import { Button } from "react-bootstrap";
import ModalDelete from "../../component/ModalDelete";
import { Input } from "antd";
import "@fortawesome/fontawesome-free/css/all.css";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const [statusForm, setStatusForm] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [dataExport, setDataExport] = useState([]);

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

  const getUserExport = (event, done) => {
    let exportData = [];
    if (listUser && listUser.length > 0) {
      exportData.push(["ID", "Email", "User Name"]);
      _.map(listUser, (item, index) => {
        let exportItem = [];
        exportItem[0] = item.id;
        exportItem[1] = item.email;
        exportItem[2] = item.first_name;
        exportData.push(exportItem);
      });
      setDataExport(exportData);
      done();
    }
  };

  const handleImportFileCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only upload file CSV");
        return;
      }
      // Parse local CSV file
      Papa.parse(file, {
        // Header dùng để lấy các item đầu tiên làm header cho bảng
        // header: true,
        complete: (results) => {
          let CSV = results.data;
          if (CSV.length > 0) {
            if (CSV[0] && CSV[0].length === 3) {
              if (
                CSV[0][0] !== "ID" &&
                CSV[0][1] !== "Email" &&
                CSV[0][2] !== "User Name"
              ) {
                toast.error("Wrong format header CSV file!");
              } else {
                let dataCSV = [];
                _.map(CSV, (item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.id = item[0];
                    obj.email = item[1];
                    obj.first_name = item[2];
                    dataCSV.push(obj);
                  }
                  setListUser(dataCSV);
                  console.log("Finished:", results.data, dataCSV);
                });
              }
            } else {
              toast.error("Wrong format CSV file!");
            }
          } else {
            toast.error("Not found data on CSV file!");
          }
        },
      });
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
      <h3 className="my-3">List User:</h3>
      <div className="header-user my-3 d-flex">
        <Input
          className="col-12 col-sm-4"
          placeholder="Search by UserName..."
          // value={keySearch}
          onChange={(e) => handleSearch(e)}
        />
        <div className="btn-gr d-flex">
          <Button
            className=""
            variant="outline-primary"
            onClick={() => {
              setShow(!show);
              setStatusForm("add");
            }}
          >
            <i className="fa-solid fa-circle-plus"></i> Add New
          </Button>
          <div>
            <label
              className="mx-2 btn btn-outline-success"
              variant="outline-success"
              htmlFor="import"
            >
              <i className="fa-solid fa-file-import"></i> Import
            </label>
            <input
              id="import"
              type="file"
              hidden
              onChange={(e) => {
                handleImportFileCSV(e);
              }}
            />
          </div>
          <CSVLink
            data={dataExport}
            filename="DataTest.csv"
            target="_blank"
            asyncOnClick={true}
            onClick={(event, done) => getUserExport(event, done)}
          >
            <Button className="" variant="outline-warning">
              <i className="fa-solid fa-file-export"></i> Export
            </Button>
          </CSVLink>
        </div>
      </div>

      <div className="table-user">
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
                        <i className="fa-solid fa-pen-to-square"></i>
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
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

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
