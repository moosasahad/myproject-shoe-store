import React, { useContext } from "react";
import { AllContext } from "../../Context/MyContext";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserFound() {
  const { currentUser, UserLogin } = useContext(AllContext);
  // console.log("on checking  ",currentUser);

  const { handlelogout } = UserLogin;
  const userName = currentUser?.username;
  const userEmail = currentUser?.email;

  // console.log("gfghfjhgj",userName);

  if (!currentUser) {
    return (
      <div className="bg-danger text-white h-100 d-flex flex-column justify-content-center align-items-center">
        <p className="display-4">User Not Available!</p>
        <Link to="/login" className="btn btn-primary mt-3">
          Please Login
        </Link>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <FaUser className="w-50 h-50 mb-3" />
          <h2 className="card-title">{userName}</h2>
          <p className="card-text text-muted">An active user</p>

          <p className="card-text">Email Address: {userEmail}</p>
          <button className="btn btn-danger me-2" onClick={handlelogout}>
            Log out
          </button>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserFound;
