export class Event {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate).toDateString()
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAtthis
    this.creator = data.creator
  }
}