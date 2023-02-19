import { authAxios } from "@/api/authApi"

export default class ProjectsService {
    async getAllProjects() {
        return authAxios.get('api/allprojects')
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async getMyProjects() {
        return authAxios.get('api/myprojects')
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async getProject(id) {
        return authAxios.get(`api/project/${id}`)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async addProject(data) {
        return authAxios.put('api/project', data)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }
}
