import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/app/mono/requests/");
}

const getId = id => {
    return httpClient.get(`/app/mono/requests/${id}`);
}

const getRut = rut => {
    return httpClient.get(`/app/mono/requests/rut/${rut}`);
}

const create = data => {
    return httpClient.post("/app/mono/requests/", data);
}

const update = (id, data) => {
    return httpClient.put(`/app/mono/requests/${id}`, data);
}

export default { getAll, getId, getRut, create, update};