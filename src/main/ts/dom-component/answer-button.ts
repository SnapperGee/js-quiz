import { answer, type Answer } from "../quiz/answer.js";

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

export function createAnswerButton(answerText: NonNullable<string>, isCorrect: boolean): HTMLButtonElement;
export function createAnswerButton(answer: NonNullable<Answer>): HTMLButtonElement;
export function createAnswerButton(answerOrText: NonNullable<string | Answer>, isCorrect?: boolean): HTMLButtonElement
{
    let _answer: Answer;

    if (typeof answerOrText === "string")
    {
        if (isCorrect === undefined || isCorrect === null)
        {
            throw new TypeError(`${createAnswerButton.name}: ${isCorrect} is correct.`);
        }

        _answer = answer(answerOrText, isCorrect);
    }
    else
    {
        _answer = answerOrText;
    }

    const buttonHTMLElement = document.createElement("button");

    buttonHTMLElement.setAttribute("type", "button");
    buttonHTMLElement.classList.add(...answerButtonClassList);
    buttonHTMLElement.textContent = _answer.text;
    buttonHTMLElement.dataset.isCorrect = String(_answer.isCorrect);

    return buttonHTMLElement;
}

export default createAnswerButton;
