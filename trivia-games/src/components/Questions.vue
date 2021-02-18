<template>
<div class="questions">
    <h4>Questions</h4>
    <h5>{{getNextQuestion.question}}</h5>

<!--  <ul>-->
<!--    <li v-for="question of questions" :key="question.id">-->
<!--      {{ question.question }}-->
<!--    </li>-->
<!--  </ul>-->
</div>
</template>

<script>
import {fetchQuestions} from "@/api/questionsAPI";

export default {
  name: 'Questions',
  data() {
    return {
      question: '',
      questionsInside: [{}],
      currentQuestionIndex: 0
    }
  },
  created() {
    fetchQuestions().then(s => {
      this.questionsInside = s.results //Object.values(s.results)
      // console.log(questions)
      // console.log(typeof )

    }).catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  mounted() {
    console.log(this.questionsInside.length)
    // this.question = this.getNextQuestion
  },
  computed: {
    getNextQuestion: function (){
      console.log(typeof this.questionsInside[(this.currentQuestionIndex)])

      return this.questionsInside[(this.currentQuestionIndex)]
    },
    // getQuestion: function (index){
    //   return this.questions[index]
    // }
  }
}
</script>

<style>

</style>
