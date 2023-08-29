import { type Answer } from "./answer.js";

export class Question
{
    readonly #promptText: string;
    readonly #answers: readonly Answer[];
    readonly #string: string;

    public constructor(prompt: NonNullable<string>, answers: NonNullable<readonly Answer[]>)
    {
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

    public get promptText(): string { return this.#promptText; }
    public get answers(): readonly Answer[] { return this.#answers; }

    public toString(): string { return this.#string; }
}
