<template>
    <div class="chat h-100" style="display: flex; flex-direction: column;">
        <div class="chat-header clearfix">
            <div class="row">
                <div class="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                <img src="0.jpg" alt="avatar">
                </a>
                <div class="chat-about">
                    <h6 class="m-b-0">{{ name }}</h6>
                    <small>Last seen: now</small>
                </div>
                </div>
            </div>
        </div>
        <div class="chat-history" style="flex: 1;" @change="onChange()" ref="chatHistory">
            <ul class="m-b-0">
                <ChatLoop
                    :messages="this.messages" :theLanguage="theLanguage" :yourLanguage="yourLanguage"
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
export default {
    props: {
        theLanguage: String,
        yourLanguage: String,
        name: String
    },
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
    components: { ChatLoop }
};
</script>