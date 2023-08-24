import { button } from "./dom/button.js";
import { domElement} from "./dom/dom-element.js";

const paragraphPrompt = domElement(document.querySelector("p"));
const startButton = button(document.querySelector("button"));

const hideParagraphPromptAndRemoveStartButton = () =>
{
    paragraphPrompt.remove();
    startButton.remove();
};

startButton.addClickEventListener(hideParagraphPromptAndRemoveStartButton);

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
