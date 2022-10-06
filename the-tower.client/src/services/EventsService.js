import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from '../models/Event.js'
import { router } from "../router.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"

class EventsService {
  async getEvents(type = '') {
    let res
    if (type) {
      res = await api.get('/api/events', {
        params: {
          type: type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    AppState.events = res.data.map(e => new TowerEvent(e))
    // console.log(res.data)
  }
  async getEventById(id) {
    const res = await api.get(`/api/events/${id}`)
    AppState.activeEvent = new TowerEvent(res.data)
    logger.log('appstate active', AppState.activeEvent)
  }
  async createEvent(eventData) {
    const res = await api.post(`/api/events`, eventData)
    AppState.events.unshift(new TowerEvent(res.data))
    AppState.activeEvent = new TowerEvent(res.data)
    return res.data
    // const event = new Event(res.data)
    // AppState.events = [...AppState.events, event]

  }
  async canceleEvent(id) {
    await api.delete(`/api/events/${id}`)
    AppState.events = AppState.events.filter(e => e.id != id)
    AppState.activeEvent = null
    router.push({ name: 'Home' })
  }
  async getTickets(id) {
    const res = await api.get(`/api/events/${id}/tickets`)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }

}
export const eventsService = new EventsService()