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
var _AnswerListsController_leftList, _AnswerListsController_rightList, _AnswerListsController_buttonClickEvent;
import { shuffleArray } from "../util.js";
import { createAnswerButton } from "./create-answer-button.js";
export class AnswerListsController {
    constructor(leftList, rightList, buttonClickEvent) {
        _AnswerListsController_leftList.set(this, void 0);
        _AnswerListsController_rightList.set(this, void 0);
        _AnswerListsController_buttonClickEvent.set(this, void 0);
        if (leftList === undefined || leftList === null) {
            throw new TypeError(`${new.target.name}: ${leftList} left list.`);
        }
        if (rightList === undefined || rightList === null) {
            throw new TypeError(`${new.target.name}: ${rightList} right list.`);
        }
        __classPrivateFieldSet(this, _AnswerListsController_leftList, leftList, "f");
        __classPrivateFieldSet(this, _AnswerListsController_rightList, rightList, "f");
        __classPrivateFieldSet(this, _AnswerListsController_buttonClickEvent, buttonClickEvent, "f");
    }
    get leftList() { return __classPrivateFieldGet(this, _AnswerListsController_leftList, "f"); }
    get rightList() { return __classPrivateFieldGet(this, _AnswerListsController_rightList, "f"); }
    get buttonClickEvent() { return __classPrivateFieldGet(this, _AnswerListsController_buttonClickEvent, "f"); }
    overwriteAnswerListItems(answers) {
        const answerButtons = shuffleArray(answers.map(answer => createAnswerButton(answer, __classPrivateFieldGet(this, _AnswerListsController_buttonClickEvent, "f"))));
        const answerButtonListItems = answerButtons.reduce((fragment, answerButton, index) => {
            const answerButtonListItem = document.createElement("li");
            answerButtonListItem.appendChild(answerButton);
            if (index % 2 === 0) {
                fragment.left.appendChild(answerButtonListItem);
            }
            else {
                fragment.right.appendChild(answerButtonListItem);
            }
            return fragment;
        }, { left: document.createDocumentFragment(), right: document.createDocumentFragment() });
        __classPrivateFieldGet(this, _AnswerListsController_leftList, "f").innerHTML = "";
        __classPrivateFieldGet(this, _AnswerListsController_rightList, "f").innerHTML = "";
        __classPrivateFieldGet(this, _AnswerListsController_leftList, "f").appendChild(answerButtonListItems.left);
        __classPrivateFieldGet(this, _AnswerListsController_rightList, "f").appendChild(answerButtonListItems.right);
    }
}
_AnswerListsController_leftList = new WeakMap(), _AnswerListsController_rightList = new WeakMap(), _AnswerListsController_buttonClickEvent = new WeakMap();
export function answerListsController(leftList, rightList, buttonClickEvent) {
    if (!(leftList instanceof HTMLUListElement)) {
        throw new TypeError(`${answerListsController.name}: left list not an HTML UL element: ${leftList}`);
    }
    if (!(rightList instanceof HTMLUListElement)) {
        throw new TypeError(`${answerListsController.name}: right list not an HTML UL element: ${rightList}`);
    }
    return new AnswerListsController(leftList, rightList, buttonClickEvent);
}
