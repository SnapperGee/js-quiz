import { type AnswerListsController, answerListsController } from "./dom-component/answer-lists-controller.js";
import { questions } from "./questions.js";
import { type Question } from "./quiz/question.js";
import { randomEmoji, shuffleArray } from "./util.js";

const LOCAL_STORAGE_HIGH_SCORES_KEY: string = "highScores";

// The quiz questions (question prompt and its answers) to shuffle and iterate through
let questionsIterableIterator: IterableIterator<Question>;

const resetQuestionsIterator = (): IterableIterator<Question> => questionsIterableIterator = shuffleArray(questions).values();

// Paragraph DOM element to display quiz question to
const promptParagraph = document.getElementById("promptParagraph");

const setPromptParagraphText = (aString: string): string => promptParagraph!.textContent = aString;

// Column that contains start button. Gets hidden when quiz starts
const startButtonColumn = document.getElementById("startButtonColumn");

const hideStartButtonColumn = (): string => startButtonColumn!.style.display = "none";

const showStartButtonColumn = (): string => startButtonColumn!.style.display = "block";

// Start button that starts quiz timer and displays first question
const startButton = document.getElementById("startButton");

// The left and right columns of buttons corresponding to the quiz question answers
const answerColumns = Object.freeze(Array.from(document.getElementsByClassName("answerColumn")));

const hideAnswerColumns = (): void => answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "none");

const showAnswerColumns = (): void => answerColumns.forEach(answerColumn => (<HTMLElement> answerColumn).style.display = "block" );

// Row containing paragraph to display status of whether answer is correct or incorrect
const bottomRow = document.getElementById("bottomRow");

// The alpha text portion of paragraph to display status of whether answer is correct or incorrect
const correctOrIncorrectText = document.getElementById("correctOrIncorrectText");

// The emoji portion of paragraph to display status of whether answer is correct or incorrect
const correctOrIncorrectEmoji = document.getElementById("correctOrIncorrectEmoji");

// The div containing the paragraph containing the quiz timer text
const quizTimerContainer = document.getElementById("timerContainer");

const showQuizTimerContainer = (): string => quizTimerContainer!.style.display = "block";

const hideQuizTimerContainer = (): string => quizTimerContainer!.style.display = "none";

const scoreSubmitForm = document.getElementById("scoreSubmitForm");

const showScoreSubmitForm = (): string => scoreSubmitForm!.style.display = "flex";

const hideScoreSubmitForm = (): string => scoreSubmitForm!.style.display = "none";

const scoreSubmitParagraphRow = document.getElementById("scoreSubmitParagraphRow");

const showScoreSubmitParagraphRow = (): string => scoreSubmitParagraphRow!.style.display = "block";

const hideScoreSubmitParagraphRow = (): string => scoreSubmitParagraphRow!.style.display = "none";

const scoreSubmitParagraph = document.getElementById("scoreSubmitParagraph");

const setScoreSubmitParagraph = (aString: string): string => scoreSubmitParagraph!.textContent = aString;

const scoreNameInput = <HTMLInputElement> document.getElementById("nameInput");

// The paragraph containing the quiz timer text
const timerParagraph = document.getElementById("timerParagraph");

const setTimerParagraphText = (value: string | number): string => timerParagraph!.textContent = typeof value === "string" ? value : String(value);

const initQuizTime = Math.round(5 * 1000 * questions.length / 1000);

// Variable to hold the numeric value of the quiz timer. Gives 5 seconds per question
let quizTimer = initQuizTime;

let quizTimerInterval: number;

// Function to call when start quiz button is clicked
const startQuiz = () =>
{
    resetQuestionsIterator();

    // Hide entire start button colum
    hideStartButtonColumn();

    hideScoreSubmitParagraphRow();

    // Set the question prompt paragraph text and create buttons for each question answer
    setQuestionPromptAndAnswers(questionsIterableIterator.next().value);

    // Display answer button columns to replace hidden start button column
    showAnswerColumns();

    // Display quiz timer
    showQuizTimerContainer();

    // Set the timer text to the init quiz time
    setTimerParagraphText(quizTimer);

    quizTimerInterval = setInterval(() =>
    {
        quizTimer--;

        setTimerParagraphText(quizTimer);

        if (quizTimer <= 0)
        {
            clearInterval(quizTimerInterval);
            setPromptParagraphText(`You have run out of time... ${randomEmoji.negative()}`);
            // Hide answer button columns to replace hidden start button column
            hideAnswerColumns();
            hideQuizTimerContainer();
            quizTimer = initQuizTime;
            startButton!.textContent = "Try again?";
            showStartButtonColumn();
        }
    },
    1000);

};

startButton!.addEventListener("click", startQuiz);

