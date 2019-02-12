import { saveQuestionAnswer } from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  }
}

function votePoll(answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    answer
  }
}

export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    const info = {
      authedUser,
      qid,
      answer
    }

    return saveQuestionAnswer(info).then(() => dispatch(votePoll(info)))
  }
}

