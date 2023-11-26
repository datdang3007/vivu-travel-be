import { PostDetail } from 'src/post-detail/entities/post-detail.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  status: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  creator: User;

  @ManyToOne(() => User, {
    eager: true,
  })
  censor?: User;

  @OneToMany(() => PostDetail, (pd) => pd.post, {
    cascade: ['soft-remove', 'insert'],
  })
  contents: PostDetail[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
