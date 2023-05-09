import React from "react";
import "../../assets/css/Register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerApi } from "../../redux/reducers/userReducer";

const Register = () => {
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      gender: true,
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email cannot be blank!")
        .email("email is invalid!"),
      password: yup.string().required("password cannot be blank!"),
      name: yup.string().required("name cannot be blank!"),
      phone: yup.string().required("phone cannot be blank!"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      delete values.passwordConfirm;
      console.log(values);
      const action = registerApi(values);
      dispatch(action);
    },
  });
  return (
    <div>
      <div className="container title">
        <h1>Register</h1>
      </div>
      <div className="pt-5">
        <form className="container" onSubmit={form.handleSubmit}>
          <div className="row form-group">
            <div className="col-6">
              <div class="normal-input">
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.email && (
                  <p className="text-danger">{form.errors.email}</p>
                )}
              </div>
            </div>
            <div className="col-6">
              <div class="normal-input">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.name && (
                  <p className="text-danger">{form.errors.name}</p>
                )}
              </div>
            </div>
            <div className="col-6">
              <div class="normal-input">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.password && (
                  <p className="text-danger">{form.errors.password}</p>
                )}
              </div>
            </div>
            <div className="col-6">
              <div class="normal-input">
                <p>Phone</p>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.phone && (
                  <p className="text-danger">{form.errors.phone}</p>
                )}
              </div>
            </div>
            <div className="col-6">
              <div class="normal-input">
                <p>Password confirm</p>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Password confirm"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </div>
              {form.errors.passwordConfirm && (
                <p className="text-danger">{form.errors.passwordConfirm}</p>
              )}
            </div>
            <div className="col-6">
              <div class="gender row pt-5">
                <div className="col-2">
                  <p>Gender</p>
                </div>
                <div class="male col-2 pt-md-3">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    checked="checked"
                    value="true"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <p>Male</p>
                </div>
                <div class="female col-2 pt-md-3">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="false"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <p>Female</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 form-footer">
            <button type="submit" class="btn-submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
