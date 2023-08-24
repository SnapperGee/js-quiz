import { button } from "./dom/button.js";
import { type AnswerButton, answerButton } from "./dom/create/answer-button.js";
import { domElement} from "./dom/dom-element.js";
import {questions as allQuestions} from "./questions.js";
import { answer, type Answer } from "./quiz/answer.js";
import { Question } from "./quiz/question.js";

const questions: readonly Question[] = allQuestions;

const paragraphPrompt = domElement(document.querySelector("p"));
const setParagraphPromptText = (aString: string): void  => {paragraphPrompt.textContent = aString};

const startButtonColumn = document.getElementById("startButtonColumn");
const removeStartButtonColumn = (): void => startButtonColumn?.remove();

const startButton = button(<HTMLButtonElement> document.getElementById("startButton"));

const answerColumns = Object.freeze(Array.from(document.getElementsByClassName("answerColumn")));
const showAnswerColumns = (): void => answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "block" );

const startQuiz = () =>
{
    removeStartButtonColumn();
    setQuestionPromptAndAnswers(questions[0]);
    showAnswerColumns();
};

startButton.domElement?.addEventListener("click", startQuiz);

let clickedAnswerButton: EventTarget | null;
const leftAnswerButtonList = document.getElementById("leftAnswerButtonList");
const rightAnswerButtonList = document.getElementById("rightAnswerButtonList");

const clearAnswerLists = (): void => {leftAnswerButtonList!.innerHTML = ""; rightAnswerButtonList!.innerHTML = ""; };

const setAnswerLists = (answers: readonly Answer[]) => {
    const answerButtons: readonly AnswerButton[] = answers.map(answer => {
        const ab = answerButton(answer);

        ab.HTMLElement.addEventListener("click", event =>{
            clickedAnswerButton = event.target;
        });

        return ab;
    });

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

    const answerButtons = question.answers.map(answer => {
        const answerButtonHTMLElement = answerButton(answer);

        answerButtonHTMLElement.HTMLElement.addEventListener("click", event =>{
            clickedAnswerButton = event.target;
        });

        return answerButtonHTMLElement;
    });

    setAnswerLists(question.answers);
};
