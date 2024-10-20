import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/app/mono/clients/", data);
}

export default {create};