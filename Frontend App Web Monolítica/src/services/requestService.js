import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/requests/");
}

const getId = id => {
    return httpClient.get(`/requests/${id}`);
}

const getRut = rut => {
    return httpClient.get(`/requests/rut/${rut}`);
}

const create = data => {
    return httpClient.post("/requests/", data);
}

const update = (id, data) => {
    return httpClient.put(`/requests/${id}`, data);
}

export default { getAll, getId, getRut, create, update};