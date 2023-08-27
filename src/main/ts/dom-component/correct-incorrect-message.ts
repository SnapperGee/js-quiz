const positiveEmojis: readonly string[] = Object.freeze([
    ":)", ":D", ";)", ";D", "☺", "😀", "😁", "😃", "🙂", "😊", "😌", "🥳", "🎉", "🥂", "🍾", "👍", "👌"
]);

const negativeEmojis: readonly string[] = Object.freeze([
    ":(", ">:(", "☹", "😢", "😭", "😠", "😑", "😔", "😕", "😖", "😟", "😣", "😩", "😱", "🤬", "👎"
]);

export const randomPositiveEmoji = Object.freeze((): string =>
{
    return positiveEmojis[Math.floor(Math.random() * positiveEmojis.length)];
});

export const randomNegativeEmoji = Object.freeze((): string =>
{
    return negativeEmojis[Math.floor(Math.random() * negativeEmojis.length)];
});

export const random = Object.freeze({
    positiveEmoji: (): string => randomPositiveEmoji(),
    negativeEmoji: (): string => randomNegativeEmoji()
});

export default random;
