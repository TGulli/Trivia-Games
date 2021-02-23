<template>
  <main>
      <h5>{{ myQuestion.question }}</h5>
      <!-- if the question is of type boolean -->
      <div class="question">
        <div v-if="myQuestion.type === 'boolean'">
          <!-- we create to radio inputs one true and one false -->
          <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="True"><label
            for="trueAnswer">True</label><br/>
          <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="False"><label
            for="falseAnswer">False</label><br/>
        </div>

        <!-- but if the type is of multiple -->
        <div v-if="myQuestion.type === 'multiple'">
          <!-- we run through allt he alternatives creating a input for each one -->
          <div v-for="(currentAnswer,index) in myQuestion.answers" v-bind:key="index">
            <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer"
                   :value="currentAnswer"><label
              :for="'answer'+index">{{ currentAnswer }}</label><br/>
          </div>
        </div>
      </div>

    <!-- button to submit answer that will inrement the currentquestionindex and send the answer to questions parent(submitAnswer())-->
    <button class="button1" v-on:click="submitAnswer(); $emit('increment')">Answer</button>
  </main>

</template>
<script>
export default {
  //Data stucture where we push the answer chosen by user
  data() {
    return {
      answer: ''
    }
  },
  // THis is the question we get from Questions parent
  props: {
    myQuestion: {
      type: Object,
    }
  },
  methods: {
    //Methos submit answer send the answer to questions parent
    submitAnswer: function () {
      this.$emit('answerFromChild', this.answer);
    }
  }
}
</script>
<style scoped>
h5 {
  font-family: 'Exo', sans-serif;
  margin-top: 5%;
  color: white;
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

.button1 {
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

.button1:hover {
  background-color: #3e8e41
}

.button1:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>