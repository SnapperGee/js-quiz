import { type AnswerListsController, answerListsController } from "./dom-component/answer-lists-controller.js";
import {questions as allQuestions} from "./questions.js";
import { Question } from "./quiz/question.js";
import { shuffleArray, timedElementHider, randomEmoji } from "./util.js";

const questions: readonly Question[] = shuffleArray(allQuestions);

const questionsIterableIterator: IterableIterator<Question> = questions.values();

const paragraphPrompt = document.querySelector("p");
const setParagraphPromptText = (aString: string): void  => {paragraphPrompt!.textContent = aString; };

const startButtonColumn = document.getElementById("startButtonColumn");
const removeStartButtonColumn = (): void => startButtonColumn?.remove();

const startButton = <HTMLButtonElement> document.getElementById("startButton");

const answerColumns = Object.freeze(Array.from(document.getElementsByClassName("answerColumn")));
const showAnswerColumns = (): void => answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "block" );

const correctIncorrectMessageRow = <HTMLDivElement> document.getElementById("correctIncorrectMessageRow");
const correctOrIncorrectText = <HTMLSpanElement> document.getElementById("correctOrIncorrectText");
const correctOrIncorrectEmoji = <HTMLSpanElement> document.getElementById("correctOrIncorrectEmoji");

const showCorrectIncorrectMessage = (): void =>
{
    correctIncorrectMessageRow.style.display = "block";
};

const setCorrectOrIncorrectText = (aString: string): void =>
{
    correctOrIncorrectText.textContent = "";
    correctOrIncorrectText.textContent = aString;
};

const setCorrectOrIncorrectEmoji = (aString: string): void =>
{
    correctOrIncorrectEmoji.textContent = "";
    correctOrIncorrectEmoji.textContent = aString;
};

const startQuiz = () =>
{
    removeStartButtonColumn();
    showAnswerColumns();
    setQuestionPromptAndAnswers(questionsIterableIterator.next().value);
};

startButton.addEventListener("click", startQuiz);

const answerButtonClickEvent = (event: MouseEvent) =>
{
    if (event.target instanceof HTMLButtonElement)
    {
        const clickedAnswerIsCorrect = event.target.dataset.isCorrect === "true";

        if (clickedAnswerIsCorrect)
        {
            setCorrectOrIncorrectText("Correct!");
            setCorrectOrIncorrectEmoji(randomEmoji.positive());
        }
        else
        {
            setCorrectOrIncorrectText("Incorrect...");
            setCorrectOrIncorrectEmoji(randomEmoji.negative());
        }

        showCorrectIncorrectMessage();
        timedElementHider(correctIncorrectMessageRow, 4);
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
    setParagraphPromptText(question.promptText);
    answerLists.overwriteAnswerListItems(question.answers);
};
