import { User } from '@modules/users/entities/user.entity';
import { AuthenticationMethod } from '@shared/enums';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  provider: AuthenticationMethod;

  @Column()
  providerAccountId: string;

  @ManyToOne(() => User, user => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
