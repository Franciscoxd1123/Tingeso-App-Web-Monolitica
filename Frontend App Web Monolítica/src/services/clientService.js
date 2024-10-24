import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/clients/", data);
}

export default {create};