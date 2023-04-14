<template>
    <div class="chat h-100" style="display: flex; flex-direction: column;">
        <div class="chat-history" style="flex: 1;" ref="chatHistory">
            <ul class="m-b-0">
                <ChatLoop
                    :messages="this.messages"
                />
            </ul>
        </div>
        <div class="chat-message clearfix">
            <div class="input-group mb-0">
                <div class="input-group-prepend">
                    <span class="input-group-text" @click="sendMessage"><i class="fa fa-send"></i></span>
                </div>
                <input
                    v-on:keyup.enter="sendMessage"
                    v-model="inputMessage"
                    type="text"
                    class="form-control"
                    placeholder="Say something..."
                    aria-label="Say something..."
                    aria-describedby="button-addon2">
            </div>
        </div>
    </div> 
</template>
<script>
import { Configuration, OpenAIApi } from "openai";
import ChatLoop from "./ChatLoop.vue";
import { mapState } from "vuex";
export default {
    data() {
        return {
            time: "",
            inputMessage: "",
            message: "",
            messages: [],
            openaiMessages: [],
            answer: "",
            openai: new OpenAIApi(new Configuration({apiKey: import.meta.env.VITE_SOME_KEY}))
        };
    },
    methods: {
        async sendMessage() {
            this.time = new Date().toLocaleTimeString();
            this.message = this.inputMessage;
            this.inputMessage = "";
            this.messages.push({ role: "user", content: this.message, time: this.time });
            this.askForAnswer()
        },
        askForAnswer() {
            this.openaiMessages.push({ role: "user", content: this.message+'. Y contestame en '+this.theLanguage+'.' });
            this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: this.openaiMessages
            }).then(res => {
                this.answer = res.data.choices[0].message.content;
                this.openaiMessages.push({ role: "assistant", content: this.answer });
                this.messages.push({ role: "assistant", content: this.answer, time: this.time });
            });
        },
    },
    computed: {
        ...mapState(['theLanguage'])
    },
    components: { ChatLoop }
};
</script>