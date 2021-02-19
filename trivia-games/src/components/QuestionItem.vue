<template>
  <main>
    <h4>Question </h4>
    <h5>{{ decodeHtml(question.question) }}</h5>


    <div v-if="question.type === 'boolean'">
      <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="true"><label
        for="trueAnswer">True</label><br/>
      <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="false"><label for="falseAnswer">False</label><br/>
    </div>

    <div v-if="question.type === 'multiple'">
      <input type="radio" :id="'answer'" name="currentQuestion" v-model="answer"><label
        :for="'answer'">{{ question.correct_answer }}</label><br/>




      <div v-for="(currentAnswer,index) in question.incorrect_answers" v-bind:key="index">
        <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" :value="currentAnswer"><label
          :for="'answer'+index">{{ currentAnswer }}</label><br/>
      </div>
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
    question: {
      type: Object,
    }
  },
  methods: {
    submitAnswer: function () {
      // this.$emit('toParent', this.answer);
      this.$emit('answerFromChild', {answer:this.answer});
    },
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }
}
</script>
<style scoped>

</style>