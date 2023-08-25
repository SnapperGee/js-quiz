import { button } from "./dom/button.js";
import { type AnswerButton, answerButton } from "./dom/create/answer-button.js";
import { domElement} from "./dom/dom-element.js";
import {questions as allQuestions} from "./questions.js";
import { type Answer } from "./quiz/answer.js";
import { Question } from "./quiz/question.js";
import { shuffleArray } from "./util.js";

const questions: readonly Question[] = shuffleArray(allQuestions);

const questionsIterableIterator: IterableIterator<Question> = questions.values();

const paragraphPrompt = domElement(document.querySelector("p"));
const setParagraphPromptText = (aString: string): void  => {paragraphPrompt.textContent = aString; };

const startButtonColumn = document.getElementById("startButtonColumn");
const removeStartButtonColumn = (): void => startButtonColumn?.remove();

const startButton = button(<HTMLButtonElement> document.getElementById("startButton"));

const answerColumns = Object.freeze(Array.from(document.getElementsByClassName("answerColumn")));
const showAnswerColumns = (): void => answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "block" );

const startQuiz = () =>
{
    removeStartButtonColumn();
    showAnswerColumns();
    setQuestionPromptAndAnswers(questionsIterableIterator.next().value);
};

startButton.domElement?.addEventListener("click", startQuiz);

const answerButtonClickEvent = (event: MouseEvent) =>
{
    if (event.target instanceof HTMLButtonElement)
    {
        const clickedAnswerIsCorrect = event.target.dataset.isCorrect === "true";

        if (clickedAnswerIsCorrect)
        {

        }
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
