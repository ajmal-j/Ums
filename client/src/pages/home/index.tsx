import { useEffect } from "react";
import { axiosWithToken } from "../../utils/axios";

export default function Home() {
  useEffect(() => {
    axiosWithToken
      .get("/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div className='text-black'>Home</div>;
}
