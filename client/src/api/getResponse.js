import axios from "axios";
import config from "../config/config.json"

export default async function getResponse(req) {
    try {
        let resp = await axios.post(`${config.apiURL}/api/bot/get-response`, req);
        return resp.data;
    } catch (err) {
        return false
    }
}
