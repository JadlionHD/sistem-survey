// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query } from "../../../utils/db";
import { SurveyType } from "./data";

export interface SetDataType {
  survey_id: number;
  survey: {
    jadwal: boolean;
    struktur_kelas: boolean;
    inventaris: boolean;
    buku_daftar_kelas: boolean;
    jurnal_guru: boolean;
    buku_penerimaan_raport: boolean;
    leger: boolean;
    denah_kelas: boolean;
    tata_tertib_sekolah: boolean;
    buku_laporan: boolean;
    program_kerja: boolean;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SetDataType | SetDataType[] | { message: string; error: number }>) {
  const session = await getSession({ req });

  if (req.method !== "PUT" && !req.body && !req.body.survey_id) return res.status(400).json({ message: "No content", error: 400 });

  switch (session?.user.sebagai) {
    case "1":
    case "3": {
      let survey: SurveyType = req.body.survey;
      let result = (await query("UPDATE `survey_kelas` SET `jadwal`=?,`struktur_kelas`=?,`inventaris`=?,`buku_daftar_kelas`=?,`jurnal_guru`=?,`buku_penerimaan_raport`=?,`leger`=?,`denah_kelas`=?,`tata_tertib_sekolah`=?,`buku_laporan`=?,`program_kerja`=? WHERE survey_kelas.id=?", [
        survey.jadwal,
        survey.struktur_kelas,
        survey.inventaris,
        survey.buku_daftar_kelas,
        survey.jurnal_guru,
        survey.buku_penerimaan_raport,
        survey.leger,
        survey.denah_kelas,
        survey.tata_tertib_sekolah,
        survey.buku_laporan,
        survey.program_kerja,
        req.body.survey_id
      ])) as { changedRows: number };
      if (result.changedRows === 1) res.status(200).json({ message: "OK", error: 200 });
      else res.status(400).json({ message: "Failed, it might be the rows are not changed", error: 400 });
      break;
    }
    default: {
      res.status(401).json({ message: "Not Allowed", error: 401 });
      break;
    }
  }
}
