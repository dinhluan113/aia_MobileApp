import Repository from "./Repository";

const resource = "/aiausers";
export default {
    get(id, token) {
        return Repository.get(`${resource}/${id}`, {
            'headers': {
                Authorization: 'Bearer ' + token
            },
            crossDomain: true
        });
    },
    validate(token) {
        return Repository.get(`${resource}/validate?token=${token}`, {
            crossDomain: true
        });
    },
    checkExist(token) {
        return Repository.get(`${resource}/login?token=${token}`, {
            crossDomain: true
        })
    },
    checkLogin(dto) {
        return Repository.post(`${resource}`, dto, {
            'headers': {
                'Content-Type': 'application/json'
            },
        });
    },
};