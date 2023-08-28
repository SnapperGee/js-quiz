import { type AnswerListsController, answerListsController } from "./dom-component/answer-lists-controller.js";
import {questions } from "./questions.js";
import { Question } from "./quiz/question.js";
import { shuffleArray, randomEmoji } from "./util.js";

const questionsIterableIterator: IterableIterator<Question> = shuffleArray(questions).values();

const promptParagraph = document.getElementById("promptParagraph");

const startButtonColumn = document.getElementById("startButtonColumn");

const startButton = document.getElementById("startButton");

const answerColumns = Object.freeze(Array.from(document.getElementsByClassName("answerColumn")));

const correctIncorrectMessageRow = <HTMLDivElement> document.getElementById("correctIncorrectMessageRow");
const correctOrIncorrectText = <HTMLSpanElement> document.getElementById("correctOrIncorrectText");
const correctOrIncorrectEmoji = <HTMLSpanElement> document.getElementById("correctOrIncorrectEmoji");

const startQuiz = () =>
{
    startButtonColumn!.style.display = "none";
    answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "block" );
    setQuestionPromptAndAnswers(questionsIterableIterator.next().value);
};

startButton!.addEventListener("click", startQuiz);

let correctIncorrectMsgTimeout: number;

const answerButtonClickEvent = (event: MouseEvent) =>
{
    if (event.target instanceof HTMLButtonElement)
    {
        const clickedAnswerIsCorrect = event.target.dataset.isCorrect === "true";

        if (clickedAnswerIsCorrect)
        {
            correctOrIncorrectText.textContent = "Correct!";
            correctOrIncorrectEmoji.textContent = randomEmoji.positive();
        }
        else
        {
            correctOrIncorrectText.textContent = "Incorrect...";
            correctOrIncorrectEmoji.textContent = randomEmoji.negative();
        }

        correctIncorrectMessageRow.style.display = "block";
        clearTimeout(correctIncorrectMsgTimeout);

        correctIncorrectMsgTimeout = setTimeout(() =>
        {
            correctIncorrectMessageRow.style.display = "none";
        },
        1500);
    }

    const nextQuestion: IteratorResult<Question> = questionsIterableIterator.next();

    if (nextQuestion?.value !== undefined)
    {
        setQuestionPromptAndAnswers(nextQuestion.value);
    }
    else
    {
        console.log("\n".repeat(4) + "TEST DOES NOT HAVE MORE QUESTIONS" + "\n".repeat(4));
    }
};

const leftAnswerButtonList = document.getElementById("leftAnswerButtonList");
const rightAnswerButtonList = document.getElementById("rightAnswerButtonList");

const answerLists: AnswerListsController = answerListsController(leftAnswerButtonList, rightAnswerButtonList, answerButtonClickEvent);

const setQuestionPromptAndAnswers = (question: Question) =>
{
    promptParagraph!.textContent = question.promptText;
    answerLists.overwriteAnswerListItems(question.answers);
};
