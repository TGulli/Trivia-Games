# **Trivia Games**
Trivia games is an simple quiz page for quizing. Fetches 10 questions from https://opentdb.com/api, and displayes
questions one by one, and gives the user multiple answer to answers. At the end of the quiz, it is a result page with the score
and the correct answers. The result page also have play again button, if you want to play again.

## Participants
Hiba Benhaida and Thomas Gulli

## Heroku page
https://newquiz-tghb.herokuapp.com/#/

## Technologies
- IntelliJ IDEA
- Javascript
- Vue
- HTML
- Node.js
- CSS
- Heroku

## Files

### router.js
Links the vue components based on the path.

- '/' = Startscreen
- '/questions' = Question page
- '/Results' = Results page

### main.js
Starts the vue app with the given router


### App.vue
Root of the application with style for common component in all pages, as button and background.

### StartScreen.vue
Homepage with a button, where you can click the button, or anywhere else on the page to start the game.


### Questions.vue
The page for all the questions. It controls the questions order, and the answer from user is saved here (For sending the answers to the result page) and gives a new question to the QuestionItem controller.


### QuestionItem.vue
Renders the questions, as well as the question alternatives. It has a button for sending, for moving on to next question.
Sends the answers to the question vue page. When the Questions controller doesn't have more questions, it goes to the result page.

### Result.vue
The last page which shows the questions, what the user has answered and the correct answer.
It also shows a score at the bottom. The user get 10 points on each question that is correct.
It is also a button at the bottom for playing again.

### questionsPI.js
Fetches 10 questions from the api.