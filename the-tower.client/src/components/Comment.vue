<template>
  <div class="d-flex p-2 align-items-center">
    <div>
      <img :src="comment.creator.picture" alt="Im the profile picture" :title="comment.creator.name">
    </div>
    <div class="comment-text ms-2 bg-info d-flex flex-grow-1 p-3 justify-content-between">
      <div>
        <h5>{{comment.creator.name}}</h5>
        <p>{{comment.body}}</p>
      </div>
      <div>
        <button @click="removeComment()" class="btn selectable" aria-label="Delete this Comment?"
          v-if="comment.creatorId == account.id">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeComment() {
        try {
          const yes = await Pop.confirm('Are you sure you want to sell your Ticket?')
          if (!yes) { return }
          await eventsService.removeComment(props.comment.id)
          Pop.success('You deleted your comment')
        } catch (error) {
          Pop.error('[RemoveComment]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  border-radius: 50%;
  height: auto;
  max-height: 15vh;
  max-width: 100%;
}

.comment-text {
  border-radius: .3rem;

  p {
    margin: unset;
  }
}
</style>