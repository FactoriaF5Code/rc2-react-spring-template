const URL = "http://localhost:8080/members";
export class NameApi {
    getMembers() {
        return fetch(URL)
            .then(response => response.json())

    }

    addMember(member) {
        const headers = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(member)
        };
        return fetch(URL, headers)
            .then(response => response.json())

    }

    deleteMember(id) {
        const headers = {
            method: 'delete'
        }
        return fetch(URL + "/" + id, headers)
            .then(response => response.json())
    }

    editMember(id, member) {
        const headers = {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(member)
        }
        return fetch(URL + "/" + id, headers)
            .then(response => response.json())
    }
}