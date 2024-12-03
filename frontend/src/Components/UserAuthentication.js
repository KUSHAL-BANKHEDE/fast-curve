import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export function Auth() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_code: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Validate First Name
    if (!/^[a-zA-Z]{2,20}$/.test(info.first_name)) {
      newErrors.first_name = "First name must be 2-20 alphabets only.";
    }

    // Validate Last Name
    if (!/^[a-zA-Z]{2,20}$/.test(info.last_name)) {
      newErrors.last_name = "Last name must be 2-20 alphabets only.";
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email_id)) {
      newErrors.email_id = "Enter a valid email address.";
    }

    // Validate Phone Code
    if (!/^\+?\d{1,4}$/.test(info.phone_code)) {
      newErrors.phone_code = "Phone code must be 1-4 digits and may include '+'.";
    }

    // Validate Phone Number
    if (!/^\d{7,12}$/.test(info.phone_number)) {
      newErrors.phone_number = "Phone number must be 7-12 digits only.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const addInfo = async () => {
    if (validate()) {
      try {
        sessionStorage.setItem("userInfo", JSON.stringify(info));
        console.log("User info:", info);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3>User Profile</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                placeholder="First Name"
                value={info.first_name}
                onChange={handleInputChange}
              />
              {errors.first_name && (
                <div className="invalid-feedback">{errors.first_name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                placeholder="Last Name"
                value={info.last_name}
                onChange={handleInputChange}
              />
              {errors.last_name && (
                <div className="invalid-feedback">{errors.last_name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email_id" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                name="email_id"
                id="email_id"
                className={`form-control ${errors.email_id ? "is-invalid" : ""}`}
                placeholder="Email ID"
                value={info.email_id}
                onChange={handleInputChange}
              />
              {errors.email_id && (
                <div className="invalid-feedback">{errors.email_id}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone_code" className="form-label">
                Phone Code
              </label>
              <input
                type="text"
                name="phone_code"
                id="phone_code"
                className={`form-control ${errors.phone_code ? "is-invalid" : ""}`}
                placeholder="Phone Code (e.g., +1)"
                value={info.phone_code}
                onChange={handleInputChange}
              />
              {errors.phone_code && (
                <div className="invalid-feedback">{errors.phone_code}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
                placeholder="Phone Number"
                value={info.phone_number}
                onChange={handleInputChange}
              />
              {errors.phone_number && (
                <div className="invalid-feedback">{errors.phone_number}</div>
              )}
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary" onClick={addInfo}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
