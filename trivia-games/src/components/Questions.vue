<template>
  <div class="area2">
     
    <div class="container">
      <!-- SHows question number -->
      <h4>Question {{this.currentQuestionIndex +1 }} </h4>
      <div class="questions">
        <!-- calls child component QuestionItem and send to it next question(myquestestion), gets out asnwer from user(answerFromUSer)-->
         <!-- and increment currentQuestionindex with 1-->
        <QuestionItem v-bind:myQuestion="getNextQuestion" v-on:answerFromChild="onClickChild"
                      v-on:increment="currentQuestionIndex++"/>
      </div>

    </div>
  </div>

</template>

<script scope>
//import questionAPI so we can fetch question form api and QuestionItem so we can send and receive data
import {fetchQuestions} from "@/api/questionsAPI";
import QuestionItem from "@/components/QuestionItem"

export default {
  name: 'Questions',
  //Datastucture to save questionsfrom api in questioninside, currentquestionincex(to fetch right question),and a list where we save answers
  //from user
  data() {
    return {
      questionsInside: [{}],
      currentQuestionIndex: 0,
      answerFromUser: [],
    }
  },
  //as the question page runs the first thing it gets is that it fetches answers from the api and sets the results to our data-structure
  created() {
    fetchQuestions().then(s => {
      this.questionsInside = s.results

    })//catch any errors that may come
    .catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  computed: {
    //method will return the next question from our datastructure list using the index and answer-alternatives (answers)
    // as well as wether the answer is of type multiple or boolean
  
    getNextQuestion: function () {
      //if we are at the end of the questions(aka after question 10) we go the method gotoResults()
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
  //component child QuestionItem
  components: {
    QuestionItem
  },
  methods: {
    //
    onClickChild(value) {
      // this method  pushes the user from user to our list
      this.answerFromUser.push(value)
    },
    //We merge the Correct_answer alternative with the not correct ones to a list
    //this way we don't always get the correct answer-altarnative in the same position on the html
    mergeAnswers() {
      let mergedAnswers = []
      //as long as the incorrect answers is not null
      if (this.questionsInside[(this.currentQuestionIndex)].incorrect_answers != null) {
        // we add the alertnatives to a list merged answers
        for (let i = 0; i < this.questionsInside[(this.currentQuestionIndex)].incorrect_answers.length; i++) {
          mergedAnswers.push(this.decodeHtml(this.questionsInside[(this.currentQuestionIndex)].incorrect_answers[i]))
        }
        mergedAnswers.push(this.decodeHtml(this.questionsInside[(this.currentQuestionIndex)].correct_answer))
      }
      //we return a shuffled list of alternatives
      return this.shuffle(mergedAnswers)
    },
    //we create a random shuffled list
    shuffle(array) { 
      const newArray = []

      for (let i = 0; i < array.length; i++) {
        let randomNumber = Math.floor(Math.random() * array.length);
        while (newArray[randomNumber] !== undefined) {
          randomNumber = Math.floor(Math.random() * array.length);
        }
        newArray[randomNumber] = array[i]
      }
      //return the random list
      return newArray;
    },
    //method that creates a list with the question, the users answer and the correct answer , so we can send it to the /results path
    //runs only when all the questions have been answered
   goToResults() {
      const resultQuestion = []
      //create and add to the list
      for (let i = 0; i < this.questionsInside.length; i++) {
        resultQuestion.push({
          question: this.questionsInside[i].question,
          correct_answer: this.questionsInside[i].correct_answer,
          answered: this.answerFromUser[i]
        })
      }
      //push the list  as a parameter with the /results path
      this.$router.push({
        name: 'Results',
        params: {
          resultQuestion: resultQuestion
        }
      })
    },
    //method that parses to remove symbols
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }
}
</script>
<style scope>
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
   color: white;
}

body {
  font-family: 'Exo', sans-serif;
  background: #4e54c8;
  align-items: center;
}

.area2 {
  
  background: #4e54c8;
  width: 100%;
  height: 100vh;
  margin-top: -5%;


}


</style>
