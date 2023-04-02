<template>
    <div class="chat">
        <div class="chat-header clearfix">
            <div class="row">
                <div class="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                <img src="0.jpg" alt="avatar">
                </a>
                <div class="chat-about">
                    <h6 class="m-b-0">Victor Willhuber</h6>
                    <small>Last seen: now</small>
                </div>
                </div>
                <div class="col-lg-6 hidden-sm text-right">
                <a href="javascript:void(0);" class="btn btn-outline-secondary"><i class="fa fa-camera"></i></a>
                <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
                <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
                <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
                </div>
            </div>
        </div>
        <div class="chat-history">
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
export default {
    data() {
        return {
            time: "",
            inputMessage: "",
            message: "",
            messages: [],
            openaiMessages: [],
            response: [],
            corrected: "",
            alternative: "",
            analisys: "",
            answer: "",
            openai: new OpenAIApi(new Configuration({apiKey: import.meta.env.VITE_SOME_KEY}))
        };
    },
    mounted() {
    },
    methods: {
        async sendMessage() {
            this.time = new Date().toLocaleTimeString();
            this.message = this.inputMessage;
            this.inputMessage = "";
            this.messages.push({ role: "user", content: this.message, time: this.time });
            this.openaiMessages.push({ role: "user", content: this.message });
            this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                //n: 2,
                messages: this.openaiMessages
            }).then(res => {
                this.answer = res.data.choices[0].message.content;
                this.openaiMessages.push({ role: "assistant", content: this.answer });
                this.askForAlternative();
            });
        },
        askForAlternative() {
            this.openaiMessages.push({ role: "user", content: "De que otra forma se puede decir esto?: " + this.message })
            this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                //n: 2,
                messages: this.openaiMessages
            }).then(res => {
                this.alternative = res.data.choices[0].message.content;
                this.openaiMessages.push({ role: "assistant", content: this.alternative });
                this.askForCorrection()
            });
        },
        askForCorrection(){
            this.openaiMessages.push({ role: "user", content: "Como se escribe esto de forma correcta?: " + this.message })
            this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                //n: 2,
                messages: this.openaiMessages
            }).then(res => {
                this.corrected = res.data.choices[0].message.content;
                this.openaiMessages.push({ role: "assistant", content: this.corrected });
                this.askForGramarAnalisys()
            });
        },
        askForGramarAnalisys(){
            this.openaiMessages.push({ role: "user", content: "Traduce esto al español: " + this.answer })
            this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                //n: 2,
                messages: this.openaiMessages
            }).then(res => {
                this.analisys = res.data.choices[0].message.content;
                this.messages.push({ role: "assistant", content: this.answer, time: this.time, translated: this.analisys, alternative: this.alternative, correction: this.corrected });
                this.openaiMessages.push({ role: "assistant", content: this.analisys });
            });
        }
    },
    components: { ChatLoop }
};
</script>