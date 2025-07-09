import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UsersStats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: User;

  @Column({ unique: true })
  userId: number;

  @Column({ default: 0 })
  questionsCount: number;

  @Column({ default: 0 })
  tagsCount: number;

  @Column({ default: 0 })
  answersCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @Column({ default: 0 })
  votesCount: number;

  @Column({ default: 0 })
  reputation: number;

  @Column({ default: 0 })
  badgeGold: number;

  @Column({ default: 0 })
  badgeSilver: number;

  @Column({ default: 0 })
  badgeBronze: number;

  @Column({ default: 0 })
  acceptedAnswersCount: number;

  @Column({ default: 0 })
  notificationsCount: number;

  @UpdateDateColumn()
  lastActiveAt: Date;
}
