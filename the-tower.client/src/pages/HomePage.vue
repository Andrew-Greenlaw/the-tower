<template>
  <div class="row">
    <div class="col-md-11">
      <div>
        <!-- TODO get search function to not explode -->
        <!-- <input type="text" class="form-control" placeholder="Search..." v-model="editable"> -->
      </div>
      <div class="d-flex justify-content-around">
        <button class="btn btn-success">All</button>
        <button class="btn btn-success">Concert</button>
        <button class="btn btn-success">Convention</button>
        <button class="btn btn-success">Sport</button>
        <button class="btn btn-success">Digital</button>
      </div>
    </div>
  </div>
  <div class="row">
    <EventCard v-for="e in events" :event="e" :key="e.id" />
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
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
      // editable,
      events: computed(() => AppState.events),
      // events: computed(() => AppState.events.filter(e => e.name.toUpperCase().includes(editable.value.toUppercase()))),
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
