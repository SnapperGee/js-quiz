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
export class Answer {
    constructor(answer, isCorrect) {
        _Answer_text.set(this, void 0);
        _Answer_isCorrect.set(this, void 0);
        _Answer_string.set(this, void 0);
        __classPrivateFieldSet(this, _Answer_text, answer, "f");
        __classPrivateFieldSet(this, _Answer_isCorrect, isCorrect, "f");
        __classPrivateFieldSet(this, _Answer_string, `${new.target.name} {answer: "${__classPrivateFieldGet(this, _Answer_text, "f")}", isCorrect: ${__classPrivateFieldGet(this, _Answer_isCorrect, "f")}}`, "f");
    }
    get text() { return __classPrivateFieldGet(this, _Answer_text, "f"); }
    get isCorrect() { return __classPrivateFieldGet(this, _Answer_isCorrect, "f"); }
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
