<template>
  <div class="row event-page p-4">
    <EventDetail v-if="towerEvent" :event="towerEvent" :tickets="tickets" />
    <div class="col-12 bg-secondary d-flex">
      <div v-for="t in tickets">
        <img :src="t.profile.picture" :alt="t.profile.name">
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import EventDetail from '../components/EventDetail.vue';

export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {

        await eventsService.getEventById(route.params.id);
      }
      catch (error) {
        Pop.error("[GetEvent]", error);
      }
    }
    async function getTickets() {
      try {
        await eventsService.getTickets(route.params.id)
      } catch (error) {
        Pop.error(error, '[GetTickets]')
      }
    }
    onMounted(() => {
      getEventById();
      getTickets()
      // getComments()
    });
    return {
      towerEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      // comments: computed(()=> AppState.comments),
    };
  },
  components: { EventDetail }
}
</script>

<style lang="scss" scoped>
img {
  border-radius: 50%;
  height: 5vh;
}
</style>