export const shuffleArray = (array) => {
    const shuffledArray = Array.from(array);
    if (array.length <= 1) {
        return shuffledArray;
    }
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] =
            [shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }
    return shuffledArray;
};
const positiveEmojis = Object.freeze([
    ":)", ":D", ";)", ";D", "☺", "😀", "😁", "😃", "🙂", "😊", "😌", "🤩", "🥳", "🎉", "🥂", "🍾", "👍", "👌", "🌟", "⭐", "🤑"
]);
const negativeEmojis = Object.freeze([
    ":(", ">:(", "☹", "😢", "🥺", "😭", "😠", "😡", "😤", "😑", "😨", "😥", "😔", "😕", "😰", "😖", "😫", "😟", "😣", "😩", "😱", "🤬", "👎"
]);
export const randomEmoji = Object.freeze({
    positive: () => Object.freeze(positiveEmojis[Math.floor(Math.random() * positiveEmojis.length)]),
    negative: () => Object.freeze(negativeEmojis[Math.floor(Math.random() * negativeEmojis.length)])
});
