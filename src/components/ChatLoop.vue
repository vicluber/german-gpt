<template>
    <li class="clearfix" v-for="item in messages" :key="item.id">
        <ChatItem
            :message="item.content"
            :time="item.time"
            :role="item.role"
        />
    </li>
</template>

<script>
import ChatItem from './ChatItem.vue';
export default {
    props: {
        messages: Array,
    },
    components: { ChatItem }
};
</script>
