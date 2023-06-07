import { Link } from "react-router-dom";
import Background404 from "../assets/img/404.jpg";

const NotFound404 = () => {
  return (
    <>
      <div className="NF404">
        <div>
          <img className="img-404" src={Background404} />
        </div>
        <div>
          <Link className="btn btn-success" to="/">
            <i className="fa-solid fa-arrow-left"></i> Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound404;
