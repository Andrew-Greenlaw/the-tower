import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {

  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest('Invalid ticket id')
    }
    const event = await eventsService.getEventById(ticket.eventId)
    // @ts-ignore
    const theEventOwner = userId == event.creatorId.toString()
    // @ts-ignore
    const theTicketHolder = ticket.accountId.toString() == userId
    if (!theTicketHolder && !theEventOwner) {
      throw new Forbidden('You cannot remove other peoples tickets just yours')
    }
    await ticket.remove()
    // @ts-ignore
    event.capacity++
    await event.save()
  }
  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    if (!tickets) {
      throw new BadRequest('Invalid or bad account Id')
    }
    return tickets
  }
  async getEventTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture').populate('event')
    if (!tickets) {
      throw new BadRequest('Invalid or Bad event Id')
    }
    return tickets
  }

  async createTicket(eventId, accountId) {
    let event = await eventsService.getEventById(eventId)

    if (event.isCanceled) {
      throw new BadRequest('The Event has been canceled')
    }
    if (event.capacity === 0) {
      throw new BadRequest('There is not any more availible tickets for this event')
    }
    const hasTicket = await this.getTicketForEvent(eventId, accountId)
    if (hasTicket) {
      return hasTicket
    }
    const ticket = await dbContext.Tickets.create({ eventId, accountId })
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')

    // @ts-ignore
    event.capacity -= 1
    await event.save()
    // find the event that i am creating a ticket for...think about where you might have access to the event within this function
    return ticket
  }
  async getTicketForEvent(eventId, accountId) {
    const ticket = await dbContext.Tickets.findOne({ eventId, accountId })
      .populate('profile', 'name picture')
      .populate('event')
    return ticket
  }
}
export const ticketsService = new TicketsService()