import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/comments', this.getEventCommentsByEventId)
      .get('/:id/tickets', this.getEventTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.archiveEvent)
  }
  async getEventCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsbyEventId(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getEventTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTicketsByEventId(req.params.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async archiveEvent(req, res, next) {
    try {
      const event = await eventsService.archiveEvent(req.params.id, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      req.body.id = req.params.id
      const event = await eventsService.editEvent(req.body, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }
}