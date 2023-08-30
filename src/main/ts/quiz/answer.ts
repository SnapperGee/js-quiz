/**
 * Class for creating the answers to quiz questions. These objects contain a `text` property which is the string literal
 * value of the answer and a `boolean` value indicating whether this answer object is the correct answer or not.
 */
export class Answer
{
    readonly #text: string;
    readonly #isCorrect: boolean;
    readonly #string: string;

    /**
     * Constructs a new {@link Answer} object instance with it's {@link Answer.text} and {@link Answer.isCorrect}
     * properties set to the passed `string` and `boolean` arguments respectively.
     *
     * @param text The `string` literal value of constructed {@link Answer} object instance.
     *
     * @param isCorrect The `boolean` value indicating whether the constructed {@link Answer} object instance is a
     *        correct answer or not.
     *
     * @throws {@link TypeError} if either or both passed arguments are `undefined` or `null`.
     */
    public constructor(text: NonNullable<string>, isCorrect: NonNullable<boolean>)
    {
        if (text === undefined || text === null)
        {
            throw new TypeError(`${new.target.name}: ${text} text string value.`);
        }

        if (isCorrect === undefined || isCorrect === null)
        {
            throw new TypeError(`${new.target.name}: ${isCorrect} isCorrect boolean value.`);
        }

        this.#text = text;
        this.#isCorrect = isCorrect;
        this.#string = `${new.target.name} {answer: "${this.#text}", isCorrect: ${this.#isCorrect}}`;
    }

    /**
     * The `string` literal property of this {@link Answer} object.
     */
    public get text(): string { return this.#text; }

    /**
     * The `boolean` value indicating whether this {@link Answer} object is correct or not.
     */
    public get isCorrect(): boolean { return this.#isCorrect; }

    /**
     * Returns a `string` representation of this {@link Answer} object.
     * @returns a `string` representation of this {@link Answer} object.
     */
    public toString(): string { return this.#string; }
}

/**
 * Returns a newly constructed instanceof an {@link Answer} object with it's {@link Answer.text} and
 * {@link Answer.isCorrect} properties set to the passed `string` and `boolean` arguments respectively.
 *
 * @param text The `string` literal value of constructed {@link Answer} object instance.
 *
 * @param isCorrect The `boolean` value indicating whether the constructed {@link Answer} object instance is a
 *        correct answer or not.
 */
export function answer(text: NonNullable<string>, isCorrect: NonNullable<boolean>): Answer;

/**
 * Returns a newly constructed instanceof an {@link Answer} object with its properties copied from another `Answer` object.
 *
 * @param other The other {@link Answer} object to copy.
 */
export function answer(other: NonNullable<Answer>): Answer;
export function answer(answerOrOther: NonNullable<string | Answer>, isCorrect?: boolean): Answer
{
    if (typeof answerOrOther === "string")
    {
        if (isCorrect === undefined || isCorrect === null)
        {
            throw new TypeError(`${answer.name}: ${isCorrect} is correct argument.`);
        }

        return new Answer(answerOrOther, isCorrect);
    }

    return new Answer(answerOrOther.text, answerOrOther.isCorrect);
}

export default answer;
