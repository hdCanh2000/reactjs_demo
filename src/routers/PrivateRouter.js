import { Route, Routes } from "react-router-dom";
import NotFound404 from "../component/NotFound404";

const PrivateRouter = (props) => {
  if (!localStorage.getItem("token")) {
    return (
      <>
        <Routes>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRouter;
