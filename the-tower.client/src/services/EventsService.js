import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Event } from '../models/Event.js'

class EventsService {
  async getEvents(type = '') {

    let res
    if (type) {
      res = await api.get('/api/events', {
        params: {
          type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    AppState.events = res.data.map(e => new Event(e))
    console.log(res.data)
  }

}
export const eventsService = new EventsService()