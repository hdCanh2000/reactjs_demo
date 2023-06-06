import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import randomEmail from "random-email";
import { postNewUser, putUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalUser = (props) => {
  const {
    show,
    hide,
    handleAddNewUser,
    handleUpdateUser,
    statusForm,
    dataUserEdit,
  } = props;
  const [userName, setUserName] = useState("");
  const [userJob, setUserJob] = useState("");

  useEffect(() => {
    if (show) {
      setUserName(dataUserEdit.first_name);
      // setUserJob(dataUserEdit.email);
    }
  }, [dataUserEdit]);

  let dataUser = { name: userName, job: userJob };

  const handleSaveUser = async () => {
    if (statusForm === "add") {
      const response = await postNewUser(dataUser);
      console.log(response);
      if (response && response.id) {
        hide();
        setUserName("");
        setUserJob("");
        toast.success("Create user success!!");
        handleAddNewUser({
          first_name: userName,
          id: response.id,
          email: `${userName}@ReactHook.com`,
          // email: randomEmail({ domain: "ReactHook.com" }),
        });
      } else {
        toast.error("Create user failed!!!");
      }
    } else {
      const response = await putUser(dataUser);
      console.log(response);
      if (response && response.updatedAt) {
        hide();
        setUserJob("");
        setUserName("");
        toast.success("Edit user success!!");
        handleUpdateUser({
          first_name: userName,
          id: dataUserEdit.id,
          email: `${userName}@ReactHook.com`,
        });
      } else {
        toast.error("Edit user failed!!!");
      }
    }
  };

  const statusFormModal = () => {
    if (statusForm === "add") {
      return "Add New User";
    } else {
      return "Edit a User";
    }
  };

  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{statusFormModal()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword" hidden>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email..."
                  value={userJob}
                  onChange={(e) => setUserJob(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hide}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
