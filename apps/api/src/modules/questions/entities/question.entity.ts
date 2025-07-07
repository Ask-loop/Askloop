import { Tag } from '@modules/tags/entities/tag.entity';
import { User } from '@modules/users/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  body: string;

  @ManyToOne(() => User, user => user.questions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Tag, tag => tag.questions, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;
}
