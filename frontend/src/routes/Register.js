import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";

const postStoreURL = "http://localhost:8080/store/register";
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
        return res.data;
      });
      //if (data.errorCode !== 10) throw data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};

export default Register;
