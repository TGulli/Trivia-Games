<template>
<div class="questions">
 <ul>
      <li v-for = "value in this.questionsInside" :key="value.question">
        {{ value.question }}
      </li>
    </ul>
 <QuestionItem v-bind:question = "getNextQuestion"  v-on:answer= "onClickChild"  v-on:increment="currentQuestionIndex++"/>

</div>
</template>

<script>
import {fetchQuestions} from "@/api/questionsAPI";
import QuestionItem from "@/components/QuestionItem"

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
    }
    // getQuestion: function (index){
    //   return this.questions[index]
    // }
  },
  components: {
      QuestionItem
  },
   methods: {
    onClickChild (value) {
      console.log(value) // someValue
    } 
    }


}
</script>

<style>

</style>
