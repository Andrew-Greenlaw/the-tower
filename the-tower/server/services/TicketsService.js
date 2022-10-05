import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
  removeTicket(ticketId, id) {
    throw new Error("Method not implemented.")
  }
  async
  async createTicket(eventId, accountId) {
    const event = await eventsService.getEventById(eventId)
    if (event.isCanceled) {
      throw new BadRequest('The Event has been canceled')
    }
    const hasTicket = await this.getTicketForEvent(eventId, accountId)
    if (hasTicket) {
      return hasTicket
    }
    const ticket = await dbContext.Tickets.create({ eventId, accountId })
    await ticket.populate('account', 'name picture')
    return ticket
  }
  async getTicketForEvent(eventId, accountId) {
    const attendee = await dbContext.Tickets.findOne({ eventId, accountId })
      .populate('account', 'name picture')
      .populate('event', 'name coverImg')
    return attendee
  }
}
export const ticketsService = new TicketsService()