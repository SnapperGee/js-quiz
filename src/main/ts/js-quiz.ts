import { type AnswerButton, answerButton } from "./dom/answer-button.js";
import {questions as allQuestions} from "./questions.js";
import { type Answer } from "./quiz/answer.js";
import { Question } from "./quiz/question.js";
import { shuffleArray, timedElementHider } from "./util.js";
import { randomPositiveEmoji, randomNegativeEmoji } from "./dom/correct-incorrect-message.js";

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
            setCorrectOrIncorrectEmoji(randomPositiveEmoji());
            showCorrectIncorrectMessage();
        }
        else
        {
            setCorrectOrIncorrectText("Incorrect...");
            setCorrectOrIncorrectEmoji(randomNegativeEmoji());
            showCorrectIncorrectMessage();
        }

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

const clearAnswerLists = (): void => {leftAnswerButtonList!.innerHTML = ""; rightAnswerButtonList!.innerHTML = ""; };

const clearAndSetAnswerLists = (answers: readonly Answer[]) => {
    const answerButtons: readonly AnswerButton[] = shuffleArray(answers.map(answer => {
        const ab = answerButton(answer);

        ab.HTMLElement.addEventListener("click", answerButtonClickEvent);

        return ab;
    }));

    const answerButtonListItems: {left: DocumentFragment, right: DocumentFragment} = answerButtons.reduce(
        (fragment, answerButton, index) => {
            const answerButtonListItem = document.createElement("li");
            answerButtonListItem.appendChild(answerButton.HTMLElement);

            if (index % 2 === 0) { fragment.left.appendChild(answerButtonListItem); }
            else {fragment.right.appendChild(answerButtonListItem); }

            return fragment;
        },
        {left: document.createDocumentFragment(), right: document.createDocumentFragment()}
    );

    clearAnswerLists();

    leftAnswerButtonList?.appendChild(answerButtonListItems.left);
    rightAnswerButtonList?.appendChild(answerButtonListItems.right);
};

const setQuestionPromptAndAnswers = (question: Question) =>
{
    setParagraphPromptText(question.promptText);
    clearAndSetAnswerLists(question.answers);
};
