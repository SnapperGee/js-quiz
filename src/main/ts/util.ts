export const shuffleArray = <T>(array: T[]): T[] =>
{
    if (array.length <= 1)
    {
        return array;
    }

    const shuffledArray = Array.from(array);


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

export const convertMsToSeconds = (num: string | number): string =>
{
    if (typeof num === "number")
    {
        return String(Math.round(num / 1000));
    }
    else
    {
        return String(Math.round(parseFloat(num) / 1000));
    }
};

const positiveEmojis: readonly string[] = Object.freeze([
    ":)", ":D", ";)", ";D", "☺", "😀", "😁", "😃", "🙂", "😊", "😌", "🤩", "🥳", "🎉", "🥂", "🍾", "👍", "👌", "🌟", "⭐"
]);

const negativeEmojis: readonly string[] = Object.freeze([
    ":(", ">:(", "☹", "😢", "😭", "😠", "😑", "😔", "😕", "😖", "😟", "😣", "😩", "😱", "🤬", "👎"
]);

export const randomEmoji = Object.freeze({
    positive: (): string => Object.freeze(positiveEmojis[Math.floor(Math.random() * positiveEmojis.length)]),
    negative: (): string => Object.freeze(negativeEmojis[Math.floor(Math.random() * negativeEmojis.length)])
});
