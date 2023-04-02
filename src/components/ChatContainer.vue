<template>
  <div class="card chat-app">
    <PeopleListContainer />
    <Chat />
  </div>
</template>
<script>
import PeopleListContainer from "./PeopleListContainer.vue";
import Chat from "./Chat.vue";
export default {
    data() {
        return {
            
        };
    },
    mounted() {
    },
    methods: {
        
    },
    components: { PeopleListContainer, Chat }
};
</script>
