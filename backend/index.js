const hands = ["グー", "チョキ", "パー"]
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

const judge = (player_hand, cpu_hand) => {
  if (player_hand === cpu_hand) {
    return "引き分け"
  } else if (
    (player_hand === "グー" && cpu_hand === "チョキ") ||
    (player_hand === "チョキ" && cpu_hand === "パー") ||
    (player_hand === "パー" && cpu_hand === "グー")
  ) {
    return "勝ち"
  } else {
    return "負け"
  }
}

exports.handler = async (event) => {
  const player_hand = hands[event.hand]
  const cpu_hand = hands[getRandomInt(3)]

  const result = judge(player_hand, cpu_hand)

  const response = {
    statusCode: 200,
    body: {
      cpu_hand: cpu_hand,
      result: result
    }
  };
  return response;
};
