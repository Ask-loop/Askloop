import { AuthenticationMethod, Role } from '@shared/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from 'typeorm';
import { Account } from '@modules/accounts/account.entity';

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

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Account, account => account.user, { cascade: true, eager: true })
  accounts: Account[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
