export class Answer
{
    readonly #text: string;
    readonly #isCorrect: boolean;
    readonly #string: string;

    public constructor(answer: NonNullable<string>, isCorrect: NonNullable<boolean>)
    {
        this.#text = answer;
        this.#isCorrect = isCorrect;
        this.#string = `${new.target.name} {answer: "${this.#text}", isCorrect: ${this.#isCorrect}}`;
    }

    public get text(): string { return this.#text; }

    public get isCorrect(): boolean { return this.#isCorrect; }

    public toString(): string { return this.#string; }
}

export function answer(answer: NonNullable<string>, isCorrect: NonNullable<boolean>): Answer;
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
