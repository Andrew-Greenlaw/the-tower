<template>
  <div class="col-12 p-0 img mb-4" :style="{backgroundImage: `url(${event.coverImg})`}">
    <div class="back p-3 pb-5 ">
      <!-- TODO make it so you can only see the delete if you are the owner -->
      <!-- TODO make the text shadow for all over the image text -->
      <div class="d-flex justify-content-end">
        <!-- TODO change this to a dropstart from bootstrap -->
        <div class="dropdown my-2 my-lg-0">
          <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="editDropdown">
            <button class="btn rounded text-light">...</button>
          </div>
          <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="editDropdown">
            <div class="list-group-item list-group-item-action hoverable text-dark" @click="cancelEvent()">
              <i class="mdi mdi-trash"></i>
              Cancel Event
            </div>
          </div>
        </div>
      </div>
      <div class="event-details d-flex">
        <div class="event-img">
          <img :src="event.coverImg" alt="Event Photo missing" class="img-fluid">
        </div>
        <div class="event-text px-4 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between">
              <div class="mb-4">
                <h3>{{event.name}}</h3>
                <h5>{{event.location}}</h5>
              </div>
              <div>
                <h4>{{event.startDate}}</h4>
                <h5>starts at this time</h5>
              </div>
            </div>
            <div>
              <p>{{event.description}}</p>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <p><span class="fs-4 text-primary">{{event.capacity}}</span> Spots Left</p>
            </div>
            <div>
              <!-- TODO make it so the capacity updates -->
              <button class="btn btn-warning" @click="createTicket()"
                v-if="!event.isCanceled && !hasTicket && event.capacity != 0">Attent <i
                  class="mdi mdi-human-greeting"></i></button>
              <button class="btn btn-danger" @click="removeTicket()" v-else-if="hasTicket"> <i
                  class="mdi mdi-run-fast"></i></button>
              <button class="btn btn-info" :disabled="event.capacity == 0" v-else>
                SOLD OUT <i class="mdi mdi-human-walker"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';
import { AuthService } from '../services/AuthService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js';

export default {
  props: {
    event: {
      type: Event,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    return {
      event: computed(() => AppState.aciveEvent),
      hasTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      async createTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          await ticketsService.createTicket({ eventId: route.params.id })
          Pop.success('Thanks For Grabbing A Ticket!')
        } catch (error) {
          Pop.error('[CreateTicket]', error)
        }
      },
      async removeTicket() {
        try {
          const yes = await Pop.confirm('Are you sure you want to sell your Ticket?')
          if (!yes) { return }
          const ticket = AppState.tickets.find(t => t.accountId == AppState.account.id && t.eventId == AppState.aciveEvent.id)
          await ticketsService.removeTicket(ticket.id)
          Pop.success('I guess you can leave...')
        } catch (error) {
          Pop.error('[RemoveTicket]', error)
        }
      },
      async cancelEvent() {
        await eventsService.canceleEvent()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

img {
  max-height: 45vh;
  min-width: 45vh;
}

.img {
  // border-radius: ;
  background-position: center;
  background-size: cover;

  .back {
    background-color: rgba(32, 87, 236, 0.537);
    backdrop-filter: blur(7px);
    outline: 2px solid #79e7ab
  }
}

.hoverable {
  cursor: pointer;
}
</style>