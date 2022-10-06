<template>
  <main class="container-fluid bg-dark">
    <div class="row">
      <div class="col-md-11">
        <div class="row">
          <div class="col-md-12">
            <h1>TOWER</h1>
          </div>
        </div>
        <router-view />
      </div>
      <!-- TODO make the background to the transparent thing -->
      <div class="col-md-1 pt-5 nav-component bg-secondary">
        <Navbar />
      </div>
    </div>
    <div class="modal fade" id="newEventModal" tabindex="-1" aria-labelledby="newEventModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <EventForm />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import EventForm from './components/EventForm.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, EventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.nav-component {
  height: 100vh;
  // background: rgb(58, 60, 66);
  // background: linear-gradient(180deg, rgba(58, 60, 66, 0.975) 29%, rgba(58, 60, 66, 0.8714285714285714) 66%, rgba(58, 60, 66, 0.6857142857142857) 100%);
}
</style>
