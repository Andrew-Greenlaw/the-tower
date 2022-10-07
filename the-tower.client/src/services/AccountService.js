import { AppState } from '../AppState'
import { Ticket } from '../models/Ticket.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getEventTickets() {
    const res = await api.get('/account/tickets')
    console.log(res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }
}

export const accountService = new AccountService()
