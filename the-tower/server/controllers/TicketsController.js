import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .get('', this.getMyTicket)
      .get('', this.getEventTicket)
      .delete('/:ticketId', this.removeTicket)
  }
  //ANCHOR this is where you left off trying to make ticket
  async createTicket(req, res, next) {
    try {
      const ticket = await ticketsService.createTicket(req.body.eventId, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async getEventTicket(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next(error)
    }
    throw new Error("Method not implemented.");
  }
  async getMyTicket(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next(error)
    }
    throw new Error("Method not implemented.");
  }
  async removeTicket(req, res, next) {
    try {
      const ticket = ticketsService.removeTicket(req.params.ticketId, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}