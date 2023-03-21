<template>
  <div class="row h-100 p-0 m-0">
    <div class="col-2 corrected-area">
      <div class="h-50">
        <p>Correcciones si las hay:</p>
        <p>{{ corrected }}</p>
      </div>
      <div class="">
        <p>Otra forma de decirlo:</p>
        <p>{{ alternative }}</p>
      </div>
    </div>
    <div class="col-8 chat-area d-flex flex-column">
      <div class="p-2">
        <ul style="list-style: none; padding: 0px;">
          <li v-for="item in messages" :key="item.id">
            <div class="toast align-items-center show" :class="{ 'ms-auto': item.role === 'assistant' }" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="d-flex">
                <div class="toast-body">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-auto p-2">
        <div class="input-group mb-3">
          <input
            v-on:keyup.enter="onButtonClick"
            v-model="message"
            type="text"
            class="form-control"
            placeholder="Say something..."
            aria-label="Say something..."
            aria-describedby="button-addon2">
          <button class="btn bg-secondary" type="button" id="button-addon2" @click="onButtonClick">Send</button>
        </div>
      </div>
    </div>
    <div class="col-2 gramar-area">
      <p>Analisis:</p>
      <p>{{ analisys }}</p>
    </div>
  </div>
</template>

<script>
import { Configuration, OpenAIApi } from "openai";
export default {
  data() {
    return {
      message: '',
      messages: [
      ],
      response: [],
      corrected: '',
      alternative: '',
      analisys: '',
      answer: ''
    };
  },
  mounted() {
  },
  methods: {
    async onButtonClick() {
      const openai = new OpenAIApi(new Configuration({
        apiKey: import.meta.env.VITE_SOME_KEY
      }))
      openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        //n: 2,
        messages: [
          {role: "user", content: "Puedes corregir los errores en la siguiente frase por favor?: "+this.message}
        ]
      }).then(res => {
        this.corrected = res.data.choices[0].message.content
        openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          //n: 2,
          messages: [
            {role: "user", content: "Puedes darme una frase alternativa en alemán para la siguiente frase por favor?: "+this.message}
          ]
        }).then(resSecond => {
          this.alternative = resSecond.data.choices[0].message.content
          openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            //n: 2,
            messages: [
              {role: "user", content: "Puedes analizar la gramática en la siguiente en por favor?: "+this.message}
            ]
          }).then(resThird => {
            this.analisys = resThird.data.choices[0].message.content


            const configuration = new Configuration({
              apiKey: import.meta.env.VITE_SOME_KEY,
            });
            const openaii = new OpenAIApi(configuration);
            this.messages.push({role: "user", content: this.message});
            openaii.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: this.messages,
            }).then(resFourth => {
              this.answer = resFourth.data.choices[0].message.content
              this.messages.push({role: "assistant", content: this.answer});
            });
          })
        })
      })
    }
  }
};
</script>
