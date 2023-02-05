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

    async getTicket(id) {
        return authAxios.get(`api/ticket/${id}`)
            .then((d) => d)
            .catch(err => Promise.reject(err))
    }
}
