export type Answer = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAnswer = Pick<Answer, 'content'> & {
  questionId: number;
  userId: number;
};
