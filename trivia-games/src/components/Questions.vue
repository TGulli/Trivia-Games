<template>
<div class="questions">
 <QuestionItem v-bind:question = "getNextQuestion" />
 <QuestionItem  @submitAnswer= onClickChild>  </QuestionItem>
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
    onClickChild () {
      console.log("hei") // someValue
    } 
    }


}
</script>

<style>

</style>
