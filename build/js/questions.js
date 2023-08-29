import { answer } from "./quiz/answer.js";
import { Question } from "./quiz/question.js";
export const betterThanJSQuestion = new Question("What language offers some advantages over JavaScript?", [
    answer("Python", true),
    answer("TypeScript", true),
    answer("C#", true),
    answer("Java", true)
]);
export const builtinJSTypesQuestion = new Question("What is not a builtin type of JavaScript?", [
    answer("int", true),
    answer("BigInt", false),
    answer("string", false),
    answer("boolean", false)
]);
export const jsCreationTimeQuestion = new Question("How long did it take to create JavaScript?", [
    answer("10 days", true),
    answer("Several years", false),
    answer("6 months", false),
    answer("A few hours", false)
]);
export const jsPrioritiesDuringCreationQuestion = new Question("When JavaScript was being created, what was its main priority?", [
    answer("Developing it ASAP", true),
    answer("Scalability", false),
    answer("Longevity", false),
    answer("Performance", false)
]);
export const jsTypedQuestion = new Question("JavaScript uses _______ typing.", [
    answer("dynamic", true),
    answer("static", false),
    answer("complex", false),
    answer("simple", false)
]);
export const jsTypingQuestion = new Question("JavaScript is a ______ typed language.", [
    answer("weakly", true),
    answer("strongly", false),
    answer("statically", false),
    answer("powerfully", false)
]);
export const questions = Object.freeze([
    betterThanJSQuestion,
    builtinJSTypesQuestion,
    jsCreationTimeQuestion,
    jsPrioritiesDuringCreationQuestion,
    jsTypedQuestion,
    jsTypingQuestion
]);
export default questions;
