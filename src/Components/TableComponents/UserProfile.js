import React from "react";

const UserProfile = ({ image, name }) => {
  return (
    <>
      <div
        className={`col-12 d-flex justify-content-center align-items-center`}
      >
        <div className={`col-3`}>
          <img
            className={`col-12 vendorProfileImage rounded-circle`}
            src={image}
            alt="Vendor Profile"
          />
        </div>
        <div className="col-9 px-2">{name}</div>
      </div>
    </>
  );
};

export default UserProfile;
