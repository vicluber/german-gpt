<template>
  <div v-if="!openChat" class="modal fade show" id="exampleModal" tabindex="-1" style="display: block;" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
        </div>
        <div class="modal-body">
          <label for="language">THe language</label>
          <select class="form-control" v-model="theLanguage">
            <option value="alemán">German</option>
            <option value="español">Spanish</option>
            <option value="inglés">English</option>
            <option value="italiano">Italian</option>
            <option value="portugés">Portugues</option>
          </select>
          <small id="emailHelp" class="form-text text-muted">The language you want to use.</small>

          <label for="language">Your language</label>
          <select class="form-control" v-model="yourLanguage">
            <option value="alemán">German</option>
            <option value="español">Spanish</option>
            <option value="inglés">English</option>
            <option value="italiano">Italian</option>
            <option value="portugés">Portugues</option>
          </select>
          <small id="emailHelp" class="form-text text-muted">The language you feel comfortable with.</small>

          <label for="name">Nombre</label>
          <input
            v-on:keyup.enter="sendMessage"
            v-model="name"
            type="text"
            name="name"
            class="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="button-addon2">
            <small id="emailHelp" class="form-text text-muted">Your name just for displaying it to you on the chat.</small>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="wasist()">GoChat</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card chat-app h-100" v-if="openChat">
    <PeopleListContainer />
    <Chat :name="name" :theLanguage="theLanguage" :yourLanguage="yourLanguage" />
  </div>
</template>
<script>
import PeopleListContainer from "./PeopleListContainer.vue";
import Chat from "./Chat.vue";
export default {
    data() {
        return {
            openChat: false,
            theLanguage: "",
            yourLanguage: "",
            name: ""
        };
    },
    methods: {
        wasist(){
          this.openChat = !this.openChat
        }
    },
    components: { PeopleListContainer, Chat }
};
</script>
