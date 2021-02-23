<template>
  <div class="results">

    <!-- Check if we have played the game not only jumped directly to the /results page,  -->
    <h1>Results</h1>
    <div v-if="resultQuestion">
      <!-- creating a table for the results-->
      <table class="table">
        <tr class="tr-header">
          <th>Question</th>
          <th>Your Answer</th>
          <th>The Right Answer</th>
        </tr>
        <!-- looping through all users answers and outputting them -->
        <tr class="tr-content" v-for="value in resultQuestion" :key="value.question">
          <td> {{ value.question }}</td>
          <td> {{ value.answered }}</td>
          <td> {{ value.correct_answer }}</td>
        </tr>
      </table>

      <!-- run calculate score methods that gives the score user got -->
      <h3>Score : {{ calculateScore() }} </h3>
    </div>
    <!-- If user haven't played the game we show a message -->
    <div v-else>
      <h4>No results to show. Please play the game first.</h4>
    </div>

    <!-- If user clicks this button then newgame method takes them back to the questions page with new questions -->
    <button class="button resultButton" v-on:click="newGame()">Play again</button>

  </div>
</template>

<script>
export default {
  name: 'Questions',
  //we send the results as an array from the questions vue
  props: {
    resultQuestion: {
      type: Array,
    }
  },
  mounted() {
  },
  methods: {
    //Method newGame will start the /question path page again
    newGame: function () {
      this.$router.push("/questions")
    },
    // method calculateScore checks for each element of the list and compares users answer with the correct answer
    //if they are the same(aka user gets points) we add 10 til his scoreUser(user gets 10 points for each correct answer)
    calculateScore() {
      let finalScore = 100
      let scoreUser = 0
      this.resultQuestion.forEach(element => {
        if (element.correct_answer === element.answered) {
          scoreUser = +scoreUser + +10
        }
      })

      //we return the users score  and the total score
      return scoreUser + "/" + finalScore
    }
  }


}
</script>
<style>

/* results is the entire div and it gives color and width and height*/

body{
  align-content: center;
  background: #4e54c8;
}

/* giving the table colours, layout, and position the different parts from eachother*/
.table{
  border: 1px solid black;
  text-align: center;
  width:80%;
  table-layout:fixed;
  margin-left: 10%;
  margin-top: 3%;
}
.tr-header{
  background-color: rgba(255,255,255,0.3);
}
.tr-content{
  height:30px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 12px;
  border-bottom: solid 1px rgba(255,255,255,0.1);
}
.resultButton{
  margin-top: 6%;
}
</style>
