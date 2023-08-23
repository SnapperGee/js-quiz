export class Answer
{
    readonly #answer: string;
    readonly #isCorrect: boolean;
    readonly #string: string;

    public constructor(answer: NonNullable<string>, isCorrect: NonNullable<boolean>)
    {
        this.#answer = answer;
        this.#isCorrect = isCorrect;
        this.#string = `${new.target.name} {answer: "${this.#answer}", isCorrect: ${this.#isCorrect}}`;
    }

    public get answer(): string { return this.#answer; }

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

    return new Answer(answerOrOther.answer, answerOrOther.isCorrect);
}

export default answer;
