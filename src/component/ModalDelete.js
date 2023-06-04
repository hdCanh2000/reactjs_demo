import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalDelete = (props) => {
  const { show, hide, dataUserDelete, handleDeleteUser } = props;

  const handleDelete = async () => {
    const response = await deleteUser(dataUserDelete.id);
    console.log(response);
    if (response && response.statusCode === 204) {
      hide();
      toast.success("Delete user success!!");
      handleDeleteUser(dataUserDelete);
    } else {
      toast.error("Delete user failed!!!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={hide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>THÔNG BÁO!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <h5>Xác nhận xóa User: {dataUserDelete.first_name} ?</h5>
            <h6>Email User: {dataUserDelete.email}</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hide}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
