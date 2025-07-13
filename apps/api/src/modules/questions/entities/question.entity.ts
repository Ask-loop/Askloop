import { Tag } from '@modules/tags/entities/tag.entity';
import { User } from '@modules/users/entities/user.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import slugify from 'slugify';
import { QuestionVote } from './question-vote.entity';
import { VoteType } from '@shared/enums';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Index()
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

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  answersCount: number;

  @OneToMany(() => QuestionVote, vote => vote.question, { cascade: true })
  votes: QuestionVote[];

  get upvotes(): number {
    return this.votes?.filter(v => v.vote === VoteType.Up).length || 0;
  }

  get downvotes(): number {
    return this.votes?.filter(v => v.vote === VoteType.Down).length || 0;
  }

  get score(): number {
    return this.upvotes - this.downvotes;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async beforeInsert() {
    await this.generateSlug();
  }

  @BeforeUpdate()
  async beforeUpdate() {
    // Only regenerate slug if title has changed
    const originalQuestion = await Question.findOne({ where: { id: this.id } });
    if (originalQuestion && originalQuestion.title !== this.title) {
      await this.generateSlug();
    }
  }

  private async generateSlug() {
    const baseSlug = slugify(this.title, { lower: true, strict: true });

    // Try the base slug first
    let finalSlug = baseSlug;
    let counter = 1;

    // Check if slug exists and generate a unique one
    while (await Question.findOne({ where: { slug: finalSlug } })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = finalSlug;
  }
}
