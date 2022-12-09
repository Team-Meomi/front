import axios from "axios";
import { BASEURL } from "./BaseUrl";

const CustomAxios = axios.create({
  baseURL: BASEURL,
  headers : {
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    "Access-Control-Allow-Origin": "*",
    "withCredentials" : true
  }
});

export default CustomAxios
