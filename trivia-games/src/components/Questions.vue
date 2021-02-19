<template>
<div class="questions">
    <h4>Questions</h4>
    <h5>{{question}}</h5>
<!--    <div v-if="question" class="card-text alert alert-warning" v-html="question"></div>-->
    {{getMagicQuestion}}

<!--  <ul>-->
<!--    <li v-for="question of questions" :key="question.id">-->
<!--      {{ question.question }}-->
<!--    </li>-->
<!--  </ul>-->
</div>
</template>

<script>
// import question from "@/components/StartScreen";
// import StartScreen from "@/components/StartScreen";

export default {
  name: 'Questions',
  props: ['question'],
  data() {
    return {
      myQuestion: {},
      testQuestion: String
    }
  },
  computed: {
    getMagicQuestion(){
      console.log(this.question)
      return this.question
    }
  },
  created() {

    // console.log(StartScreen.methods.getQuestion(this.$route.params.id))
    // console.log(StartScreen.props.question)

    // this.myQuestion = question
  },
  mounted() {
    console.log(this.$parent.question)
    // StartScreen.methods.getQuestion(this.$route.params.id)

    // console.log(StartScreen.methods.getQuestion(this.$route.params.id))
    // this.testQuestion = this.$parent.question
  }
}
</script>

<style>

</style>
