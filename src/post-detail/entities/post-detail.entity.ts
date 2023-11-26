import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, {
    eager: true,
  })
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
