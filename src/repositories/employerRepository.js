import Repository from "./Repository";

const resource = "/aiaemployer";

export default {
    GetAll(pagesize, pageindex, JWT_TOKEN) {
        return Repository.get(`${resource}?pagesize=${pagesize}&pageindex=${pageindex}`, {
            'headers': {
                Authorization: 'Bearer ' + JWT_TOKEN
            },
            crossDomain: true
        });
    },
    GetById(id, JWT_TOKEN) {
        return Repository.get(`${resource}/${id}`, {
            'headers': {
                Authorization: 'Bearer ' + JWT_TOKEN
            },
            crossDomain: true
        });
    },
    Add(obj, JWT_TOKEN) {
        return Repository.post(`${resource}`, obj, {
            'headers': {
                Authorization: 'Bearer ' + JWT_TOKEN
            },
            crossDomain: true
        });
    },
    Update(obj, JWT_TOKEN) {
        return Repository.put(`${resource}`, obj, {
            'headers': {
                Authorization: 'Bearer ' + JWT_TOKEN
            },
            crossDomain: true
        });
    },
    Delete(id, JWT_TOKEN) {
        return Repository.delete(`${resource}?id=${id}`, {
            'headers': {
                Authorization: 'Bearer ' + JWT_TOKEN
            },
            crossDomain: true
        });
    }
};