export class JsQuiz implements IterableIterator<boolean>
{
    readonly #arr: readonly boolean[] = [];
    #iterIndex: number = 0;

    public next(): IteratorResult<boolean>
    {
        if (this.#iterIndex < this.#arr.length)
        {
            return { done: false, value: this.#arr[this.#iterIndex++] };
        }
        else
        {
            this.#iterIndex = 0; // reset the pointer to start for new iterations
            return { done: true, value: null };
        }
    }

    public [Symbol.iterator](): IterableIterator<boolean>
    {
        return this;
    }
}
