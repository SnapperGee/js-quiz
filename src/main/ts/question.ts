import { type Answer, answer as createAnswer} from "./answer.js";

export class Question
{
    readonly #prompt: string;
    readonly #answers: readonly Readonly<Answer>[];

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
    }
}
