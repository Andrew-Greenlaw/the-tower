<template>
  <div class="text-center">
    <button class="btn selectable btn-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated" aria-label="Login button">
      Login
    </button>
    <div class="dropdown my-2 my-lg-0" v-else>
      <div>
        <div class="d-flex justify-content-center mb-3" v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" class="rounded img-fluid"
            :title="account.name" />
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'Home' }">
      <div class="btn text-success lighten-30 selectable text-uppercase mb-2 router-link-exact-active"
        aria-label="Navigate to Home Page">
        Home
      </div>
    </router-link>
    <router-link :to="{ name: 'Account' }">
      <div class="btn text-success lighten-30 selectable text-uppercase mb-3 router-link-exact-active"
        v-if="user.isAuthenticated" aria-label="Navigate to Account Page">
        Account
      </div>
    </router-link>
    <div>
      <button type="button" class="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#newEventModal"
        v-if="user.isAuthenticated" aria-label="Create New Event">
        NEW EVENT
      </button>
    </div>
    <div>
      <div class="btn text-danger" @click="logout" v-if="user.isAuthenticated" aria-label="Logout Button">
        <i class="mdi mdi-logout"></i>
        logout
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

img {
  max-width: 90%;
  height: auto;
}

// .router-link-exact-active {
//   border-bottom: 2px solid var(--bs-success);
//   border-bottom-left-radius: 0;
//   border-bottom-right-radius: 0;
// }

a:hover {
  text-decoration: none;
}
</style>
