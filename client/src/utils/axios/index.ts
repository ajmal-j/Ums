import axios from "axios";
import { server } from "../../server";

export const authApi=axios.create({
    baseURL:server+'/auth',
})