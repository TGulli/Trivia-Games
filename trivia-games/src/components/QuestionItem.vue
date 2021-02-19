<template>
  <main>
    <h4>Question </h4>
    <h5>{{ decodeHtml(myQuestion.question) }}</h5>


    <div v-if="myQuestion.type === 'boolean'">
      <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="true"><label
        for="trueAnswer">True</label><br/>
      <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="false"><label
        for="falseAnswer">False</label><br/>
    </div>


    <div v-if="myQuestion.type === 'multiple'">
      <div v-for="(currentAnswer,index) in myQuestion.answers" v-bind:key="index">
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
    myQuestion: {
      type: Object,
    }
  },
  methods: {
    submitAnswer: function () {
      // this.$emit('toParent', this.answer);
      this.$emit('answerFromChild', {answer: this.answer});
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