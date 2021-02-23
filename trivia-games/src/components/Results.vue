<template>
  <div class="results">
     <h4>Results</h4>
    <!-- Check if we have played the game not only jumped directly to the /results page,  -->
    <div v-if="resultQuestion"> 
       <!-- creating a table for the results-->
      <table class="table">
        <tr class="tr-header">
          <th>Question</th>
          <th>Your Answer</th>
          <th>The Right Answer</th>
        </tr>
         <!-- looping through all users answers and outputting them -->
        <tr class ="tr-content" v-for="value in resultQuestion" :key="value.question">
          <td> {{ value.question }}</td>
          <td> {{ value.answered }}</td>
          <td> {{ value.correct_answer }}</td>

        </tr>
      </table>
      <!-- run calculate score methos that gives the score user got -->
      <h3>Score : {{ calculateScore() }} </h3>
     
       
    </div>
     <!-- If user haven't played the game we show a message -->
    <div v-else>
      <h4>No results to show. Please play the game first.</h4>
    </div>

     <!-- If user clicks this button then newgame method takes them back to the questions page with new questions -->
    <button class="newGame" v-on:click="newGame()">Play again</button>

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
  
  methods: {
    //Method newGame will start the /question path page again
    newGame: function () {
      this.$router.push("/questions")
    },
    // method calulatescore checks for each element of the list and compares users answer with the correct answer
    //if they are the same(aka user gets points) we add 10 til his scoreUser(user gets 10 points for each correct answer)
    calculateScore() {
      console.log(this.resultQuestion)
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  }
/* results is the entire div and it gives color and width and height*/
.results{
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
   width: 100%;
  height: 100vh;
  display:table-cell;
  
}
body{
  align-content: center;
}
h3{
  color: white;
}
h4{
  color:white;
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
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.1);
}
 /* Button features, shadow, and text decorations*/
.newGame {
  display: inline-block;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
  

}
 /* changing colour when you haver over button*/
.newGame:hover {
  background-color: #3e8e41
}
 /* if you press the button it sinks 4 pickes(giving illusion of pressed button)*/
.newGame:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
