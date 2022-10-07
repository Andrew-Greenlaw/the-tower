<template>
  <div class="col-md-8 p-0 d-flex bg-secondary mb-4">
    <div class="ticket-img">
      <!-- <router-link :to="{name: 'Event', params: {id: t.event.id}}">
          </router-link> -->
      <img :src="ticket.event.coverImg" alt="The Event Image">
    </div>
    <div class="p-4 d-flex flex-column justify-content-between flex-grow-1">
      <div>
        <i v-if="ticket.event.isCanceled">Event Canceled</i>
        <h3>{{ticket.event.name}}</h3>
        <p>{{ticket.event.startDate}}</p>
      </div>
      <div class="d-flex justify-content-end">
        <button @click.stop="$emit('removeTicket')" class="btn btn-danger">Return Ticket</button>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <span class="dot bg-dark">
      </span>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup({ emit }) {
    return {
      async removeTicket() {
        emit('removeTicket')
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>