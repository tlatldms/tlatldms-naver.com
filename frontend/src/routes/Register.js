import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";

const postStoreURL = "http://localhost:8080/store/register";
const authRegisterURL = "http://localhost:8080/auth/register";
const Register = props => {
  const { register, handleSubmit, watch } = useForm();

  const registerStore = async () => {
    const BODY = {
      username: watch("username"),
      storename: watch("storename"),
      address: watch("address"),
      licenseNum: watch("licenseNum"),
      posName: watch("posName")
    };

    try {
      const data = await Axios.post(postStoreURL, BODY).then(res => {
        console.log(res.data);
        alert("가게 등록이 완료되었습니다.");
        return res.data;
      });
      //if (data.errorCode !== 10) throw data;
    } catch (error) {
      console.log(error);
    }
  };

  const registerAuth = async () => {
    const BODY = {
      username: watch("username"),
      password: watch("password"),
      email: watch("email"),
      phoneNumber: watch("phoneNumber"),
      hostFlag: 1
    };

    try {
      const data = await Axios.post(authRegisterURL, BODY).then(res => {
        console.log(res.data);
        alert("회원가입이 완료되었습니다.");
        return res.data;
      });
      //if (data.errorCode !== 10) throw data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="register-store">
        <input
          id="form-username"
          ref={register}
          name="username"
          placeholder="유저 이름"
        />
        <input
          id="form-password"
          type="password"
          ref={register}
          name="password"
          placeholder="비밀번호"
        />
        <input
          id="form-email"
          ref={register}
          name="email"
          placeholder="이메일"
        />

        <input
          id="form-phoneNumber"
          ref={register}
          name="phoneNumber"
          placeholder="휴대폰 번호"
        />
        <br />
        <button onClick={handleSubmit(registerAuth)}>회원가입</button>
      </div>
      <div className="register-store">
        <input
          id="form-username"
          ref={register}
          name="username"
          placeholder="유저 이름"
        />
        <input
          id="form-storeName"
          ref={register}
          name="storename"
          placeholder="가게 이름"
        />
        <input
          id="form-address"
          ref={register}
          name="address"
          placeholder="가게 주소"
        />
        <input
          id="form-licenseNum"
          ref={register}
          name="licenseNum"
          placeholder="라이센스"
        />
        <input
          id="form-posName"
          ref={register}
          name="posName"
          placeholder="메뉴 이름"
        />
        <br />
        <button onClick={handleSubmit(registerStore)}>가게 등록하기</button>
      </div>
    </React.Fragment>
  );
};

export default Register;
