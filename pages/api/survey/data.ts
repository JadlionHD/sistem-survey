// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { query } from "../../../utils/db";
import { authOptions } from "../auth/[...nextauth]";

export interface SurveyType {
  survey_id?: number;
  wali_kelas?: string;
  kelas?: string;
  jadwal: boolean | number;
  struktur_kelas: boolean | number;
  inventaris: boolean | number;
  buku_daftar_kelas: boolean | number;
  jurnal_guru: boolean | number;
  buku_penerimaan_raport: boolean | number;
  leger: boolean | number;
  denah_kelas: boolean | number;
  tata_tertib_sekolah: boolean | number;
  buku_laporan: boolean | number;
  program_kerja: boolean | number;
}

export interface DataSurvey {
  survey_id?: number;
  wali_kelas?: string;
  kelas?: string;
  survey: {
    jadwal: boolean | number;
    struktur_kelas: boolean | number;
    inventaris: boolean | number;
    buku_daftar_kelas: boolean | number;
    jurnal_guru: boolean | number;
    buku_penerimaan_raport: boolean | number;
    leger: boolean | number;
    denah_kelas: boolean | number;
    tata_tertib_sekolah: boolean | number;
    buku_laporan: boolean | number;
    program_kerja: boolean | number;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataSurvey | DataSurvey[] | { message: string; error: number }>) {
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (session?.user.sebagai) {
    case "1":
    case "3": {
      let dataSurvey = (await query(
        "SELECT survey_kelas.id as survey_id, user.nama_lengkap as wali_kelas, kelas.kelas, survey_kelas.jadwal, survey_kelas.struktur_kelas, survey_kelas.inventaris, survey_kelas.buku_daftar_kelas, survey_kelas.jurnal_guru, survey_kelas.buku_penerimaan_raport, survey_kelas.leger, survey_kelas.denah_kelas, survey_kelas.tata_tertib_sekolah, survey_kelas.buku_laporan, survey_kelas.program_kerja FROM survey_kelas, kelas, user WHERE survey_kelas.kelas_id=kelas.id AND kelas.wali_kelas_id=user.id"
      )) as SurveyType[];

      if (req.query.q === "getAllData") return res.status(200).json(processData(dataSurvey));
      else if (req.query.q === "getSpecificData" && req.query.search) {
        let data = (await query(
          "SELECT survey_kelas.id as survey_id, user.nama_lengkap as wali_kelas, kelas.kelas, survey_kelas.jadwal, survey_kelas.struktur_kelas, survey_kelas.inventaris, survey_kelas.buku_daftar_kelas, survey_kelas.jurnal_guru, survey_kelas.buku_penerimaan_raport, survey_kelas.leger, survey_kelas.denah_kelas, survey_kelas.tata_tertib_sekolah, survey_kelas.buku_laporan, survey_kelas.program_kerja FROM survey_kelas, kelas, user WHERE survey_kelas.kelas_id=kelas.id AND kelas.wali_kelas_id=user.id AND kelas.kelas LIKE ?",
          [`%${req.query.search}%`]
        )) as SurveyType[];

        if (data === null) {
          return res.status(400).json({ message: "Not found", error: 400 });
        }
        return res.status(200).json(processData(data));
      }
      return res.status(200).json(processData(dataSurvey));
      break;
    }
    default: {
      res.status(401).json({ message: "Not allowed", error: 401 });
      break;
    }
  }
}

function processData(data: SurveyType[]) {
  let result = [] as DataSurvey[];
  data.forEach((v) => {
    result.push({
      survey_id: v.survey_id,
      wali_kelas: v.wali_kelas,
      kelas: v.kelas,
      survey: {
        jadwal: v.jadwal,
        struktur_kelas: v.struktur_kelas,
        inventaris: v.inventaris,
        buku_daftar_kelas: v.buku_daftar_kelas,
        jurnal_guru: v.jurnal_guru,
        buku_penerimaan_raport: v.buku_daftar_kelas,
        leger: v.leger,
        denah_kelas: v.denah_kelas,
        tata_tertib_sekolah: v.tata_tertib_sekolah,
        buku_laporan: v.buku_laporan,
        program_kerja: v.program_kerja
      }
    });
  });
  return result;
}
