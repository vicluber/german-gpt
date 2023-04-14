<template>
    <li class="clearfix">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/250px-ChatGPT_logo.svg.png" alt="avatar">
        <div class="about">
        <div class="name">Germán GPT</div>
        <div class="status"> <i class="fa fa-circle online"></i> Always online </div>
        </div>
    </li>
    <li class="clearfix active">
        <img :src="theAvatar" alt="avatar">
        <div class="about">
        <div class="name">{{ theAvatarName }}</div>
        <div class="status"> <i class="fa fa-circle online"></i> online </div>
        </div>
    </li>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
        
        };
    },
    computed: {
        ...mapState(['theAvatar']),
        ...mapState(['theAvatarName'])
    },
    methods: {
        
    }
};
</script>
