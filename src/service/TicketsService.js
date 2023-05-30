import { authAxios } from "@/api/authApi"

export default class TicketsService {
    async getAssignedTickets() {
        return authAxios.get('api/assignedtickets')
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async getMyTickets() {
        return authAxios.get('api/mytickets')
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async getAllTickets() {
        return authAxios.get('api/alltickets')
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async getTicket(id) {
        return authAxios.get(`api/ticket/${id}`)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async addTicket(data) {
        return authAxios.post('api/ticket', data)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async updateTicket(data) {
        return authAxios.put('api/ticket', data)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async addComment(data) {
        return authAxios.post('api/comment', data)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async updateComment(data) {
        return authAxios.put('api/comment', data)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }

    async deleteComment(id) {
        return authAxios.delete(`api/comment/${id}`)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }
}
