export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Header } from "../../ui/afterview";
import { getAfterview } from "../../../lib/store";
import AdminClient from "./AdminClient";

export default async function Admin({ params }) {
  const record = await getAfterview(params.token);
  return (
    <>
      <Header />
      <AdminClient token={params.token} record={record} />
    </>
  );
}
