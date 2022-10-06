<template>
  <nav class="d-flex justify-content-center px-3">
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <!-- class="collapse navbar-collapse" id="navbarText" -->
    <div class="d-flex flex-column">
      <!-- LOGIN COMPONENT HERE -->
      <Login />
      <ul class="navbar-nav d-flex justify-content-center">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable text-uppercase">
            Home
          </router-link>
        </li>
        <li>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            NEW EVENT
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
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
