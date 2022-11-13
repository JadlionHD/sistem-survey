import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button, Card, Table, Form } from "react-bootstrap";
import CheckList from "../components/CheckList";
import HeadElement from "../components/HeadElement";
import { DataSurvey } from "./api/survey/data";

export default function Dashboard() {
  const session = useSession();
  const [aksi, setAksi] = useState({ editing: false });
  const [data, setData] = useState<DataSurvey[]>();

  useEffect(() => {
    if (session.status !== "authenticated") return;
    axios.get("/api/survey/data?q=getAllData").then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, [session.status]);

  if (session.status === "unauthenticated") {
    Router.replace("/401");
  } else if (session.status === "loading") {
    return <>Loading...</>;
  } else if (session.status === "authenticated") {
    const namaTitle = `Dashboard - ${session.data?.user.name}`;
    const user = session.data.user;
    const role = ["Administrator", "Kepala Sekolah", "Wakil Kepala Sekolah", "Wali Kelas"];
    return (
      <>
        <HeadElement titleName={namaTitle}></HeadElement>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/dashboard">Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-danger"
                >
                  Logout
                </Nav.Link>
              </Nav>
              <Nav>
                <Navbar.Text>
                  {user.name} - {role[parseInt(user.sebagai) - 1]}
                </Navbar.Text>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Card bg="dark" className="mt-5">
            <Card.Header>Data Survey</Card.Header>
            <Card.Body>
              <div className="d-flex mb-3">
                <Form.Select style={{ width: "70px" }}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Form.Select>
                <Form className="ms-auto" style={{ width: "12.5rem" }}>
                  <Form.Control type="search" placeholder="Search"></Form.Control>
                </Form>
              </div>
              <Table responsive striped bordered hover variant="dark" className="text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Kelas</th>
                    <th>Wali Kelas</th>
                    <th>Jadwal</th>
                    <th>Struktur kelas</th>
                    <th>Inventaris</th>
                    <th>Daftar kelas</th>
                    <th>Jurnal guru</th>
                    <th>Penerimaan raport</th>
                    <th>Leger</th>
                    <th>Denah kelas</th>
                    <th>Tata tertib sekolah</th>
                    <th>Buku laporan</th>
                    <th>Program kerja</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((v, i) => {
                        return <CheckList key={i} no={i + 1} idKelas={v.survey_id!} kelas={{ wali_kelas: v.wali_kelas!, nama: v.kelas! }} survey={v.survey}></CheckList>;
                      })
                    : null}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}
