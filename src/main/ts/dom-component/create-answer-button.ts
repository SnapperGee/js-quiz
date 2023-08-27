import { answer, type Answer } from "../quiz/answer.js";

export type HTMLButtonElementClickEvent = (this: HTMLButtonElement, mouseEvent: MouseEvent) => unknown;

const answerButtonClassList: readonly string[] = Object.freeze([
    "btn",
    "btn-primary",
    "btn-lg",
    "shadow",
    "fs-3",
    "fw-bold",
    "text-nowrap",
    "button",
    "answerButton"
]);

export function createAnswerButton(answerText: NonNullable<string>, isCorrect: boolean, clickEventFunction?: HTMLButtonElementClickEvent): HTMLButtonElement;
export function createAnswerButton(answer: NonNullable<Answer>, clickEventFunction?: HTMLButtonElementClickEvent): HTMLButtonElement;
export function createAnswerButton(answerOrText: NonNullable<string | Answer>, isCorrectOrClickEventFunction?: boolean | HTMLButtonElementClickEvent, clickEventFunction?: HTMLButtonElementClickEvent): HTMLButtonElement
{
    let _answer: Answer;
    let _clickEventFunction: HTMLButtonElementClickEvent | undefined;

    if (typeof answerOrText === "string")
    {
        if (isCorrectOrClickEventFunction === undefined || isCorrectOrClickEventFunction === null)
        {
            throw new TypeError(`${createAnswerButton.name}: ${isCorrectOrClickEventFunction} isCorrect.`);
        }

        if (typeof isCorrectOrClickEventFunction !== "boolean")
        {
            throw new TypeError(`${createAnswerButton.name}: boolean expected for isCorrect, but "${isCorrectOrClickEventFunction}" passed instead.`);
        }

        _answer = answer(answerOrText, isCorrectOrClickEventFunction);
        _clickEventFunction = clickEventFunction;
    }
    else
    {
        if (isCorrectOrClickEventFunction !== undefined && isCorrectOrClickEventFunction !== null && typeof isCorrectOrClickEventFunction !== "function")
        {
            throw new TypeError(`${createAnswerButton.name}: function expected for clickE, but "${isCorrectOrClickEventFunction}" passed instead.`);
        }

        _answer = answerOrText;
        _clickEventFunction = isCorrectOrClickEventFunction;
    }

    const buttonHTMLElement = document.createElement("button");

    buttonHTMLElement.setAttribute("type", "button");
    buttonHTMLElement.classList.add(...answerButtonClassList);
    buttonHTMLElement.textContent = _answer.text;
    buttonHTMLElement.dataset.isCorrect = String(_answer.isCorrect);

    if (_clickEventFunction !== undefined && _clickEventFunction !== null)
    {
        buttonHTMLElement.addEventListener("click", _clickEventFunction);
    }

    return buttonHTMLElement;
}

export default createAnswerButton;
