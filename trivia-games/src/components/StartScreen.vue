<template>
  <div class="StartScreen">
    <h1>Welcome to Vue Trivia App</h1>
    <p>Press the button or anywhere on the screen to play</p>
    <!--    <button @click=play>Play!</button>-->
    <button>Play!</button> <!-- Stupid button work, because all clicks is defined in mounted -->
    <p>Test</p>
    {{ questions.length }}
    {{ test }}

    <ul>
      <li v-for="question of questions" :key="question.id">
        {{ question.question }}
      </li>
    </ul>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import {fetchQuestions} from "@/api/questionsAPI"

export default {
  name: 'StartScreen',
  created() {
    fetchQuestions().then(questions => {
      this.questions = questions.results
      console.log(questions)
    }).catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  data() {
    return {
      questions: [],
      error: '',
      test: "hello"
    }
  },
  mounted() {
    window.addEventListener("click", () => {
      this.play()
    })
  },
  methods: {
    play: function () {
      console.log("Yaay")
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
