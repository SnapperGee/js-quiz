import { type Answer } from "../quiz/answer.js";
import { shuffleArray } from "../util.js";
import { createAnswerButton, HTMLButtonElementClickEvent } from "./create-answer-button.js";

export class AnswerListsController
{
    readonly #leftList: HTMLUListElement;
    readonly #rightList: HTMLUListElement;
    readonly #buttonClickEvent: HTMLButtonElementClickEvent | undefined;

    public constructor(leftList: NonNullable<HTMLUListElement>, rightList: NonNullable<HTMLUListElement>, buttonClickEvent?: HTMLButtonElementClickEvent)
    {
        if (leftList === undefined || leftList === null)
        {
            throw new TypeError(`${new.target.name}: ${leftList} left list.`);
        }

        if (rightList === undefined || rightList === null)
        {
            throw new TypeError(`${new.target.name}: ${rightList} right list.`);
        }

        this.#leftList = leftList;
        this.#rightList = rightList;
        this.#buttonClickEvent = buttonClickEvent;
    }

    public get leftList(): HTMLUListElement { return this.#leftList; }
    public get rightList(): HTMLUListElement { return this.#rightList; }

    public overwriteAnswerListItems(answers: readonly Answer[]): void
    {
        const answerButtons: readonly HTMLButtonElement[] = shuffleArray(answers.map(answer => createAnswerButton(answer, this.#buttonClickEvent)));

        const answerButtonListItems: {left: DocumentFragment, right: DocumentFragment} = answerButtons.reduce(
            (fragment, answerButton, index) => {
                const answerButtonListItem = document.createElement("li");
                answerButtonListItem.appendChild(answerButton);

                if (index % 2 === 0) { fragment.left.appendChild(answerButtonListItem); }
                else {fragment.right.appendChild(answerButtonListItem); }

                return fragment;
            },
            {left: document.createDocumentFragment(), right: document.createDocumentFragment()}
        );

        this.#leftList.innerHTML = "";
        this.#rightList.innerHTML = "";

        this.#leftList.appendChild(answerButtonListItems.left);
        this.#rightList.appendChild(answerButtonListItems.right);
    }
}

export function answerListsController( leftList: HTMLElement | null,
                                       rightList: HTMLElement | null,
                                       buttonClickEvent?: HTMLButtonElementClickEvent ): AnswerListsController
{
    if ( ! (leftList instanceof HTMLUListElement))
    {
        throw new TypeError(`${answerListsController.name}: left list not an HTML UL element: ${leftList}`);
    }

    if ( ! (rightList instanceof HTMLUListElement))
    {
        throw new TypeError(`${answerListsController.name}: right list not an HTML UL element: ${rightList}`);
    }

    return new AnswerListsController(leftList, rightList, buttonClickEvent);
}
