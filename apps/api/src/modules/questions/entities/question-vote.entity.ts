import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Question } from './question.entity';
import { User } from '@modules/users/entities/user.entity';
import { VoteType } from '@shared/enums';

@Entity()
@Unique(['question', 'user'])
export class QuestionVote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, question => question.votes, { onDelete: 'CASCADE' })
  question: Question;

  @ManyToOne(() => User, user => user.questionVotes)
  user: User;

  @Column({ type: 'enum', enum: VoteType, default: VoteType.Up })
  vote: VoteType;

  @Column({ type: 'int', default: 0 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setDefaultValue() {
    if (this.vote === VoteType.Up) {
      this.value = 1;
    } else {
      this.value = -1;
    }
  }
}
