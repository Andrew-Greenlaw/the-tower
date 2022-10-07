<template>
  <div class="row event-page px-4 justify-content-center">
    <EventDetail v-if="towerEvent" :event="towerEvent" />
    <div class="col-12 bg-secondary d-flex mb-5 p-3 rounded">
      <div class="mx-1" v-for="t in tickets" :key="t.id" :tickets="t">
        <img :src="t.profile?.picture" alt="profile image" :title="t.profile?.name">
      </div>
    </div>
    <div class="col-8 bg-secondary p-4 mb-5 rounded">
      <CommentForm />
      <Comment v-for="c in comments" :key="c.id" :comment="c" />
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
import CommentForm from '../components/CommentForm.vue';
import Comment from '../components/Comment.vue';

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
    async function getComments() {
      try {
        await eventsService.getComments(route.params.id)
      } catch (error) {
        Pop.error(error, '[GetComments]')
      }
    }
    onMounted(() => {
      getEventById();
      getTickets()
      getComments()
    });
    return {
      towerEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments)
    };
  },
  components: { EventDetail, CommentForm, Comment }
}
</script>

<style lang="scss" scoped>
img {
  border-radius: 50%;
  height: 5vh;
}
</style>