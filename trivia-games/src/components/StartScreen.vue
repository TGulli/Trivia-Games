<template>
  <div class="StartScreen">
    <h1>Welcome to Vue Trivia App</h1>
    <p>Press the button or anywhere on the screen to play</p>
    <!--    <button @click=play>Play!</button>-->
    <router-link to="/questions" tag="button">Start game</router-link>
    <p>Test</p>
    {{ questions[0] }}

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
  data() {
    return {
      error: '',
      questions: []
    }
  },
  created() {
    fetchQuestions().then(questions => {
      this.questions = questions.results
      console.log(questions)
    }).catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  mounted() {
    window.addEventListener("click", () => {
      this.play()
    })
  },
  methods: {
    play: function () {
      console.log("Hello")
      // this.$router.push("/questions")
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
