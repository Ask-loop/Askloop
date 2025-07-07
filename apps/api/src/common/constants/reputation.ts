import { ActivityType } from '@common/types';

export const REPUTATION_CONSTANTS = {
  QUESTION_CREATION: 5,
  ANSWER_CREATION: 10,
  COMMENT_CREATION: 1,
  VOTE_UP: 10,
  VOTE_DOWN: -10,
  ACCEPT_ANSWER: 15,
  EDIT_QUESTION: 2,
  EDIT_ANSWER: 1,
  TAG_CREATION: 2,
};

export const REPUTATION_RULES = {
  [ActivityType.Question]: {
    point: REPUTATION_CONSTANTS.QUESTION_CREATION,
    field: 'questionsCount',
  },
  [ActivityType.Answer]: {
    point: REPUTATION_CONSTANTS.ANSWER_CREATION,
    field: 'answersCount',
  },
  [ActivityType.Comment]: {
    point: REPUTATION_CONSTANTS.COMMENT_CREATION,
    field: 'commentsCount',
  },
  [ActivityType.Vote]: {
    point: REPUTATION_CONSTANTS.VOTE_UP,
    field: 'votesCount',
  },
  [ActivityType.AcceptAnswer]: {
    point: REPUTATION_CONSTANTS.ACCEPT_ANSWER,
    field: 'acceptedAnswersCount',
  },
  [ActivityType.Tag]: {
    point: REPUTATION_CONSTANTS.TAG_CREATION,
    field: 'tagsCount',
  },
};
