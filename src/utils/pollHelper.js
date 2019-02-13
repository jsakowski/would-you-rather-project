export function getMemberVote(poll, memberId) {
  return (
    poll.optionOne.votes.includes(memberId)
      ? 1
      : poll.optionTwo.votes.includes(memberId)
        ? 2
        : 0
  )
}

export function formatPoll(poll) {
  return {
    id: poll.id,
    option1: {
      text: poll.optionOne.text,
      votes: poll.optionOne.votes.length,
    },
    option2: {
      text: poll.optionTwo.text,
      votes: poll.optionTwo.votes.length,
    },
  }
}

export function formatPoll4Vote(poll) {
  return {
    id: poll.id,
    optionOne: poll.optionOne.text,
    optionTwo: poll.optionTwo.text,
  }
}


export function getPollAuthor (author) {
  return {
    name: author.name,
    avatarURL: author.avatarURL,
  }
}