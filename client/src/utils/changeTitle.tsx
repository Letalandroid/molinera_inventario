import { Helmet } from "react-helmet-async";

export default function changeTitle(page: string) {
  return (
    <>
      <Helmet>
        <title>{page} | Inventario Hellen Mabel</title>
      </Helmet>
    </>
  );
}
