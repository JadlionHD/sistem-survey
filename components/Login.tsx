import { Form } from "react-bootstrap";
import style from "../styles/Login.module.css";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import Router from "next/router";

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
      console.log(res);
      if (res?.status === 200) Router.replace("/dashboard");
      else Router.replace("/api/auth/error");
    });
  };

  return (
    <>
      <div className={style.login}>
        <h2>Login</h2>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="mb-2">
            <Form.Control onChange={({ target }) => setUser({ ...userInfo, username: target.value })} type="text" placeholder="Enter a username" name="username" required></Form.Control>
          </div>
          <div className="mb-2">
            <Form.Control onChange={({ target }) => setUser({ ...userInfo, password: target.value })} type="password" placeholder="Enter a password" name="password" required></Form.Control>
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
    </>
  );
}
