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
var _Question_promptText, _Question_answers, _Question_string;
export class Question {
    constructor(prompt, answers) {
        _Question_promptText.set(this, void 0);
        _Question_answers.set(this, void 0);
        _Question_string.set(this, void 0);
        if (answers.length === 0) {
            throw new Error(`${new.target.name}: answers array is empty.`);
        }
        if (answers.every(answer => answer.isCorrect === false)) {
            throw new Error(`${new.target.name}: no correct answers provided.`);
        }
        __classPrivateFieldSet(this, _Question_promptText, prompt, "f");
        __classPrivateFieldSet(this, _Question_answers, Object.isFrozen(answers) ? answers : Object.freeze(Array.from(answers)), "f");
        __classPrivateFieldSet(this, _Question_string, `${new.target.name} {prompt: "${__classPrivateFieldGet(this, _Question_promptText, "f")}", answers: [${__classPrivateFieldGet(this, _Question_answers, "f").map(answer => `{answer: "${answer.text}", isCorrect: ${answer.isCorrect}}`).join(", ")}]}`, "f");
    }
    get promptText() { return __classPrivateFieldGet(this, _Question_promptText, "f"); }
    get answers() { return __classPrivateFieldGet(this, _Question_answers, "f"); }
    toString() { return __classPrivateFieldGet(this, _Question_string, "f"); }
}
_Question_promptText = new WeakMap(), _Question_answers = new WeakMap(), _Question_string = new WeakMap();
