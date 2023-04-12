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
          <br>
          <label>Avatar</label>
          <div class="d-flex">
            <div class="p-2">
              <img class="img-thumbnail"
                src="2624869_avatar_bounty hunter_droid_space suit_icon.png"
                @click="setAvatar('2624869_avatar_bounty hunter_droid_space suit_icon.png')">
            </div>
            <div class="p-2">
              <img class="img-thumbnail"
                src="2624871_jedi_jedi master_starwars_yoda_icon.png"
                @click="setAvatar('2624871_jedi_jedi master_starwars_yoda_icon.png')">
            </div>
            <div class="p-2">
              <img class="img-thumbnail"
                src="2624874_chewbacca_han solo_starwars_wookie_icon.png"
                @click="setAvatar('2624874_chewbacca_han solo_starwars_wookie_icon.png')">
            </div>
            <div class="p-2">
              <img class="img-thumbnail"
                src="2624876_droid_r2d2_robot_starwars_icon.png"
                @click="setAvatar('2624876_droid_r2d2_robot_starwars_icon.png')">
            </div>
            <div class="p-2">
              <img class="img-thumbnail"
                src="2624878_frog_jabba the hutt_starwars_toad_icon.png"
                @click="setAvatar('2624878_frog_jabba the hutt_starwars_toad_icon.png')">
            </div>
            <div class="p-2">
              <img class="img-thumbnail"
                src="2624882_bounty hunter_robot_spacecraft_starwars_icon.png"
                @click="setAvatar('2624882_bounty hunter_robot_spacecraft_starwars_icon.png')">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="startChatting()">GoChat</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card chat-app h-100" v-if="openChat">
    <PeopleListContainer />
    <Chat :name="name" />
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
            name: "",
            avatar: ""
        };
    },
    methods: {
      setAvatar(url){
        this.avatar = url
      },
      startChatting(){
        this.setTheLanguage(this.language);
        this.setTheMotherThonge(this.motherThonge);
        this.setTheAvatar(this.avatar);
        this.openChat = !this.openChat
      },
      ...mapActions(['setTheLanguage']),
      ...mapActions(['setTheMotherThonge']),
      ...mapActions(['setTheAvatar'])
    },
    computed: {
      ...mapState(['theLanguage']),
      ...mapState(['theMotherThonge']),
      ...mapState(['theAvatar'])
    },
    components: { PeopleListContainer, Chat }
};
</script>
