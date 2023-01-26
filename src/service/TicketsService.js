const contextPath = import.meta.env.BASE_URL;

export default class TicketsService {
    async getTickets() {
        return fetch(contextPath + 'demo/data/tickets.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    async getTicket(id) {
        return fetch(contextPath + 'demo/data/ticket' + id + '.json')
            .then((res) => res.json())
    }
}
