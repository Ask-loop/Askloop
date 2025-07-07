import { ActivityType } from '@common/types/general.types';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.activities, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'enum', enum: ActivityType })
  type: ActivityType;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
