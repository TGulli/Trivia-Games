<template>
  <div class="area">
    <h1>Welcome to the BEST Vue Trivia Quiz-App </h1>
    <p>Press the button or anywhere on the screen to play</p>

    <h2>
      <span>q</span>
      <span>u</span>
      <span>i</span>
      <span>z</span>
      <br>
      <span>t</span>
      <span>i</span>
      <span>m</span>
      <span>e</span>
    </h2>
    <button class="button">Start game</button>
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import {fetchQuestions} from "@/api/questionsAPI"

export default {
  name: 'StartScreen',
  data() {
    return {
      error: '',
      questions: [],
      homeScreen: ''
    }
  },
  created() {
    fetchQuestions().then(questions => {
      this.questions = questions.results
      console.log(questions)
    }).catch(error => {
      this.error = error.message
      console.error(error.message)
    })
  },
  mounted() {
    document.querySelector('.area').addEventListener("click", () => {
      this.play()
    })
  },
  methods: {
    play: function () {
      this.$router.push("/questions")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');

* {
  margin: 0px;
  padding: 0px;
}

h1 {
  font-size: 50px;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}


.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
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
  position: absolute;
  top: 60%;
  left: 45%;

}


@import url("https://fonts.googleapis.com/css?family=Luckiest+Guy");
/* BODY */
body {
  font-family: 'Exo', sans-serif;
}

::selection {
  background: transparent;
}

/* JUMP */
h2 {
  cursor: default;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  margin: auto;
  display: block;
  text-align: center;
}

h2 span {
  position: relative;
  top: 20px;
  display: inline-block;
  -webkit-animation: bounce 0.3s ease infinite alternate;
  font-size: 80px;
  color: #fff;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
  0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent, 0 8px 0 transparent,
  0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
}

h2 span:nth-child(2) {
  -webkit-animation-delay: 0.1s;
}

h2 span:nth-child(3) {
  -webkit-animation-delay: 0.2s;
}

h2 span:nth-child(4) {
  -webkit-animation-delay: 0.3s;
}

h2 span:nth-child(5) {
  -webkit-animation-delay: 0.4s;
}

h2 span:nth-child(6) {
  -webkit-animation-delay: 0.5s;
}

h2 span:nth-child(7) {
  -webkit-animation-delay: 0.6s;
}

h2 span:nth-child(8) {
  -webkit-animation-delay: 0.2s;
}


/* ANIMATION */
@-webkit-keyframes bounce {
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
    0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc,
    0 50px 25px rgba(0, 0, 0, 0.2);
  }
}
</style>
