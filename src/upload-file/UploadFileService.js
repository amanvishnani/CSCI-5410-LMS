import Axios from "axios";
import { LIST_FILES } from "../BaseUrls";

export async function findAll() {
    let result = await Axios.get(`${LIST_FILES}`)
    return result.data;
}