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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
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
