import React from "react";

export const Nav = ({ navUserName, onSignOut }) => {
  const handleSignOut = () => {
    // Call the provided onSignOut callback to handle sign-out
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <h4>{navUserName.split("@")[0]}</h4>
            </a>
            <img
              className="mx-auto h-20 w-auto"
              src="./icr7_logo.png"
              alt="icr7 logo"
            />
            <button className="btn btn-outline-danger" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </nav>
      </>
    </div>
  );
};
