import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from '../models/Event.js'
import { router } from "../router.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { ticketsService } from "./TicketsService.js"

class EventsService {
  async getEvents(type = '') {
    AppState.events = []
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
    AppState.activeEvent = []
    const res = await api.get(`/api/events/${id}`)
    AppState.activeEvent = new TowerEvent(res.data)
    // logger.log('appstate active', AppState.activeEvent)
  }
  async createEvent(eventData) {
    const res = await api.post(`/api/events`, eventData)
    AppState.events.unshift(new TowerEvent(res.data))
    AppState.activeEvent = new TowerEvent(res.data)
    return res.data
    // const event = new Event(res.data)
    // AppState.events = [...AppState.events, event]

  }
  async cancelEvent(id) {
    await api.delete(`/api/events/${id}`)
    // console.log('is there any tickets?', AppState.tickets)
    // if (!AppState.tickets.length) {
    //   router.push({ name: 'Home' })
    //   return
    // }
    AppState.activeEvent.isCanceled = true
  }
  async getTickets(id) {
    // AppState.tickets = []
    const res = await api.get(`/api/events/${id}/tickets`)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }
  async getComments(id) {
    // AppState.comments = []
    const res = await api.get(`/api/events/${id}/comments`)
    // logger.log(res.data)
    AppState.comments = res.data
  }
  async createComment(commentData) {
    const res = await api.post(`/api/comments`, commentData)
    AppState.comments.unshift(res.data)
    return res.data
  }
  async removeComment(id) {
    await api.delete(`/api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id != id)
  }
}
export const eventsService = new EventsService()