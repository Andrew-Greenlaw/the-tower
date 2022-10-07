<template>
  <div class="row">
    <div class="col-12 about text-center mb-5">
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
  </div>
  <div class="row justify-content-center">
    <!-- <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" /> -->
    <div class="col-md-8 p-0 d-flex bg-secondary mb-4" v-for="t in tickets" :key="t.id" :ticket="t">
      <div class="ticket-img">
        <router-link :to="{name: 'Event', params: {id: t.event.id}}">
          <img :src="t.event.coverImg" alt="The Event Image">
        </router-link>
      </div>
      <div class="p-4 d-flex flex-column justify-content-between flex-grow-1">
        <div>
          <i v-if="t.event.isCanceled">Event Canceled</i>
          <h3>{{t.event.name}}</h3>
          <p>{{t.event.startDate}}</p>
        </div>
        <div class="d-flex justify-content-end">
          <button @click="removeTicket(t.id)" class="btn btn-danger">Return Ticket</button>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <span class="dot bg-dark">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { ticketsService } from '../services/TicketsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
// import TicketCard from '../components/TicketCard.vue.jsx'
export default {
  setup() {
    // async getMyCreatedEvents(){
    //   try {
    //     await accountService.get
    //   } catch (error) {
    //     Pop.error('[GetEventsByCreator]',error)
    //   }
    // },
    async function getEventTickets() {
      try {
        await accountService.getEventTickets();
      }
      catch (error) {
        Pop.error("[GetAccountEvents]", error);
      }
    }
    onMounted(() => {
      // getMyCreatedEvents()
      getEventTickets();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      async removeTicket(id) {
        try {
          const yes = await Pop.confirm("Are you sure you want to sell your Ticket?");
          if (!yes) {
            return;
          }
          // const ticket = AppState.tickets.find(t => t.accountId == AppState.account.id && t.eventId == AppState.activeEvent.id)
          // logger.log(ticket);
          await ticketsService.removeTicket(id);
          Pop.success("You Have Returned Your Ticket");
        }
        catch (error) {
          Pop.error("[RemoveTicket]", error);
        }
      }
    };
  },
  // components: { TicketCard }
}
</script>

<style scoped>
.ticket-img {
  width: 30vh;
}

img {
  max-width: 100%;
  height: auto;
}

.dot {
  height: 110px;
  width: 110px;
  border-radius: 50%;
  display: inline-block;
  transform: translateX(3.5rem);
}
</style>