const saveScoreFormSubmitEvent = (event: SubmitEvent) =>
{
    event.preventDefault();

    const _name = scoreNameInput.value.trim().replace(/\s{2,}/g, "\u0020");

    type hScore = {name: string, score: number};

    const newHighScore: hScore = {name: _name, score: quizTimer};

    scoreNameInput.value = "";

    const savedScoresString: string | null = localStorage.getItem(LOCAL_STORAGE_HIGH_SCORES_KEY);

    let savedScoresArray: hScore[];

    if (savedScoresString !== null)
    {
        savedScoresArray = JSON.parse(savedScoresString).sort((aHighScore: hScore, anotherHighScore: hScore) => anotherHighScore.score - aHighScore.score);

        if (savedScoresArray.length >= 5)
        {
            savedScoresArray.splice(savedScoresArray.length - 1, 1, newHighScore);
        }
        else
        {
            savedScoresArray.push(newHighScore);
        }

        savedScoresArray.sort((aHighScore: hScore, anotherHighScore: hScore) => anotherHighScore.score - aHighScore.score);
    }
    else
    {
        savedScoresArray = [newHighScore];
    }

    localStorage.setItem(LOCAL_STORAGE_HIGH_SCORES_KEY, JSON.stringify(savedScoresArray));
};

scoreSubmitForm?.addEventListener("submit", saveScoreFormSubmitEvent);

// Timer used to hide row that displays correct or incorrect status of answered question
let correctIncorrectMsgTimeout: number;

// List of answer buttons from left column
const leftAnswerButtonList = document.getElementById("leftAnswerButtonList");

// List of answer buttons from right column
const rightAnswerButtonList = document.getElementById("rightAnswerButtonList");

// Function to bind as click event to each answer button
const answerButtonClickEvent = (event: MouseEvent) =>
{
    if (event.target instanceof HTMLButtonElement)
    {
        // Get boolean indicating whether correct answer button was clicked or not
        const clickedAnswerIsCorrect = event.target.dataset.isCorrect === "true";

        // Clicked answer button is correct set correct answer message
        if (clickedAnswerIsCorrect)
        {
            correctOrIncorrectText!.textContent = "Correct!";
            correctOrIncorrectEmoji!.textContent = randomEmoji.positive();
        }
        // Clicked answer button is incorrect set incorrect answer message and deduct from timer
        else
        {
            quizTimer = quizTimer <= 2 ? 0 : quizTimer - 4;
            setTimerParagraphText(quizTimer);
            correctOrIncorrectText!.textContent = "Incorrect...";
            correctOrIncorrectEmoji!.textContent = randomEmoji.negative();
        }

        // Display correct/incorrect answer message for 1.5 seconds
        bottomRow!.style.display = "block";
        clearTimeout(correctIncorrectMsgTimeout);
        correctIncorrectMsgTimeout = setTimeout(() =>
        {
            bottomRow!.style.display = "none";
        },
        1500);
    }

    // Get next question to generate question prompt and answer buttons from
    const nextQuestion: IteratorResult<Question> = questionsIterableIterator.next();

    // If there's another question left
    if (nextQuestion?.value !== undefined)
    {
        setQuestionPromptAndAnswers(nextQuestion.value);
    }
    // If there are no questions left
    else
    {
        clearInterval(quizTimerInterval);
        hideAnswerColumns();
        hideQuizTimerContainer();
        setPromptParagraphText(`Good job, you completed the quiz! ${randomEmoji.positive()}\nWith a score of...`);

        const scoreParagraph = document.createElement("p");
        scoreParagraph.classList.add("fw-bold");
        scoreParagraph.style.fontSize = "10rem";
        scoreParagraph.textContent = String(quizTimer);

        promptParagraph?.append(scoreParagraph);

        const highScoresString: string | null = localStorage.getItem(LOCAL_STORAGE_HIGH_SCORES_KEY);

        const highScores: {name: string, score: number}[] | null = highScoresString !== null ? JSON.parse(highScoresString) : null;

        if(highScores === null || highScores.length < 5 || quizTimer > Math.max(...highScores.map(highScore => highScore.score)))
        {

            setScoreSubmitParagraph("Your score is a top 5 in the leader boards! Would you like to save it?");
            showScoreSubmitForm();
        }
        else
        {
            setScoreSubmitParagraph("You must get a score that is within the top 5 of the leader boards to save it.");
            quizTimer = initQuizTime;
            startButton!.textContent = "Try again?";
            showStartButtonColumn();
        }

        showScoreSubmitParagraphRow();
    }
};

// Create object to overwrite answer buttons in answer button lists
const answerLists: AnswerListsController = answerListsController( leftAnswerButtonList,
                                                                  rightAnswerButtonList,
                                                                  answerButtonClickEvent );

// Uses a question object to set the question prompt paragraph text and to generate answer buttons
const setQuestionPromptAndAnswers = (question: Question) =>
{
    setPromptParagraphText(question.promptText);
    answerLists.overwriteAnswerListItems(question.answers);
};
