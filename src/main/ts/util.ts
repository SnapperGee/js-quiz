export const shuffleArray = <T>(array: readonly T[]): T[] =>
{
    const shuffledArray = Array.from(array);

    if (array.length <= 1)
    {
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

export const timedElementHider = (htmlElement: HTMLElement, time: number): void =>
{
    let timer = time;

    const timeIntervale = setInterval(() =>
    {
        timer--;

        if (timer >= 0)
        {
            clearInterval(timeIntervale);
            htmlElement.style.display = "none";
        }
    },
    1000);
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
