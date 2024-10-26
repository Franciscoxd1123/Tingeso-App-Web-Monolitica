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

const simulation = (data) => {
    return httpClient.post("/requests/simulation", data);
}

const evaluation = id => {
    return httpClient.get(`/requests/evaluation/${id}`);
}

const totalCost = id => {
    return httpClient.get(`/requests/totalCost/${id}`);
}

export default { getAll, getId, getRut, create, update, simulation, evaluation, totalCost };