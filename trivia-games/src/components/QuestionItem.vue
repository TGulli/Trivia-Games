<template>
<main>
       <h4>Question </h4>
    <h5>{{question}}</h5>


  <div v-if="question.type === 'boolean'">
    <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="t"><label for="trueAnswer">True</label><br/>
    <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="f"><label for="falseAnswer">False</label><br/>
  </div>

  <div v-if="question.type === 'multiple'">
      <input type="radio" :id="'answer'" name="currentQuestion" v-model="answer"><label :for="'answer'">{{question.correct_answer}}</label><br/>
      <div v-for="(answers,index) in question.incorrect_answers" v-bind:key="index">
        <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" ><label :for="'answer'+index">{{answers}}</label><br/>
      </div>
   </div>

 <button @click="submitAnswer" >Answer</button>
</main>

</template>
<script>
export default {
    data() {
     return {
       answer:''
     }
    },
    props:{ question:{
        type: Object
    }},
    methods:{
		submitAnswer:function() {
			this.$emit('answer', {answer:this.answer});
      this.answer = null;
      this.correctAnswer = null;
		} }

    
}
</script>
<style scoped>

</style>