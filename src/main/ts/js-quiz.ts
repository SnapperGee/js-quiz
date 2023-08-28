import { type AnswerListsController, answerListsController } from "./dom-component/answer-lists-controller.js";
import {questions } from "./questions.js";
import { Question } from "./quiz/question.js";
import { convertMsToSeconds, randomEmoji, shuffleArray } from "./util.js";

// The quiz questions (question prompt and its answers) to shuffle and iterate through
const questionsIterableIterator: IterableIterator<Question> = shuffleArray(questions).values();

// Paragraph DOM element to display quiz question to
const promptParagraph = document.getElementById("promptParagraph");

// Column that contains start button. Gets hidden when quiz starts
const startButtonColumn = document.getElementById("startButtonColumn");

// Start button that starts quiz timer and displays first question
const startButton = document.getElementById("startButton");

// The left and right columns of buttons corresponding to the quiz question answers
const answerColumns = Object.freeze(Array.from(document.getElementsByClassName("answerColumn")));

// Row containing paragraph to display status of whether answer is correct or incorrect
const correctIncorrectMessageRow = document.getElementById("correctIncorrectMessageRow");

// The alpha text portion of paragraph to display status of whether answer is correct or incorrect
const correctOrIncorrectText = document.getElementById("correctOrIncorrectText");

// The emoji portion of paragraph to display status of whether answer is correct or incorrect
const correctOrIncorrectEmoji = document.getElementById("correctOrIncorrectEmoji");

// The div containing the paragraph containing the quiz timer text
const timerContainer = document.getElementById("timerContainer");

// The paragraph containing the quiz timer text
const timerParagraph = document.getElementById("timerParagraph");

// Variable to hold the numeric value of the quiz timer. Gives 5 seconds per question
let totalQuizTime = 1000 * 5 * questions.length;

// Set the timer text to the init quiz time
timerParagraph!.textContent = convertMsToSeconds(totalQuizTime);

// Function to call when start quiz button is clicked
const startQuiz = () =>
{
    // Hide entire start button colum
    startButtonColumn!.style.display = "none";

    // Set the question prompt paragraph text and create buttons for each question answer
    setQuestionPromptAndAnswers(questionsIterableIterator.next().value);

    // Display answer button columns to replace hidden start button column
    answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "block" );

    // Display quiz timer
    timerContainer!.style.display = "block";

};

startButton!.addEventListener("click", startQuiz);

// Timer used to hide row that displays correct or incorrect status of answered question
let correctIncorrectMsgTimeout: number;

// Function to bind as click event to each answer button
const answerButtonClickEvent = (event: MouseEvent) =>
{
    if (event.target instanceof HTMLButtonElement)
    {
        // Get boolean indicating whether correct answer button was clicked or not
        const clickedAnswerIsCorrect = event.target.dataset.isCorrect === "true";

        // Clicked answer button is correct set correct answer message
        if (clickedAnswerIsCorrect)
        {
            correctOrIncorrectText!.textContent = "Correct!";
            correctOrIncorrectEmoji!.textContent = randomEmoji.positive();
        }
        // Clicked answer button is incorrect set incorrect answer message
        else
        {
            correctOrIncorrectText!.textContent = "Incorrect...";
            correctOrIncorrectEmoji!.textContent = randomEmoji.negative();
        }

        // Display correct/incorrect answer message for 1.5 seconds
        correctIncorrectMessageRow!.style.display = "block";
        clearTimeout(correctIncorrectMsgTimeout);
        correctIncorrectMsgTimeout = setTimeout(() =>
        {
            correctIncorrectMessageRow!.style.display = "none";
        },
        1500);
    }

    // Get next question to generate question prompt and answer buttons from
    const nextQuestion: IteratorResult<Question> = questionsIterableIterator.next();

    // If there's another question left
    if (nextQuestion?.value !== undefined)
    {
        setQuestionPromptAndAnswers(nextQuestion.value);
    }
    // If there are no questions left
    else
    {
        console.log("\n".repeat(4) + "TEST DOES NOT HAVE MORE QUESTIONS" + "\n".repeat(4));
    }
};

// List of answer buttons from left column
const leftAnswerButtonList = document.getElementById("leftAnswerButtonList");

// List of answer buttons from right column
const rightAnswerButtonList = document.getElementById("rightAnswerButtonList");

// Create object to overwrite answer buttons in answer button lists
const answerLists: AnswerListsController = answerListsController( leftAnswerButtonList,
                                                                  rightAnswerButtonList,
                                                                  answerButtonClickEvent );

// Uses a question object to set the question prompt paragraph text and to generate answer buttons
const setQuestionPromptAndAnswers = (question: Question) =>
{
    promptParagraph!.textContent = question.promptText;
    answerLists.overwriteAnswerListItems(question.answers);
};
