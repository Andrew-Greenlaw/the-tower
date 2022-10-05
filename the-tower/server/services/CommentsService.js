import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
  async getCommentsbyEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }
  async createComment(commentData) {
    const event = await eventsService.getEventById(commentData.eventId)
    if (event.isCanceled) {
      throw new BadRequest('this event has been Canceled.... You can no longer add comments')
    }
    // const hasTicket = await dbContext.Tickets.findOne({
    //   eventId: commentData.eventId,
    //   accountId: commentData.creatorId
    // }).lean()
    // TODO you need to say if they have a ticket here populate the ticket to the comment this is stretch goal i think
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }
}
export const commentsService = new CommentsService()