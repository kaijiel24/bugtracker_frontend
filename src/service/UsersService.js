const contextPath = import.meta.env.BASE_URL;

export default class UsersService {
    async getUsersExcept(id) {
        return fetch(contextPath + 'demo/data/users.json')
            .then((res) => res.json())
            .then((d) => d.data)
            .then((d) => {
                var i = d.length;
                while (i--) {
                    if (d[i].id == id) { 
                        d.splice(i, 1);
                    } 
                }
                return d;
            });
    }
    async getUsers() {
        return fetch(contextPath + 'demo/data/users.json')
            .then((res) => res.json())
            .then((d) => d.data)
    }
};
