import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { ACCESS_TOKEN, getStore } from "../../util/config";
import { useDispatch, useSelector } from "react-redux";
import { getProfileApi, loginApi } from "../../redux/reducers/userReducer";
import { history } from "../../index";

const UpDateProfile = () => {
  const [gender, setGender] = useState(true);
  const { userProfile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const upDateProfile = async (data1) => {
    console.log(data1);
    console.log(getStore(ACCESS_TOKEN));

    const result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/updateProfile",
      method: "POST",
      headers: {
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
      data: data1,
    });
    console.log(result.data.content);

    const actionGetProfile = getProfileApi();
    dispatch(actionGetProfile);
    console.log(userProfile);
  };

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email cannot be blank!")
        .email("Email is invalid!"),
      password: yup.string().required("Password cannot be blank!"),
    }),
    onSubmit: (values) => {
      console.log(values);
      let data = { ...values };
      const loginCheck = {
        email: data.email,
        password: data.password,
      };
      if (data.gender === "true") {
        data.gender = true;
      } else {
        data.gender = false;
      }
      //    callApiLogin để check pass
      const loginApi = (loginCheck) => {
        let login = axios({
          url: "https://shop.cyberlearn.vn/api/Users/signin",
          method: "post",
          data: loginCheck,
        }).then((res) => {
          upDateProfile(data);

          alert("Cập nhật thông tin thành công");
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000).catch((err) => {
          alert("Cập nhật thông tin thất bại");
        });
      };
      loginApi(loginCheck);
      // upDateProfile(data)
    },
  });
  const handleChangeGender = (e) => {
    let genderChoose = e.target.value;
    if (genderChoose === "male") {
      setGender(true);
    }
    setGender(false);
  };
  return (
    <div>
      <div
        className="modal fade"
        id="modalId"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-custom modal-dialog"
          role="document"
          style={{ maxWidth: "800px" }}
        >
          <form className="modal-content" onSubmit={form.handleSubmit}>
            <div className="modal-header">
              <h2 className="modal-title" id="modalTitleId">
                <b>
                Cập nhật thông tin
                  </b>
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  //    value={userProfile?.email}
                  //    disabled={true}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.email && (
                  <p className="text-danger">{form.errors.email}</p>
                )}
              </div>
              <div className="form-group">
                <p>Password</p>
                <input
                placeholder="Enter your password"
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.password && (
                  <p className="text-danger">{form.errors.password}</p>
                )}
              </div>
              <div className="form-group">
                <p>Name</p>
                <input
                placeholder="Enter your name"
                  type="name"
                  name="name"
                  className="form-control"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </div>
              <div className="form-group">
                <p className="phone">Phone</p>
                <input
                placeholder="Phone number"
        
                  type="text"
                  name="phone"
                  className="form-control"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </div>
              <div class="gender">
                <div className="gender-title">
                  <p>Gender:</p>
                </div>
                <div className="gender-choose d-flex">
                  <div class="male" onChange={handleChangeGender}>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value={true}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <label for="male">Male</label>

                    <input
                    className='female-gender'
                      type="radio"
                      name="gender"
                      id="female"
                      value={false}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <label for="female">Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpDateProfile;
