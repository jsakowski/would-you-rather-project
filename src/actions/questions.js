import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

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
    console.log('Action handleSaveQuestionAnswer', info)
    
    dispatch(showLoading())
    return saveQuestionAnswer(info)
      .then(() => dispatch(votePoll(info)))
      .then(() => dispatch(hideLoading()))
}
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleSaveQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
      })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

