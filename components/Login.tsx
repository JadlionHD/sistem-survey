import { Form, InputGroup } from "react-bootstrap";
import style from "../styles/Login.module.css";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import Router from "next/router";
import Image from "next/image";

export interface LoginUser {
  username?: string;
  password?: string;
  sebagai?: string;
}

export default function Login() {
  const [userInfo, setUser] = useState<LoginUser>({ username: "", password: "", sebagai: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      sebagai: userInfo.sebagai,
      redirect: false
    }).then((res) => {
      if (res?.status === 200) Router.replace("/dashboard");
      else Router.replace("/api/auth/error");
    });
  };

  return (
    <>
      <div className={style.login}>
        <div className="d-flex justify-content-center">
          <Image className={style.gambarImage} style={{ marginTop: "60px" }} width="200" height="200" src="/logo.png" alt="logo.png" />
          <div className="main-login" style={{ marginTop: "60px" }}>
            <h2>Login</h2>
            <form action="#" method="POST" style={{ width: "300px" }} onSubmit={handleSubmit}>
              <div className="mb-2">
                <InputGroup>
                  <InputGroup.Text id="username-label">
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Control onChange={({ target }) => setUser({ ...userInfo, username: target.value })} type="text" placeholder="Enter a username" name="username" id="username" required></Form.Control>
                </InputGroup>
              </div>
              <div className="mb-2">
                <InputGroup>
                  <InputGroup.Text id="password-label">
                    <i className="bi bi-key-fill"></i>
                  </InputGroup.Text>
                  <Form.Control onChange={({ target }) => setUser({ ...userInfo, password: target.value })} type="password" placeholder="Enter a password" name="password" id="password" required></Form.Control>
                </InputGroup>
              </div>
              <div className="mb-2">
                <Form.Select required onChange={({ target }) => setUser({ ...userInfo, sebagai: target.value })}>
                  <option value="">Sebagai</option>
                  <option value="4">Wali Kelas</option>
                  <option value="3">Wakil Kepala Sekolah</option>
                  <option value="2">Kepala Sekolah</option>
                  <option value="1">Administrator</option>
                </Form.Select>
              </div>
              <Form.Control type="submit" className="btn btn-primary"></Form.Control>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
