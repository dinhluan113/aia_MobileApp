import Repository from "./Repository";

const resource = "/commit";

export default {
    ChangeCommitByMonth(commit, month, year, token) {
        return Repository.post(`${resource}`, {
            CommitValue: commit,
            Month: month,
            Year: year
        }, {
            headers: {
                'method': 'POST',
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Authorization: 'Bearer ' + token
            },
            crossDomain: true
        });
    },
    GetCommitByMonth(month, year, token) {
        return Repository.get(`${resource}?month=${month}&year=${year}`, {
            'headers': {
                Authorization: 'Bearer ' + token
            },
            crossDomain: true
        });
    }
};