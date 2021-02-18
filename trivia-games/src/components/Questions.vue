<template>
<div class="questions">
    <h4>Questions</h4>
    <h5>{{question}}</h5>
</div>
</template>

<script>
import StartScreen from "@/components/StartScreen.vue"

export default {
  name: 'Questions',
  data() {
    return {
      question: StartScreen.data().questions
    }
  },
  mounted() {
    console.log(this.question)
  }

}
</script>

<style>

</style>
