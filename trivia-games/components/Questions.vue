<template>
  <div class="area">

    <div class="container">
      <h4>Question </h4>
      <div class="questions">
        <QuestionItem v-bind:myQuestion="getNextQuestion" v-on:answerFromChild="onClickChild"
                      v-on:increment="currentQuestionIndex++"/>

        <!--    <QuestionItem @submitAnswer=onClickChild></QuestionItem>-->
      </div>

    </div>
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
      if (this.currentQuestionIndex === this.questionsInside.length) {
        this.goToResults()
        return null
      }
      return {
        question: this.decodeHtml(this.questionsInside[(this.currentQuestionIndex)].question),
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
      if (this.questionsInside[(this.currentQuestionIndex)].incorrect_answers != null) {
        console.log(this.questionsInside[(this.currentQuestionIndex)].incorrect_answers)
        for (let i = 0; i < this.questionsInside[(this.currentQuestionIndex)].incorrect_answers.length; i++) {
          mergedAnswers.push(this.decodeHtml(this.questionsInside[(this.currentQuestionIndex)].incorrect_answers[i]))
        }
        mergedAnswers.push(this.decodeHtml(this.questionsInside[(this.currentQuestionIndex)].correct_answer))
      }

      return this.shuffle(mergedAnswers)
    },
    shuffle(array) { // TODO: Make own random shuffle
      const newArray = []

      for (let i = 0; i < array.length; i++) {
        let randomNumber = Math.floor(Math.random() * array.length);
        while (newArray[randomNumber] !== undefined) {
          randomNumber = Math.floor(Math.random() * array.length);
        }
        newArray[randomNumber] = array[i]
      }

      return newArray;
    },
    goToResults() {
      const resultQuestion = []
      for (let i = 0; i < this.questionsInside.length; i++) {
        resultQuestion.push({
          question: this.questionsInside[i].question,
          correct_answer: this.questionsInside[i].correct_answer,
          answered: this.answerFromUser[i]
        })
      }
      console.log(resultQuestion)

      this.$router.push({
        name: 'Results',
        params: {
          resultQuestion: resultQuestion
        }
      })
    },
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');

* {
  margin: 0px;
  padding: 0px;
}

.container {
  background: rgba(255, 255, 255, 0.2);
  height: 80%;
  width: 70%;
  margin-top: 5%;
  display: inline-block;
  border-radius: 25px;
  padding: 20px;

}

h4 {
  font-family: 'Exo', sans-serif;
  font-size: 40px;
}

body {
  font-family: 'Exo', sans-serif;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100%;
  margin-top: -4.5%;

}


</style>
