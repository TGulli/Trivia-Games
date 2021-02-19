<template>
  <div class="StartScreen">
    <h1>Welcome to Vue Trivia App</h1>
    <p>Press the button or anywhere on the screen to play</p>
        <button @click=play>Play!</button>
<!--    <router-link to="/questions/0" tag="button">Start game</router-link>-->

    <p>Test</p>
<!--    {{decodeHtml(getQuestion(0))}}-->
    <Questions :question = "question"/>
<!--    <button @click="getQuestion(0)" class="btn btn-info">Send Child A Message</button>-->
<!--    <questions :question="question"></questions>-->


<!--    <ul>-->
<!--      <li v-for="question of questions" :key="question.id">-->
<!--        {{ question.question }}-->
<!--      </li>-->
<!--    </ul>-->

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import {fetchQuestions} from "@/api/questionsAPI"
import Questions from "@/components/Questions";
// import Questions from "@/components/Questions";


export default {
  name: 'StartScreen',
  components: {Questions},
  // components: {Questions},
  data() {
    return {
      error: '',
      questions: [{}],
      question: ''
    }
  },
  created() {
    fetchQuestions().then(s => {
      this.questions = s.results
    }).catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  mounted() {
    window.addEventListener("click", () => {
      this.play()
      this.getQuestion(0)
    })
  },
  methods: {
    play: function () {
      console.log("Hello")
      this.$router.push("/questions/0")
    },
    getQuestion: function (id) {
      this.question = '<p>Kommer denne til child?' + id +'</p>' //this.decodeHtml(this.questions[id].question)
    },
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}


a {
  color: #42b983;
}
</style>
