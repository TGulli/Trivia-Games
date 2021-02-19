<template>
<div class="results">
    
    <h2>Results</h2>
    <div>       
        <table class="table">
        <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>The Rigth Answer</th>
        </tr>
        <tr v-for="value in testObj" :key="value.question">
            <td> {{ value.question }}</td>
            <td> {{ value.answered }}</td>
            <td> {{ value.correct_answer }}</td>
            
        </tr>
        </table>
    </div>
    
    <h4 >Score : {{calculateScore()}}  </h4>

    <router-link to="/questions" tag="button">Play Again</router-link>
    
</div>
</template>

<script>
export default {
     name: 'Questions',
  data() {
    return { testObj : [ {question: "Monday", correct_answer: "true", answered: "false"},
{question: "Tuesday", correct_answer: "true", answered: "false"},
{question: "Wednesday", correct_answer: "false", answered: "false"},
{question: "Thursday?", correct_answer: "false", answered: "false"},
{question: "Friday?", correct_answer: "true", answered: "false"},
{question: "Saturday?", correct_answer: "false", answered: "false"},
{question: "Sunday?", correct_answer: "true", answered: "false"}]
    }
  },
   mounted() {
  },
  methods:{
      calculateScore(){
          let finalScore=100
          let scoreUser=0
          this.testObj.forEach(element => {
              if(element.correct_answer === element.answered){
                  scoreUser= +scoreUser + +10
              }
          });

          return scoreUser+"/"+ finalScore
      }
  }
    

}
</script>

<style>
.table{
    text-align: center;
}
</style>
