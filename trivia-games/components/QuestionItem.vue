<template>
  <main>
    <div v-if="myQuestion.question === undefined">
      <h5>{{ myQuestion.question }}</h5>

      <div class="question">
        <div v-if="myQuestion.type === 'boolean'">
          <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="True"><label
            for="trueAnswer">True</label><br/>
          <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="False"><label
            for="falseAnswer">False</label><br/>
        </div>


        <div v-if="myQuestion.type === 'multiple'">
          <div v-for="(currentAnswer,index) in myQuestion.answers" v-bind:key="index">
            <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer"
                   :value="currentAnswer"><label
              :for="'answer'+index">{{ currentAnswer }}</label><br/>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h5>Loading questions...</h5>
    </div>


    <button v-on:click="submitAnswer(); $emit('increment')">Answer</button>
  </main>

</template>
<script>
export default {
  data() {
    return {
      answer: ''
    }
  },
  props: {
    myQuestion: {
      type: Object,
    }
  },
  methods: {
    submitAnswer: function () {
      // this.$emit('toParent', this.answer);
      this.$emit('answerFromChild', this.answer);
    }
  }
}
</script>
<style scoped>
h5 {
  font-family: 'Exo', sans-serif;
  margin-top: 5%;
}

.question {
  font-family: 'Exo', sans-serif;
  margin-top: 2%;
}

.question input {
  font-family: 'Exo', sans-serif;
  margin-top: 3%;
  margin-right: 5%;
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
  margin-top: 7%;

}

button:hover {
  background-color: #3e8e41
}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>