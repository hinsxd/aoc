import "utils/global.mjs";

const strengths = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

function isStronger(card1, card2) {
  return strengths.indexOf(card1) < strengths.indexOf(card2)
    ? true
    : strengths.indexOf(card1) === strengths.indexOf(card2)
    ? null
    : false;
}
/**
 *
 * @param {string} input
 * @returns
 */
export function part1(input) {
  const lines = input.split("\n");

  const hands = lines.map((line) => {
    const [cardsStr, bidStr] = line.split(" ");
    const cards = cardsStr.split("");
    const bid = parseInt(bidStr);

    const cardsCount = cards.reduce((acc, card) => {
      if (!acc[card]) {
        acc[card] = 0;
      }
      acc[card] += 1;
      return acc;
    }, {});
    const isFiveAKind = cards.every((card) => card === cards[0]);
    const isFourAKind = Object.values(cardsCount).some((count) => count === 4);
    const isFullHouse =
      Object.values(cardsCount).some((count) => count === 3) &&
      Object.values(cardsCount).some((count) => count === 2);
    const isThreeAKind = Object.values(cardsCount).some((count) => count === 3);

    const isTwoPair =
      Object.values(cardsCount).filter((count) => count === 2).length === 2;
    const isPair =
      Object.values(cardsCount).filter((count) => count === 2).length === 1;
    const isHighCard = Object.values(cardsCount).every((count) => count === 1);

    const handType = isFiveAKind
      ? 7
      : isFourAKind
      ? 6
      : isFullHouse
      ? 5
      : isThreeAKind
      ? 4
      : isTwoPair
      ? 3
      : isPair
      ? 2
      : isHighCard
      ? 1
      : 0;
    return {
      cards,
      bid,
      handType,
    };
  });

  const ranks = hands.sort((hand1, hand2) => {
    if (hand2.handType === hand1.handType) {
      // compare card by card
      for (let i = 0; i < hand1.cards.length; i++) {
        const card1 = hand1.cards[i];
        const card2 = hand2.cards[i];
        const isStrongerCard = isStronger(card1, card2);
        if (isStrongerCard === null) {
          continue;
        }
        if (isStrongerCard) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    return hand1.handType - hand2.handType;
  });
  return ranks.reduce((acc, hand, index) => {
    acc += (index + 1) * hand.bid;
    return acc;
  }, 0);
}
