const strengths = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];
function sortHands(hand1, hand2) {
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
}

function isStronger(card1, card2) {
  const result =
    strengths.indexOf(card1) < strengths.indexOf(card2)
      ? true
      : strengths.indexOf(card1) === strengths.indexOf(card2)
      ? null
      : false;

  return result;
}
/**
 *
 * @param {string} input
 * @returns
 */
export function part2(input) {
  const lines = input.split("\n");

  const hands = lines.map((line) => {
    const [cardsStr, bidStr] = line.split(" ");
    const cards = cardsStr.split("");
    const bid = parseInt(bidStr);

    const cardsCount = cards.reduce((acc, card) => {
      if (card === "J") {
        return acc;
      }
      if (!acc[card]) {
        acc[card] = 0;
      }
      acc[card] += 1;
      return acc;
    }, {});
    const jCount = cards.filter((card) => card === "J").length;
    const [first = 0, second = 0] = Object.values(cardsCount).sort(
      (a, b) => b - a
    );

    const handType =
      first + jCount === 5
        ? 7
        : first + jCount === 4
        ? 6
        : first + second + jCount === 5
        ? 5
        : first + jCount === 3
        ? 4
        : first + second + jCount === 4
        ? 3
        : first + jCount === 2
        ? 2
        : 1;

    return {
      cards,
      bid,
      handType,
    };
  });

  const ranks = hands.sort(sortHands);
  return ranks.reduce((acc, hand, index) => {
    console.log(hand.cards.join(""), index + 1, hand.bid);
    acc += (index + 1) * hand.bid;
    return acc;
  }, 0);
}
