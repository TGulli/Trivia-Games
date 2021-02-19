<template>
  <div class="questions">
    <ul>
      <li v-for = "value in this.questionsInside" :key="value.question">
        {{ value.question }}
      </li>
    </ul>

    <QuestionItem v-bind:question="getNextQuestion" v-on:answerFromChild="onClickChild" v-on:increment="currentQuestionIndex++"/>


    <!--    <QuestionItem @submitAnswer=onClickChild></QuestionItem>-->
  </div>
</template>

<script>
import {fetchQuestions} from "@/api/questionsAPI";
import QuestionItem from "@/components/QuestionItem"

export default {
  name: 'Questions',
  data() {
    return {
      questionsInside: [{}],
      currentQuestionIndex: 0,
      answerFromUser: []
    }
  },
  created() {
    fetchQuestions().then(s => {
      this.questionsInside = s.results //Object.values(s.results)

    }).catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  mounted() {
  },
  computed: {
    getNextQuestion: function () {
      return this.questionsInside[(this.currentQuestionIndex)]
    }
  },
  components: {
    QuestionItem
  },
  methods: {
    onClickChild(value) {
      console.log(value) // someValue
      this.answerFromUser.push(value)
      console.log(this.answerFromUser) // someValue
    },
    // getNextQuestion: function () {
    //   return this.questionsInside[this.currentQuestionIndex]
    // }
  }


}
</script>

<style>

</style>
