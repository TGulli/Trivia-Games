<template>
  <div class="area">
    <div class="container">
      <!-- Shows question number -->
      <h1>Question {{this.currentQuestionIndex +1 }} </h1>
      <div class="questions">
        <!-- calls child component QuestionItem and send to it next question(oneQuestion), gets out answer from user(answerFromUSer)-->
        <!-- and increment currentQuestionindex with 1-->
        <QuestionItem v-bind:oneQuestion="getNextQuestion" v-on:answerFromChild="onClickChild"
                      v-on:increment="currentQuestionIndex++"/>
      </div>
    </div>
    <br>
    <button class="button backButton" v-on:click="newGame()">Play again</button>
  </div>

</template>

<script>
//import questionAPI so we can fetch question form api and QuestionItem so we can send and receive data
import {fetchQuestions} from "@/api/questionsAPI";
import QuestionItem from "@/components/QuestionItem"

export default {
  name: 'Questions',
  // Datastructure to save questionsfrom api in questionArray, currentquestionincex(to fetch right question),and a list where we save answers
  // from user
  data() {
    return {
      questionArray: [{}],
      currentQuestionIndex: 0,
      answerFromUser: [],
    }
  },
  //as the question page runs the first thing it gets is that it fetches answers from the api and sets the results to our data-structure
  created() {
    fetchQuestions().then(s => {
      this.questionArray = s.results
    }).catch(error => {
      console.error(error.message)
    })
  },
  //method will return the next question from our data structure list, using the index and answer-alternatives (answers)
  // as well as the answer is of type multiple or boolean
  computed: {
    // if we are at the end of the questions(aka after question 10) we go the method gotoResults()
    getNextQuestion: function () {
      if (this.currentQuestionIndex === this.questionArray.length) {
        this.goToResults()
        return null
      }
      return {
        question: this.decodeHtml(this.questionArray[(this.currentQuestionIndex)].question),
        answers: this.mergeAnswers(),
        type: this.questionArray[(this.currentQuestionIndex)].type
      }
    }
  },
  //component child QuestionItem
  components: {
    QuestionItem
  },
  methods: {
    // this method pushes the user answer from user to our list
    onClickChild(value) {
      this.answerFromUser.push(value)
    },
    //We merge the Correct_answer alternative with the not correct ones to a list
    //this way we don't always get the correct answer-alternative in the same position on the html
    mergeAnswers() {
      let mergedAnswers = []
      //as long as the incorrect answers is not null
      if (this.questionArray[(this.currentQuestionIndex)].incorrect_answers != null) {
        // we add the alternatives to the list
        for (let i = 0; i < this.questionArray[(this.currentQuestionIndex)].incorrect_answers.length; i++) {
          mergedAnswers.push(this.decodeHtml(this.questionArray[(this.currentQuestionIndex)].incorrect_answers[i]))
        }
        mergedAnswers.push(this.decodeHtml(this.questionArray[(this.currentQuestionIndex)].correct_answer))
      }

      //we return a randomized list of alternatives
      return this.randomize(mergedAnswers)
    },
    // Returns a new array with the array from parameter
    randomize(array) {
      const newArray = [] // new array with the items randomy placed

      for (let i = 0; i < array.length; i++) {
        let randomNumber = Math.floor(Math.random() * array.length); // Random number between 0 and array.length-1

        // Generates new random number until we find a index that is not used
        while (newArray[randomNumber] !== undefined) {
          randomNumber = Math.floor(Math.random() * array.length);
        }
        newArray[randomNumber] = array[i]
      }
      return newArray;
    },
    // Method that creates a list with the question, the users answer and the correct answer
    // Then we can send it to the /results path
    // Runs only when all the questions have been answered
    goToResults() {
      const resultQuestion = []
      for (let i = 0; i < this.questionArray.length; i++) {
        resultQuestion.push({
          question: this.decodeHtml(this.questionArray[i].question),
          correct_answer: this.questionArray[i].correct_answer,
          answered: this.answerFromUser[i]
        })
      }

      this.$router.push({
        name: 'Results',
        params: {
          resultQuestion: resultQuestion
        }
      })
    },
    //method that parsing the string for html
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    newGame: function () {
      this.$router.push("/")
    },
  }
}
</script>
<style>
.backButton{
  margin-top: 6%;
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
</style>
