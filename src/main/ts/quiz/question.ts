/**
 * @module Question
 */

import { type Answer } from "./answer.js";

/**
 * This class is used to create objects to represent a quiz question. It consists of a `string` prompt (the question
 * being asked) and an array of {@link Answer}s.
 *
 * @see {@link Answer}
 */
export class Question
{
    readonly #promptText: string;
    readonly #answers: readonly Answer[];
    readonly #string: string;

    /**
     * Constructs a new {@link Question} object instance with it's {@link Question.promptText} and
     * {@link Question.answers} properties set to the passed `string` and `readonly Answer[]` arguments respectively.
     *
     * @param prompt The `string` literal value set to the created object's {@link Question.promptText} property.
     *
     * @param answers The array of {@link Answer} objects to set to the constructed object's instance
     *                {@link Question.answers} property.
     *
     * @throws {@link TypeError} if either or both passed arguments are `undefined` or `null`.
     *
     * @throws {@link Error} If passed {@link Answer}s array is empty and doesn't contain a correct answer.
     */
    public constructor(prompt: NonNullable<string>, answers: NonNullable<readonly Answer[]>)
    {
        if (prompt === undefined || prompt === null)
        {
            throw new TypeError(`${new.target.name}: ${prompt} prompt string.`);
        }

        if (answers === undefined || answers === null)
        {
            throw new TypeError(`${new.target.name}: ${answers} answers array.`);
        }

        if (answers.length === 0)
        {
            throw new Error(`${new.target.name}: answers array is empty.`);
        }

        if (answers.every(answer => answer.isCorrect === false))
        {
            throw new Error(`${new.target.name}: no correct answers provided.`);
        }

        this.#promptText = prompt;
        this.#answers = Object.isFrozen(answers) ? answers : Object.freeze(Array.from(answers));
        this.#string = `${new.target.name} {prompt: "${this.#promptText}", answers: [${this.#answers.map(answer => `{answer: "${answer.text}", isCorrect: ${answer.isCorrect}}`).join(", ")}]}`;
    }

    /**
     * This {@link Question} object's prompt text `string` property.
     */
    public get promptText(): string { return this.#promptText; }

    /**
     * Returns the array of {@link Answer}s of this {@link Question} object.
     */
    public get answers(): readonly Answer[] { return this.#answers; }

    /**
     * Returns a `string` representation of this {@link Answer} object.
     * @returns a `string` representation of this {@link Answer} object.
     */
    public toString(): string { return this.#string; }
}
