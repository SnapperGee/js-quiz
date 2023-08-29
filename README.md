# JavaScript Quiz

Web app that presents a timed quiz on JavaScript fundamentals to the user.

## Structure

The `src/main` directory is the root that contains all the source code used by
this project.

### HTML

The `src/main?html` directory contains only a single file as this is a single paged
application. This single html file is placed in the root of the outputted build
file since it is the single entry point of this web app.

### ts root directory

The [`src/main/ts`][ts root directory] directory contains the following files (plus a file exporting utility scripts
that isn't referenced here).

- [`js-quiz.ts`][js-quiz.ts]

  This file contains the root script that is executed in the `index.html` entry point of this web app.

- [`questions.ts`][questions.ts]

  This file contains the pre-created question objects that the quiz contains when it's executed. To add more questions
  to the quiz, simply add a [`Question` object][question.ts] to the exported `questions` array that this file exports.

### ts/quiz directory

The [`src/main/ts/quiz`][ts quiz directory] directory contains the TypeScript classes used to model a quiz question.

- [`question.ts`][question.ts]

  This file contains the model for a quiz questions. This class contains 2 properties:

  1. `promptText` which is the text of the question asked to the user.
  1. `answers` which is an array of [`answer`][answer.ts] objects that the user can pick from when answering the question
     prompt text.

- [`answer.ts`][answer.ts]

  This file contains the model for the answers of a quiz question. The class this file exports is used by the
  [`Question`][question.ts] class as one of its properties (is a dependent via composition). This class contains
  2 properties:

  1. `text` which is the text string of the answer. What the user will see when selecting this answer.
  1. `isCorrect` which is a boolean indicating whether this answer is correct or not.

### ts/dom-component directory

The [`src/main/ts/dom-component`][ts dom-component directory] directory contains the controller for dom object that contains
the lists of answers and the function used to create an HTML answer button.

- [`answer-lists-controller.ts`][answer-lists-controller.ts]

  This class is the controller for the answer button lists. The answer button lists are the 2 lists of buttons that contain
  the answers the user can select for each question. This class contains 3 public properties and 1 method:

  1. `leftList` is the left unordered list element that contains the buttons a user can click to select an answer for a
     question.

  1. `rightList` is the right unordered list element that contains the buttons a user can click to select an answer for a
     question.

  1. `buttonClickEvent` is the click event that gets applied to each of the list item answer buttons objects of this class
     generate.

  1. The `overwriteAnswerListItems(readonly Answer[])` method takes the provided [answer][answer.ts] objects and applies
     them as clickable HTML button list item elements evenly distributed between its left and right list properties.

- [`create-answer-button.ts`][create-answer-button.ts]

  This class contains the type used to define the button click event function that can be added as an event listener to
  created HTML buttons and the function used to create HTML button elements used for answers to the quiz.

### scss root directory

The [`./src/main/scss`][scss directory] directory contains the single scss file compiled to this web app's css. It contains the source code used to hide elements by default and apply some minor custom styling.

## TODO

- The main [js-quiz.ts][js-quiz.ts] file currently contains too much functionality and needs to be further refactored and
  broken up into smaller individual components.
- Make the option to try the quiz again presented to the user when giving the option to save a score as opposed to after
  saving a score.
- Whenever the quiz is completed, display the high scores to the user.

[ts root directory]: ./src/main/ts "typescript source root directory"
[ts quiz directory]: ./src/main/ts/quiz "typescript source quiz directory"
[ts dom-component directory]: ./src/main/ts/dom-component "typescript source dom-component directory"
[scss directory]: ./src/main/scss "sass directory"
[js-quiz.ts]: ./src/main/ts/js-quiz.ts "js-quiz.ts file"
[questions.ts]: ./src/main/ts/questions.ts "questions.ts file"
[question.ts]: ./src/main/ts/quiz/question.ts "question.ts file"
[answer.ts]: ./src/main/ts/quiz/answer.ts "answer.ts file"
[answer-lists-controller.ts]: ./src/main/ts/dom-component/answer-lists-controller.ts "answer-lists-controller.ts file"
[create-answer-button.ts]: ./src/main/ts/dom-component/create-answer-button.ts "create-answer-button.ts file"
