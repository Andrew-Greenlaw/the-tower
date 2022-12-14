import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { ticketsService } from "./TicketsService.js"

class EventsService {
  async getAllEvents(query) {
    const events = await dbContext.Events.find({ ...query }).populate('creator', 'name picture')
    return events
  }
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }
  async getEventById(id) {
    const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid or Bad Event Id')
    }
    return event
  }
  async editEvent(eventData, userInfo) {
    const event = await this.getEventById(eventData.id)
    // @ts-ignore
    if (userInfo.id != event.creatorId.toString()) {
      throw new Forbidden('Go away this is not your event to edit')
    }
    if (event.isCanceled) { throw new BadRequest('this event is already canceled') }
    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    await event.save()
    return event
  }
  async archiveEvent(id, userInfo) {
    const event = await this.getEventById(id)
    // @ts-ignore
    if (event.creatorId.toString() != userInfo.id) {
      throw new Forbidden('you did not create this event go away!')
    }
    // const tickets = await ticketsService.getEventTicketsByEventId(id)
    // if (!tickets.length) {
    //   event.remove()
    //   await event.save()
    //   return event
    // }
    event.isCanceled = true
    await event.save()
    return event
  }
}
export const eventsService = new EventsService()