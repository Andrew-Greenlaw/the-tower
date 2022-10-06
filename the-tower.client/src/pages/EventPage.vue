<template>
  <div class="row event-page p-4">
    <EventDetail :event="event" />
    <div class="col-11 bg-secondary">
      <div>
        <img src="" alt="">
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
    onMounted(() => {
      getEventById();
    });
    return {
      event: computed(() => AppState.aciveEvent)
    };
  },
  components: { EventDetail }
}
</script>

<style lang="scss" scoped>

</style>