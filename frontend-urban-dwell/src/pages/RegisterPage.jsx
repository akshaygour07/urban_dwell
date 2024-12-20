import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // profileImage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    // const { name, value, files } = e.target;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const SIGNUP_MUTATION = `
    mutation Signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      signup(input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }) {
        firstName
        lastName
        email
      }
    }
  `;

  const GRAPHQL_ENDPOINT = "http://localhost:8000/graphql";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      setPasswordMatch(true);
    } else {
      setFormData(false);
    }

    const variables = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      profileImage: formData.profileImage,
    };

    // Create a new FormData object
    // const form = new FormData();
    // form.append("firstName", formData.firstName);
    // form.append("lastName", formData.lastName);
    // form.append("email", formData.email);
    // form.append("password", formData.password);
    // form.append("profileImage", formData.profileImage);

    try {
      const response = await axios.post(
        GRAPHQL_ENDPOINT,
        {
          query: SIGNUP_MUTATION,
          variables: variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // try {
      //   const response = await axios.post(GRAPHQL_ENDPOINT, form, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     params: {
      //       query: SIGNUP_MUTATION,
      //       variables: JSON.stringify(variables), // Pass other variables as JSON
      //     },
      //   });
      const data = response.data;
      if (data.errors) {
        console.log("Something went wrong", data.errors);
      } else {
        console.log("Success:", data);
      }
    } catch (err) {
      console.log("Network error. Please try again.", err);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <div style={{ color: "red" }}>Passwords do not match!</div>
          )}
          
          {/* <input
            style={{ display: "none" }}
            id="image"
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Profile Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile Image"
              style={{ maxWidth: "80px", borderRadius: "50%" }}
            />
          )} */}

          <button type="submit">REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
