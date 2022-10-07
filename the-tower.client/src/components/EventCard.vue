<template>
  <div class="col-md-3 event-card my-3">
    <router-link :to="{name: 'Event', params: {id: event.id}}">
      <div class="card event-body bg-dark d-flex justify-content-end"
        :style="{backgroundImage: `url(${event.coverImg})`}">
        <div class="event-text p-2">
          <h5>{{event.name}}</h5>
          <p>{{event.location}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { TowerEvent } from '../models/Event.js';

export default {
  props: {
    event: { type: TowerEvent, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.event-card {
  height: 30vh;

  .card {
    border: 2px solid #474c61 !important;
  }

  p {
    margin: unset;
  }

  .event-body {
    background-size: cover;
    background-position: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 30vh;

    .event-text {
      background-color: rgb(42, 45, 58, .7);
      backdrop-filter: blur(7px);
      border-bottom-left-radius: .375rem;
      border-bottom-right-radius: .375rem;
    }
  }
}
</style>