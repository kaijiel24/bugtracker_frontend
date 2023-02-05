import { authAxios } from "../api/authApi";

export default class UsersService {
    async getUserSuggestions() {
        return authAxios.get('api/userSuggestions')
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async getUser(username) {
        return authAxios.get('api/admin/user/' + username)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }
    async getUsers() {
        return authAxios.get('api/admin/users')
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }
    async addUser(data) {
        return authAxios.post('api/admin/user', data)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }
    async updateUser(data) {
        return authAxios.put('api/admin/user', data)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }
    async deleteUser(username) {
        return authAxios.delete('api/admin/user' + username, data)
            .catch(err => Promise.reject(err))
    }
};
