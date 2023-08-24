import { type Answer, answer as createAnswer} from "./answer.js";

export class Question
{
    readonly #prompt: string;
    readonly #answers: readonly Readonly<Answer>[];
    readonly #correctAnswers: readonly Readonly<Answer>[];
    readonly #hasMultipleCorrect: boolean;
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

        this.#prompt = prompt;
        this.#answers = Object.freeze(answers.map(answer => Object.isFrozen(answer) ? answer : Object.freeze(createAnswer(answer))));
        this.#correctAnswers = Object.freeze(this.#answers.filter(answer => answer.isCorrect));
        this.#hasMultipleCorrect = this.#correctAnswers.length !== 1;
        this.#string = `${new.target.name} {prompt: "${this.#prompt}", answers: [${this.#answers.map(answer => `{answer: "${answer.answer}", isCorrect: ${answer.isCorrect}}`).join(", ")}]}`;
    }

    public get prompt(): string { return this.#prompt; }
    public get answers(): readonly Readonly<Answer>[] { return this.#answers; }
    public get correctAnswers(): readonly Readonly<Answer>[] { return this.#correctAnswers; }
    public get hasMultipleCorrect(): boolean { return this.#hasMultipleCorrect; }

    public toString(): string { return this.#string; }
}