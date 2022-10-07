<template>
  <nav class="d-flex justify-content-center px-3">
    <div class="d-flex flex-column">
      <!-- LOGIN COMPONENT HERE -->
      <Login />

    </div>
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import Login from './Login.vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

li {
  text-align: center;
  margin-bottom: .5rem;
}
</style>
