import { type Answer } from "../quiz/answer.js";
import { shuffleArray } from "../util.js";
import { createAnswerButton, HTMLButtonElementClickEvent } from "./create-answer-button.js";

/**
 * This class is used to update {@link HTMLUListElement}s of {@link HTMLButtonElement}s created from the {@link Answer}s
 * of {@link Question.Question} objects.
 */
export class AnswerListsController
{
    readonly #leftList: HTMLUListElement;
    readonly #rightList: HTMLUListElement;
    readonly #buttonClickEvent: HTMLButtonElementClickEvent | undefined;

    /**
     * Constructs a new instance of an {@link AnswerListsController} object instance containing the the 2
     * {@link HTMLUListElement}s to update with the question {@link Answer}s.
     *
     * @param leftList One of the {@link HTMLUListElement}s to update with {@link Answer}s.
     *
     * @param rightList The other {@link HTMLUListElement}s to update with {@link Answer}s.
     *
     * @param buttonClickEvent The optional {@link HTMLButtonElementClickEvent} function that is bound as an event
     *                         listener to the {@link HTMLButtonElement}s that filled in each list.
     *
     * @throws {@link TypeError} if either of the passed {@link HTMLUListElement} arguments are `undefined` or `null`.
     */
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

    /**
     * One of the {@link HTMLUListElement}s to update with {@link Answer}s.
     */
    public get leftList(): HTMLUListElement { return this.#leftList; }

    /**
     * Another {@link HTMLUListElement}s to update with {@link Answer}s.
     */
    public get rightList(): HTMLUListElement { return this.#rightList; }

    /**
     * The {@link HTMLButtonElementClickEvent} function that is bound as an event listener to the
     * {@link HTMLButtonElement}s that filled in each list or `undefined` if it doesn't have one.
     */
    public get buttonClickEvent(): HTMLButtonElementClickEvent | undefined { return this.#buttonClickEvent; }

    /**
     * Takes in an array of {@link Answer} objects and converts them to {@link HTMLButtonElement}s bound with this
     * object's {@link AnswerListsController.buttonClickEvent} if it has one and evenly distributes them between its
     * {@link AnswerListsController.leftList} and {@link AnswerListsController.rightList}.
     *
     * @param answers The {@link Answer} objects converted to {@link HTMLButtonElement}s and distributed into this
     *                objects
     */
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

/**
 * Returns a newly constructed {@link AnswerListsController} object instance.
 *
 * @param leftList One of the {@link HTMLUListElement}s to update with {@link Answer}s.
 *
 * @param rightList The other {@link HTMLUListElement}s to update with {@link Answer}s.
 *
 * @param buttonClickEvent The optional {@link HTMLButtonElementClickEvent} function that is bound as an event
 *                         listener to the {@link HTMLButtonElement}s that filled in each list.
 *
 * @returns a newly constructed {@link AnswerListsController} object instance.
 *
 * @throws {@link TypeError} if either of the `leftList` or `rightList` arguments aren't instances of
 *                           {@link HTMLUListElement}s.
 */
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
