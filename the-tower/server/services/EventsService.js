import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class EventsService {
  async getAllEvents(query) {
    const events = await dbContext.Events.find({ isCanceled: false, ...query }).populate('creator', 'name picture')
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
}
export const eventsService = new EventsService()