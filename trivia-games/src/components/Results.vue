<template>
<div class="results">
    
    <h2 class="result">Results</h2>
    <div>       
        <table class="table">
        <tr class= "tr-header">
            <th>Question</th>
            <th>Your Answer</th>
            <th>The Rigth Answer</th>
        </tr>
        <tr class="tr-content" v-for="value in testObj" :key="value.question">
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
     border: 1px solid black;
    text-align: center; 
  width:80%;
  table-layout: fixed;
  margin-left: 10%;
  margin-top: 11%;
}
body{
  font-family: 'Exo', sans-serif;
    background: #4e54c8;  
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);  
  width: 100%;
  height:100%;  
  margin-top: -4.5%;
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
section{
  margin: 50px;
}
.result{
    font-size: 50px;
    margin-top: 2%;
}
button {
  display: inline-block;
  padding: 15px 25px;
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
  margin-top:170px ;

}

button:hover {background-color: #3e8e41}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
