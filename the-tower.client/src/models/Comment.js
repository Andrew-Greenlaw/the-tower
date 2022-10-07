export class Comment {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.creator = data.creator
    this.accountId = data.accountId
    this.eventId = data.eventId
  }
}