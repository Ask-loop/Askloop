export enum VoteType {
  Up = 'up',
  Down = 'down',
}

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum OrderByField {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum ActivityType {
  Question = 'question',
  Answer = 'answer',
  Comment = 'comment',
  Vote = 'vote',
  Edit = 'edit',
  Delete = 'delete',
  Accept = 'accept',
  Tag = 'tag',
  Follow = 'follow',
  Bookmark = 'bookmark',
  Share = 'share',
  Report = 'report',
  Badge = 'badge',
  Login = 'login',
  Registration = 'registration',
  AcceptAnswer = 'acceptAnswer',
}
