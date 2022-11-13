// import styles from '../styles/Home.module.css'
import { useState } from "react";
import { Button } from "react-bootstrap";
import HeadElement from "../components/HeadElement";
import Login from "../components/Login";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <HeadElement titleName="Login"></HeadElement>
      <div className="main">
        <Login></Login>
        {/* <Button onClick={() => setCount((count) => count + 1)}>Hello guys {count}</Button> */}
      </div>
    </>
  );
}
