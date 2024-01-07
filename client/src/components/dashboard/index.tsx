import { useState } from "react";

export default function Dashboard() {
  const [data] = useState(() => {
    const data = localStorage.getItem("adminCredentials");
    if (!data) return null;
    return JSON.parse(data);
  });
  return <div>{data ? data.token : "lalala"}</div>;
}
