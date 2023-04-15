<template>
  <div v-if="!openChat" class="modal fade show" id="exampleModal" tabindex="-1" style="display: block;" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
        </div>
        <div class="modal-body">
          <label for="language">I want to improve my:</label>
          <select class="form-control" v-model="language">
            <option value="alemán">German</option>
            <option value="español">Spanish</option>
            <option value="inglés">English</option>
            <option value="italiano">Italian</option>
            <option value="portugés">Portugues</option>
          </select>
          <small id="emailHelp" class="form-text text-muted">Language be used.</small>
          <span class="text-danger" v-if="errors.language">{{ errors.language }}</span>
          <br>
          <label for="language">I can easily speak:</label>
          <select class="form-control" v-model="motherThonge">
            <option value="alemán">German</option>
            <option value="español">Spanish</option>
            <option value="inglés">English</option>
            <option value="italiano">Italian</option>
            <option value="portugés">Portugues</option>
          </select>
          <small id="emailHelp" class="form-text text-muted">Maybe your mother tongue.</small>
          <span class="text-danger" v-if="errors.motherThonge">{{ errors.motherThonge }}</span>
          <br>
          <label>Avatar</label>
          <div class="d-flex">
            <div class="p-2">
              <button
                class="set-avatar-button"
                :class="{ 'rounded border border-primary': avatarName === 'Clone' }"
                @click="setAvatar('clone.png', 'Clone')">
                <img class="img-thumbnail"
                  src="clone.png" />
              </button>
            </div>
            <div class="p-2">
              <button
                class="set-avatar-button"
                :class="{ 'rounded border border-primary': avatarName === 'Yoda' }"
                @click="setAvatar('yoda.png', 'Yoda')">
                <img class="img-thumbnail" src="yoda.png" />
              </button>
            </div>
            <div class="p-2">
              <button
                class="set-avatar-button"
                :class="{ 'rounded border border-primary': avatarName === 'Chewbacca' }"
                @click="setAvatar('chewbacca.png', 'Chewbacca')">
                <img class="img-thumbnail" src="chewbacca.png" />
              </button>
            </div>
            <div class="p-2">
              <button
                class="set-avatar-button"
                :class="{ 'rounded border border-primary': avatarName === 'bb-8' }"
                @click="setAvatar('bb-8.png', 'BB-8')">
                <img class="img-thumbnail" src="bb-8.png" />
              </button>
            </div>
            <div class="p-2">
              <button
                class="set-avatar-button"
                :class="{ 'rounded border border-primary': avatarName === 'Jabba the Hutt' }"
                @click="setAvatar('jabba.png', 'Jabba the Hutt')">
                <img class="img-thumbnail" src="jabba.png" />
              </button>
            </div>
            <div class="p-2">
              <button
                class="set-avatar-button"
                :class="{ 'rounded border border-primary': avatarName === 'Clone-2' }"
                @click="setAvatar('clone-2.png', 'Clone-2')">
                <img class="img-thumbnail" src="clone-2.png" >
              </button>
            </div>
          </div>
          <span class="text-danger" v-if="errors.avatarName">{{ errors.avatarName }}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="startChatting()">GoChat</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card chat-app h-100" v-if="openChat">
    <PeopleListContainer />
    <Chat />
  </div>
</template>
<script>
import PeopleListContainer from "./PeopleListContainer.vue";
import Chat from "./Chat.vue";
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            openChat: false,
            language: "",
            motherThonge: "",
            avatarName: "",
            avatarImageUrl: "",
            errors: {}
        };
    },
    methods: {
      setAvatar(avatarImageUrl, name){
        this.avatarImageUrl = avatarImageUrl
        this.avatarName = name
      },
      validateForm() {
        this.errors = {};

        if (this.motherThonge == "") {
          this.errors.motherThonge = 'Required field';
        }

        if (this.language == "") {
          this.errors.language = 'Required field';
        }

        if (this.avatarName == "") {
          this.errors.avatarName = 'Select an avatar';
        }

        return Object.keys(this.errors).length === 0;
      },
      startChatting(){
        if (this.validateForm()) {
          this.setTheLanguage(this.language);
          this.setTheMotherThonge(this.motherThonge);
          this.setTheAvatar(this.avatarImageUrl);
          this.setTheAvatarName(this.avatarName);
          this.openChat = !this.openChat
        }
      },
      ...mapActions(['setTheLanguage']),
      ...mapActions(['setTheMotherThonge']),
      ...mapActions(['setTheAvatar']),
      ...mapActions(['setTheAvatarName'])
    },
    computed: {
      ...mapState(['theLanguage']),
      ...mapState(['theMotherThonge']),
      ...mapState(['theAvatar']),
      ...mapState(['theAvatarName'])
    },
    components: { PeopleListContainer, Chat }
};
</script>
