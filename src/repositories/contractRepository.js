import Repository from "./Repository";

const resource = "/aiacontract";

export default {
    GetAll(pagesize, pageindex, JWT_TOKEN, keyword = '', employerId = 0, month = 0, year = 0) {
        return Repository.get(`${resource}?pagesize=${pagesize}&pageindex=${pageindex}&employerid=${employerId}&month=${month}&year=${year}&keyword=${keyword}`, {
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