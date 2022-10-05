<template>
  <div class="col-md-3 event-card my-3">
    <div class="card event-body" :style="{backgroundImage: `url(${event.coverImg})`}">
      <h4>{{event.name}}</h4>
      <h4>{{event.location}}</h4>
      <h4>{{event.startDate}}</h4>
      <h4>{{event.capacity}}</h4>
    </div>
  </div>
</template>


<script>
import { Event } from '../models/Event.js';

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.event-card {
  .event-body {
    height: 350px;
    width: 350px;
    object-fit: cover;
    object-position: center;
  }
}
</style>