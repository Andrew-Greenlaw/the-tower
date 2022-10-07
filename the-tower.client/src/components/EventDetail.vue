<template>
  <div class="col-12 p-0 img mb-5 rounded" :style="{backgroundImage: `url(${event.coverImg})`}">
    <div class="back p-3 rounded">
      <!-- TODO make it so you can only see the delete if you are the owner -->
      <!-- TODO make the text shadow for all over the image text -->
      <div class="d-flex justify-content-end"
        v-if="account.id == event.creatorId && !event.isCanceled && !event.capacity == 0">
        <!-- TODO change this to a dropstart from bootstrap -->
        <button class=" btn text-light selectable" @click="cancelEvent()" aria-label="Cancel Event"
          title="Cancel Event">
          <i class="mdi mdi-close-thick"></i>
        </button>
      </div>
      <div class="d-flex justify-content-center bg-danger mb-3" v-else-if="event.isCanceled">
        <h2>Event Canceled</h2>
      </div>
      <div class="d-flex justify-content-center bg-danger mb-3" v-else-if="event.capacity == 0">
        <div>
          <h2>No More Tickets</h2>
        </div>
        <button class=" btn text-dark selectable" @click="cancelEvent()" aria-label="Cancel Event">
          <i class="mdi mdi-close-thick"></i>
        </button>
      </div>
      <div class="event-details d-flex">
        <div class="event-img">
          <img :src="event.coverImg" alt="Event Photo missing" class="img-fluid" :title="event.name" />
        </div>
        <div class="event-text px-4 d-flex flex-column justify-content-between flex-grow-1 text-shadow">
          <div>
            <div class="d-flex justify-content-between">
              <div class="mb-4">
                <h3>{{event.name}}</h3>
                <h5>{{event.location}}</h5>
              </div>
              <div>
                <h4>{{event.startDate}}</h4>
                <h5 class="text-end">{{event.type}}</h5>
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
                v-if="!event.isCanceled && !hasTicket && event.capacity != 0" aria-label="Attend this event?">Attent <i
                  class="mdi mdi-human-greeting"></i></button>
              <button class="btn btn-danger" disabled v-else-if="hasTicket" aria-label="You are Allready Attending">You
                are Attending <i class="mdi mdi-human"></i></button>
              <button class="btn btn-info" :disabled="event.capacity == 0" v-else>
                NO MORE TICKETS <i class="mdi mdi-human-walker" aria-label="No More Tickets"></i></button>
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
  },
  setup() {
    const route = useRoute()
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
      async cancelEvent() {
        try {
          const yes = await Pop.confirm('Are you sure you want to cancel this event?')
          if (!yes) { return }
          await eventsService.cancelEvent(route.params.id)
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

.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgb(83, 83, 83);
  font-weight: bold;
  letter-spacing: 0.08rem
}

.event-img {
  max-width: 30%;
}

.event-text {
  max-width: 70%;
}

.dropdown-menu.show {
  transform: scale(1);
}

img {
  max-width: 100%;
  height: auto;

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