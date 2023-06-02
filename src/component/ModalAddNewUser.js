import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import randomEmail from "random-email";
import { postNewUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNewUser = (props) => {
  const { show, hide, handleUpdateTable } = props;
  const [userName, setUserName] = useState("");
  const [userJob, setUserJob] = useState("");

  const handleSaveUser = async () => {
    const response = await postNewUser({ name: userName, job: userJob });
    console.log(response);
    if (response && response.id) {
      hide();
      setUserJob("");
      setUserName("");
      toast.success("Create user success!!");
      handleUpdateTable({
        first_name: userName,
        id: response.id,
        email: randomEmail({ domain: "ReactHook.com" }),
      });
    } else {
      toast.error("Create user failed!!!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job..."
                  value={userJob}
                  onChange={(e) => setUserJob(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNewUser;
