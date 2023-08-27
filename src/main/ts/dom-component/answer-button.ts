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

export class AnswerButton
{
    readonly #answer: Answer;
    readonly #HTMLElement: HTMLButtonElement;

    public constructor(answer: NonNullable<Answer>)
    {
        this.#answer = answer;

        const buttonHTMLElement = document.createElement("button");

        buttonHTMLElement.setAttribute("type", "button");
        buttonHTMLElement.classList.add(...answerButtonClassList);
        buttonHTMLElement.textContent = this.#answer.text;
        buttonHTMLElement.dataset.isCorrect = String(this.#answer.isCorrect);

        this.#HTMLElement = buttonHTMLElement;
    }

    public get HTMLElement(): HTMLButtonElement { return this.#HTMLElement; }
}

export function answerButton(answerText: NonNullable<string>, isCorrect: boolean): AnswerButton;
export function answerButton(answer: NonNullable<Answer>): AnswerButton;
export function answerButton(answerOrText: NonNullable<string | Answer>, isCorrect?: boolean): AnswerButton
{
    if (typeof answerOrText === "string")
    {
        if (isCorrect === undefined || isCorrect === null)
        {
            throw new TypeError(`${answerButton.name}: ${isCorrect} is correct.`);
        }

        return new AnswerButton(answer(answerOrText, isCorrect));
    }
    return new AnswerButton(answerOrText);
}
