import { User } from '@modules/users/entities/user.entity';
import { AuthenticationMethod } from '@common/enums';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  provider: AuthenticationMethod;

  @Column({ unique: true })
  providerAccountId: string;

  @ManyToOne(() => User, user => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
