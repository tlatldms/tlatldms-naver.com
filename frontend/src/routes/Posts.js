import React, { useEffect } from "react";
import Axios from "axios";
import Menu from "./Menu";
import { Container, Row, Col, Visible } from "react-grid-system";

import { Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const getMenusUrl = "http://localhost:8080/menus/teststore";
const postMenuUrl = "http://localhost:8080/menu/upload";
const Post = ({ match }) => {
  return <h2>{match.params.title}</h2>;
};

const UploadMenu = () => {
  const [menuImage, changeMenuImage] = React.useState("");
  const [uploadCompleted, handleUploadFlag] = React.useState(false);
  const [isLoading, handleLoading] = React.useState(false);
  const { register, handleSubmit, watch } = useForm();
  const [Menus, setMenus] = React.useState();

  const getMenus = async () => {
    const URL = "http://localhost:8080/menus/teststore";
    try {
      const data = await Axios.get(URL).then(res => res.data);
      setMenus(data.menus);
      console.log(data.menus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);
  const menuImageChange = e => {
    changeMenuImage(e.target.files[0]);
  };

  const fileUpload = async () => {
    handleLoading(true);
    const formData = new FormData();
    formData.append("file", menuImage);
    formData.append("storename", "teststore");
    formData.append("menuname", watch("menuname"));
    formData.append("price", watch("price"));
    formData.append("desc", watch("videoDesc"));
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    try {
      const data = await Axios.post(postMenuUrl, formData, config).then(res => {
        return res.data;
      });
      //if (data.errorCode !== 10) throw data;
      handleUploadFlag(true);
      handleLoading(false);
      getMenus();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div className="menu-upload-box">
        <label for="vf">메뉴 사진 업로드 </label>
        <input
          id="pf"
          type="file"
          onChange={menuImageChange}
          name="menuImage"
        />

        <br />

        <input id="form-desc" ref={register} name="desc" placeholder="설명" />
        <input id="form-price" ref={register} name="price" placeholder="가격" />
        <input
          id="form-menuname"
          ref={register}
          name="menuname"
          placeholder="메뉴 이름"
        />
        <br />
        <button
          id="form-btn"
          className="sendButton"
          type="submit"
          onClick={handleSubmit(fileUpload)}
        >
          Upload
        </button>
        <div>{isLoading && "업로드중입니다..."}</div>
        <div>{uploadCompleted && "업로드가 완료되었습니다."}</div>
      </div>
      <br />
      <Row>
        {Menus
          ? Array.from(Menus).map(x => (
              <Col sm={4}>
                <Menu menu={x} />
              </Col>
            ))
          : null}
      </Row>
    </React.Fragment>
  );
};

export default UploadMenu;
