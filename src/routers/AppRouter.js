import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import TableUser from "../page/users/TableUser";
import Login from "../page/login/Login";
import Home from "../page/home/Home";
import NotFound404 from "../component/NotFound404";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRouter>
              <TableUser />
            </PrivateRouter>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
};

export default AppRouter;
