<template>
    <div class="message-data" :class="{ 'text-right': role === 'assistant' }">
        <span class="message-data-time">{{ time }}, Today </span>
        <img v-if="role === 'assistant'" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/250px-ChatGPT_logo.svg.png" alt="avatar">
        <img v-if="role === 'user'" src="0.jpg" alt="avatar">
    </div>
    <div class="d-flex float-left" v-if="role === 'user'">
        <div class="message my-message" v-if="!alternate && !correct">{{ message }}</div>
        <div class="message my-message" v-if="alternate && !correct">{{ alternative }}</div>
        <div class="message my-message" v-if="correct && !alternate">{{ correction }}</div>
        <div class="d-flex flex-column mx-2">
            <a href="javascript:void(0);" class="btn" @click="showCorrection()">
                <i class="fa fa-wrench" :class="{'text-primary': correct}"></i>
            </a>
            <a href="javascript:void(0);" class="btn" @click="showAlternative()">
                <i class="fa fa-refresh" :class="{'text-primary': alternate}"></i>
            </a>
        </div>
    </div>

    <div class="d-flex float-right" v-if="role === 'assistant'">
        <div class="message other-message">{{ assistantMessage }}</div>
        <div class="d-flex flex-column mx-2">
            <a href="javascript:void(0);" class="btn" @click="translate = !translate">
                <i class="fa fa-language" :class="{'text-primary': translate}"></i>
            </a>
        </div>
    </div>
</template>

<script>
import { Configuration, OpenAIApi } from "openai";
export default {
    props: {
        message: String,
        role: String,
        time: String
    },
    data() {
        return {
            openaiMessages: [],
            openai: new OpenAIApi(new Configuration({apiKey: import.meta.env.VITE_SOME_KEY})),
            translate: false,
            alternate: false,
            correct: false,
            translated: '',
            alternative: '',
            correction: ''
        };
    },
    methods: {
        showCorrection() {
            this.correct = !this.correct
            this.alternate = false
        },
        showAlternative() {
            this.correct = false
            this.alternate = !this.alternate
        }
    },
    created() {
        this.openaiMessages.push({ role: "user", content: "De que otra forma se puede decir esto en alemán?: " + this.message })
        this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: this.openaiMessages
        }).then(res => {
            this.alternative = res.data.choices[0].message.content
        });


        this.openaiMessages.push({ role: "user", content: "Como se escribe esto de forma correcta?: " + this.message })
        this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: this.openaiMessages
        }).then(res => {
            this.correction = res.data.choices[0].message.content
        });

        

        if(this.role == 'assistant')
        this.openaiMessages.push({ role: "user", content: "Traduce esto al español: " + this.message })
        this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: this.openaiMessages
        }).then(res => {
            this.translated = res.data.choices[0].message.content
        });
    },
    computed: {
        assistantMessage() {
            return this.translate ? this.translated : this.message
        }
    }
};
</script>
