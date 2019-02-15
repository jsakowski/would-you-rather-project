import React, { Fragment } from 'react'

export const tabs = [
  {
    id: 'unanswered',
    name: 'Unanswered Questions',
    emptyText:
      <Fragment>
        <h4 className='alert-heading'>Well done!</h4>
        <p>
          No more questions to answer. I’m sure you’ll add at least
          a few would you rather questions that are really hard to answer!
          Some can be ridiculous, some quite deep, while others - just fun to answer.
        </p>
      </Fragment>
  },
  {
    id: 'answered',
    name: 'Answered Questions',
    emptyText:
      <Fragment>
        <p>You did not answer any questions yet.
          The perfect list of carefully chosen would you rather questions are wating for you.
      </p>
      </Fragment>
  }
]