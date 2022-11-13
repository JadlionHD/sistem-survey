# sistem-survey (WIP)

> Sistem aplikasi Survey Kelengkapan Perangkat Kelas

## Getting Started

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

## Enviroment file

Untuk Enviroment file (.env) nya maka harus diisi seperti berikut dibawah ini:

```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=sistem_survey
MYSQL_USER=root
MYSQL_PASSWORD=PASSWORDMYSQL
ENCRYPT_SECRET=SUPERSECRET # Default encrypt secretnya
```

## Import database

Untuk file sql buat import data-data mysqlnya ada [disini](https://github.com/JadlionHD/sistem-survey/tree/main/assets).

## Todo

- [x] Wakil Kepala Sekolah & Administraotor bisa menambah, mengedit, menghapus, dan melihat seluruh survey.
- [ ] Kepala Sekolah bisa melihat seluruh survey.
- [ ] Wali Kelas bisa melihat survey kelasnya masing-masing.
- [ ] Administrator bisa menambah, menghapus, mengedit, melihat user.
