export class Ticket {
  constructor(data) {
    this.id = data.id
    this.event = data.event
    this.profile = data.profile
    this.accountId = data.accountId
  }
}