<template>
  <div class="modal-header">
    <h1 class="modal-title text-dark fs-5" id="newEventModalLabel">New Event</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body text-dark">
    <form @submit.prevent="handleSubmit()">
      <div class="mb-3">
        <input type="text" class="form-control" id="name" v-model="editable.name" placeholder="Name" required
          aria-label="Name Input">
      </div>
      <div class="mb-3">
        <textarea type="text" class="form-control" id="description" v-model="editable.description"
          placeholder="description" rows="3" required aria-label="Description Input"></textarea>
      </div>
      <div class="mb-3">
        <label for="coverImg" class="form-label">CoverImg</label>
        <input type="url" class="form-control" id="coverImg" v-model="editable.coverImg"
          placeholder="https://coverImg.com.png" required>
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">Location</label>
        <input type="text" class="form-control" id="location" v-model="editable.location" placeholder="broadway"
          required>
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label">Start Date</label>
        <input type="date" class="form-control" id="startDate" v-model="editable.startDate" required>
      </div>
      <div class="mb-3">
        <label for="capacity" class="form-label">Capacity</label>
        <input type="number" class="form-control" id="capacity" v-model="editable.capacity" placeholder="200" required>
      </div>
      <!-- <div class="mb-3">
        <input type="text" class="form-control" id="type" v-model="editable.type" placeholder="Type"
          aria-label="Type input">
      </div> -->
      <select class="form-select form-select mb-3" v-model="editable.type" aria-label=".form-select">
        <option selected>Select a Type</option>
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Create">Create</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async handleSubmit() {
        try {
          const formData = editable.value
          const event = await eventsService.createEvent(formData)
          router.push({ name: 'Event', params: { id: event.id } })
        } catch (error) {
          Pop.error('[CreateEvent]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>