import Repository from "./Repository";

const resource = "/aiacontract";

export default {
    GetAll(pagesize, pageindex, employerId = 0, month = 0, year = 0) {
        return Repository.get(`${resource}?pagesize=${pagesize}&pageindex=${pageindex}&employerid=${employerId}&month=${month}&year=${year}`, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwtv2')
            },
            crossDomain: true
        });
    },
    GetById(id) {
        return Repository.get(`${resource}/${id}`, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwtv2')
            },
            crossDomain: true
        });
    },
    Add(obj) {
        return Repository.post(`${resource}`, obj, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwtv2')
            },
            crossDomain: true
        });
    },
    Update(obj) {
        return Repository.put(`${resource}`, obj, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwtv2')
            },
            crossDomain: true
        });
    },
    Delete(id) {
        return Repository.delete(`${resource}?id=${id}`, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwtv2')
            },
            crossDomain: true
        });
    }
};