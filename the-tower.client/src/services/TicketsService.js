import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { api } from "./AxiosService.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
  async createTicket(eventData) {
    // const event = await AppState.events.find({ eventData })
    // event.capacity--
    const res = await api.post('/api/tickets', eventData)
    console.log(res.data)
    const ticket = new Ticket(res.data)
    AppState.tickets = [...AppState.tickets, ticket]
  }
  async removeTicket(id) {
    await api.delete(`/api/tickets/${id}`)
    AppState.tickets = AppState.tickets.filter(t => t.id != id)
  }
}
export const ticketsService = new TicketsService()