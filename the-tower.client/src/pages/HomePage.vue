<template>
  <div class="container-fluid">
    <div class="row">
      <EventCard v-for="e in events" :event="e" :key="e.id" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import EventCard from '../components/EventCard.vue';

export default {
  setup() {
    // const editable = ref('')
    async function getEvents() {
      try {
        await eventsService.getEvents();
      }
      catch (error) {
        Pop.error("[GetEvents]", error);
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      events: computed(() => AppState.events),
      // events: computed(() => AppState.events.filter(e => e.title.toUpperCase().includes(editable.value.toUppercase()))),
      // async getEventsByType(type) {
      //   try {
      //     await eventsService.getEvents(type)
      //   } catch (error) {
      //     Pop.error(error, '[GetEventsByType]')
      //   }
      // }
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">

</style>
