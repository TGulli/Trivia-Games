<template>
  <div class="questions">
<!--    <ul>-->
<!--      <li v-for="value in this.questionsInside" :key="value.question">-->
<!--        {{ value.question }}-->
<!--      </li>-->
<!--    </ul>-->

    <QuestionItem v-bind:myQuestion="getNextQuestion" v-on:answerFromChild="onClickChild"
                  v-on:increment="currentQuestionIndex++"/>

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
      answerFromUser: [],
    }
  },
  created() {
    fetchQuestions().then(s => {
      this.questionsInside = s.results

    }).catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  mounted() {
  },
  computed: {
    getNextQuestion: function () {
      if (this.currentQuestionIndex === this.questionsInside.length){
        this.goToResults()
        return null
      }
      return {
        question: this.questionsInside[(this.currentQuestionIndex)].question,
        answers: this.mergeAnswers(),
        type: this.questionsInside[(this.currentQuestionIndex)].type
      }
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
    mergeAnswers() {
      let mergedAnswers = []
      if (this.questionsInside[(this.currentQuestionIndex)].incorrect_answers != null){
        console.log(this.questionsInside[(this.currentQuestionIndex)].incorrect_answers)
        for (let i = 0; i < this.questionsInside[(this.currentQuestionIndex)].incorrect_answers.length; i++) {
          mergedAnswers.push(this.questionsInside[(this.currentQuestionIndex)].incorrect_answers[i])
        }
        mergedAnswers.push(this.questionsInside[(this.currentQuestionIndex)].correct_answer)
      }

      return this.shuffle(mergedAnswers)
    },
    shuffle(array) { // TODO: Make own random shuffle
      let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    goToResults(){
      const resultQuestion = []
      for (let i = 0; i < this.questionsInside.length; i++) {
        resultQuestion.push({
          question: this.questionsInside[i].question,
          correct_answer: this.questionsInside[i].correct_answer,
          answered: this.answerFromUser[i]})
      }
      console.log(resultQuestion)

      this.$router.push({
        name: 'Results',
        params: {
          resultQuestion: resultQuestion
        }
      })
    }
  }
}
</script>

<style>

</style>
