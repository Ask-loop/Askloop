import { AuthenticationMethod, Role } from '@shared/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Account } from '@modules/accounts/account.entity';
import { Question } from '@modules/questions/entities/question.entity';
import { Tag } from '@modules/tags/entities/tag.entity';
import { UsersStats } from './users-stats.entity';
import { Activity } from '@modules/activities/entities/activity.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ type: 'enum', enum: AuthenticationMethod, default: AuthenticationMethod.EMAIL })
  provider: AuthenticationMethod;

  @Column({ nullable: true })
  providerId: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  about: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Account, account => account.user, { cascade: true, eager: true })
  accounts: Account[];

  @OneToMany(() => Question, question => question.user)
  questions: Question[];

  @OneToMany(() => Tag, tag => tag.user)
  tags: Tag[];

  @OneToOne(() => UsersStats, stats => stats.user, { cascade: true, eager: true })
  @JoinColumn()
  stats: UsersStats;

  @OneToMany(() => Activity, activity => activity.user)
  activities: Activity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
