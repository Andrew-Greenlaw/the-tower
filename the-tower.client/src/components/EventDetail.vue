<template>
  <div class="col-12 p-0 img mb-4" :style="{backgroundImage: `url(${event.coverImg})`}">
    <div class="back p-3 pb-5 ">
      <!-- TODO make it so you can only see the delete if you are the owner -->
      <!-- TODO make the text shadow for all over the image text -->
      <div class="d-flex justify-content-end">
        <!-- TODO change this to a dropstart from bootstrap -->
        <button class=" btn text-light selectable" @click="cancelEvent()" v-if="account.id == event.creatorId">
          <i class="mdi mdi-close-thick"></i>
        </button>
      </div>
      <div class="event-details d-flex">
        <div class="event-img">
          <img :src="event.coverImg" alt="Event Photo missing" class="img-fluid">
        </div>
        <div class="event-text px-4 d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <div class="d-flex justify-content-between">
              <div class="mb-4">
                <h3>{{event.name}}</h3>
                <h5>{{event.location}}</h5>
              </div>
              <div>
                <h4>{{event.startDate}}</h4>
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
              <button class="btn btn-danger" disabled v-else-if="hasTicket">You are Attending <i
                  class="mdi mdi-human"></i></button>
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
// import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { TowerEvent } from '../models/Event.js';
import { AuthService } from '../services/AuthService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js';

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    tickets: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    // onMounted(() => { })
    return {
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      hasTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      account: computed(() => AppState.account),
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
          const ticket = AppState.tickets.find(t => t.accountId == AppState.account.id && t.eventId == AppState.activeEvent.id)
          await ticketsService.removeTicket(ticket.id)
          Pop.success('I guess you can leave...')
        } catch (error) {
          Pop.error('[RemoveTicket]', error)
        }
      },
      async cancelEvent() {
        try {
          const yes = await Pop.confirm('Are you sure you want to cancel this event?')
          if (!yes) { return }
          await eventsService.canceleEvent(route.params.id)
          Pop.success('Event has been canceled')
        } catch (error) {
          Pop.error('[Cancel This event]')
        }
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
  max-width: 45vh;

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