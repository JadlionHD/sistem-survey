import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { SurveyType } from "../pages/api/survey/data";

export interface CheckListType {
  no: string | number;
  idKelas: number;
  kelas: {
    nama: string;
    wali_kelas: string;
  };
  survey: SurveyType;
}

export default function CheckList({ no, kelas, survey, idKelas }: CheckListType) {
  const surveyList = ["jadwal", "struktur_kelas", "inventaris", "buku_daftar_kelas", "jurnal_guru", "buku_penerimaan_raport", "leger", "denah_kelas", "tata_tertib_sekolah", "buku_laporan", "program_kerja"];
  const [aksi, setAksi] = useState({ editing: false });
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault();
    const kelasId = document.getElementById(`survey_id_${no}`) as HTMLInputElement;
    let dataReq = {
      survey_id: parseInt(kelasId.value),
      survey: {}
    };
    surveyList.forEach((v) => {
      const ceklist = document.getElementById(`${v}_check_${no}`) as HTMLInputElement;

      // @ts-ignore
      dataReq.survey[ceklist.name] = ceklist.checked;
    });
    axios
      .put("/api/survey/setdata", dataReq)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setAksi({ editing: false });
        }
      })
      .catch((err) => {
        setLoading(false);
        setAksi({ editing: false });
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    surveyList.map((v) => {
      const ceklist = document.getElementById(`${v}_check_${no}`) as HTMLInputElement;
      if (!ceklist) return;
      ceklist.disabled = !ceklist.disabled;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aksi.editing]);

  return (
    <tr>
      <td>{no}</td>
      <td>{kelas.nama}</td>
      <td>{kelas.wali_kelas}</td>
      {surveyList.map((v, i) => {
        return (
          <td key={`${i}`}>
            {/* @ts-ignore */}
            <Form.Check id={`${v}_check_${no}`} name={v} type="checkbox" disabled defaultChecked={survey[surveyList[i]] ? true : false} />
          </td>
        );
      })}
      <td className="d-flex">
        <Form.Control type="hidden" value={idKelas} id={`survey_id_${no}`} name="survey_id"></Form.Control>
        {!aksi.editing && !isLoading && (
          <>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => {
                setAksi({ editing: true });
              }}
            >
              Edit
            </Button>
            <Button variant="danger">Delete</Button>
          </>
        )}
        {aksi.editing && (
          <>
            <Button
              variant="success"
              className="m-auto d-block"
              onClick={(ev) => {
                setAksi({ editing: false });
                setLoading(true);
                handleSubmit(ev);
              }}
            >
              Save
            </Button>
          </>
        )}
        {isLoading && (
          <>
            <Button variant="success" className="m-auto d-block" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </Button>
          </>
        )}
      </td>
    </tr>
  );
}
