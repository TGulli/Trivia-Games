<template>
  <main>
    <!--  Prints the question if finished loading, else print loading  -->
    <h3 v-if="!loading">{{ oneQuestion.question }}</h3>
    <h3 v-else>Loading question</h3>

    <!-- if the question is of type boolean -->
    <div class="question">
      <div v-if="oneQuestion.type === 'boolean'">
        <!-- we create to radio inputs one true and one false -->
        <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="True" checked="false"><label
          for="trueAnswer">True</label><br/>
        <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="False" checked="false"><label
          for="falseAnswer">False</label><br/>
      </div>

      <!-- but if the type is of multiple -->
      <div v-if="oneQuestion.type === 'multiple'">
        <!-- we run through allt he alternatives creating a input for each one -->
        <div v-for="(currentAnswer,index) in oneQuestion.answers" v-bind:key="index">
          <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer"
                 :value="currentAnswer"><label
            :for="'answer'+index">{{ currentAnswer }}</label><br/>
        </div>
      </div>
    </div>

    <!-- button to submit answer that will inrement the currentquestionindex and send the answer to questions parent(submitAnswer())-->
    <button v-on:click="submitAnswer()">Answer</button>
  </main>
</template>
<script>


export default {
  //Data structure where we push the answer chosen by user, and a boolean that is true if the question is not loaded yet.
  data() {
    return {
      answer: '',
      loading: true
    }
  },
  // THis is the question we get from Questions parent
  props: {
    oneQuestion: {
      type: Object,
    }
  },
  updated() {
    if (this.oneQuestion.question !== undefined) {
      this.loading = false
    }
  },
  methods: {
    //Method submit answer send the answer to questions parent
    submitAnswer: function () {
      if (this.answer !== '') { // If the user has answered, else do nothing
        this.$emit('increment')
        this.$emit('answerFromChild', this.answer);
        this.answer = ''
      }
    }
  }
}

</script>
<style scoped>
h3 {
  margin-top: 5%;
  margin-bottom: 3%;

}

.question {
  text-align: left;
  width: 40%;
  margin: auto;
}

.question input {
  margin-top: 3%;
  margin-right: 5%;
}
</style>