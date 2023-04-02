<template>
    <div class="message-data" :class="{ 'text-right': role === 'assistant' }">
            <span class="message-data-time">{{ time }}, Today </span>
            <img v-if="role === 'assistant'" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/250px-ChatGPT_logo.svg.png" alt="avatar">
            <img v-if="role === 'user'" src="0.jpg" alt="avatar">
        </div>
    <div class="d-flex" :class="[role === 'assistant' ? 'float-right' : 'float-left' ]">
        <div 
            class="message"
            :class="[role === 'assistant' ? 'other-message' : 'my-message' ]"
        >
            {{ computedMessage }}
        </div>
    
        <div class="d-flex flex-column">
            <a v-if="role === 'assistant'" href="javascript:void(0);" class="btn btn-outline-secondary p-0 rounded-circle" @click="translate = !translate"><i class="fa fa-camera"></i></a>
            <a href="javascript:void(0);" class="btn btn-outline-primary p-0 rounded-circle"><i class="fa fa-image"></i></a>
            <a href="javascript:void(0);" class="btn btn-outline-info p-0 rounded-circle"><i class="fa fa-cogs"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        role: String,
        time: String,
        translated: String,
        alternative: String,
        correction: String
    },
    data() {
        return {
            translate: false
        }
    },
    computed: {
        computedMessage() {
            return this.translate && this.role === 'assistant' ? this.translated : this.message
        }
    }
};
</script>
