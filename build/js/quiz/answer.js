var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Answer_text, _Answer_isCorrect, _Answer_string;
/**
 * Class for creating the answers to quiz questions. These objects contain a `text` property which is the string literal
 * value of the answer and a `boolean` value indicating whether this answer object is the correct answer or not.
 */
export class Answer {
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
    constructor(text, isCorrect) {
        _Answer_text.set(this, void 0);
        _Answer_isCorrect.set(this, void 0);
        _Answer_string.set(this, void 0);
        if (text === undefined || text === null) {
            throw new TypeError(`${new.target.name}: ${text} text string value.`);
        }
        if (isCorrect === undefined || isCorrect === null) {
            throw new TypeError(`${new.target.name}: ${isCorrect} isCorrect boolean value.`);
        }
        __classPrivateFieldSet(this, _Answer_text, text, "f");
        __classPrivateFieldSet(this, _Answer_isCorrect, isCorrect, "f");
        __classPrivateFieldSet(this, _Answer_string, `${new.target.name} {answer: "${__classPrivateFieldGet(this, _Answer_text, "f")}", isCorrect: ${__classPrivateFieldGet(this, _Answer_isCorrect, "f")}}`, "f");
    }
    /**
     * The `string` literal property of this {@link Answer} object.
     */
    get text() { return __classPrivateFieldGet(this, _Answer_text, "f"); }
    /**
     * The `boolean` value indicating whether this {@link Answer} object is correct or not.
     */
    get isCorrect() { return __classPrivateFieldGet(this, _Answer_isCorrect, "f"); }
    /**
     * Returns a `string` representation of this {@link Answer} object.
     * @returns a `string` representation of this {@link Answer} object.
     */
    toString() { return __classPrivateFieldGet(this, _Answer_string, "f"); }
}
_Answer_text = new WeakMap(), _Answer_isCorrect = new WeakMap(), _Answer_string = new WeakMap();
export function answer(answerOrOther, isCorrect) {
    if (typeof answerOrOther === "string") {
        if (isCorrect === undefined || isCorrect === null) {
            throw new TypeError(`${answer.name}: ${isCorrect} is correct argument.`);
        }
        return new Answer(answerOrOther, isCorrect);
    }
    return new Answer(answerOrOther.text, answerOrOther.isCorrect);
}
export default answer;
