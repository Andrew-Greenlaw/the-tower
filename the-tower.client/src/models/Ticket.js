import { TowerEvent } from "./Event.js"

export class Ticket {
  constructor(data) {
    this.id = data.id
    this.event = new TowerEvent(data.event)
    this.profile = data.profile
    this.accountId = data.accountId
  }
}