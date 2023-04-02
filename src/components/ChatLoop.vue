<template>
    <li class="clearfix" v-for="item in messages" :key="item.id">
        <ChatItem
            :message="item.content"
            :translated="item.translated"
            :time="item.time"
            :role="item.role"
            :alternative="item.alternative"
            :correction="item.corrected"
        />
    </li>
</template>

<script>
import ChatItem from './ChatItem.vue';
export default {
    props: ["messages"],
    components: { ChatItem }
};
</script>
