import Head from "next/head";

export interface HeadType {
  titleName: string;
}

export default function HeadElement({ titleName }: HeadType) {
  return (
    <Head>
      <title>{titleName}</title>
      <link rel="icon" href="/icon.png" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"></link>
      {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous"></link> */}
    </Head>
  );
}
