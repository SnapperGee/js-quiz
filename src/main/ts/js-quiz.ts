import { button } from "./dom/button.js";
import { domElement} from "./dom/dom-element.js";
import { answer, type Answer } from "./quiz/answer.js";
import { Question } from "./quiz/question.js";

const paragraphPrompt = domElement(document.querySelector("p"));
const startButtonColumn = document.getElementById("startButtonColumn");
const startButton = button(<HTMLButtonElement> document.getElementById("startButton"));
const answerColumns = Object.freeze(Array.from(document.getElementsByClassName("answerColumn")));

const hideParagraphPromptAndRemoveStartButton = () =>
{
    paragraphPrompt.textContent = question1Prompt;
    startButtonColumn?.remove();
    answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "block" );
};

const question1Prompt = "This is the first question";

startButton.addClickEventListener(hideParagraphPromptAndRemoveStartButton);

const question1AnswerOptions: readonly Answer[] = [
    answer("Incorrect answer", false),
    answer("Another incorrect answer", false),
    answer("CORRECT answer", true),
    answer("Third incorrect answer", false)
];

const firstQuestion = new Question(question1Prompt, question1AnswerOptions);











// export class JsQuiz implements IterableIterator<boolean>
// {
//     readonly #arr: readonly boolean[] = [];
//     #iterIndex: number = 0;

//     public next(): IteratorResult<boolean>
//     {
//         if (this.#iterIndex < this.#arr.length)
//         {
//             return { done: false, value: this.#arr[this.#iterIndex++] };
//         }
//         else
//         {
//             this.#iterIndex = 0; // reset the pointer to start for new iterations
//             return { done: true, value: null };
//         }
//     }

//     public [Symbol.iterator](): IterableIterator<boolean>
//     {
//         return this;
//     }
// }
