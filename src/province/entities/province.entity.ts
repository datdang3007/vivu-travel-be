import { Region } from 'src/region/entities/region.entity';
import { Territory } from 'src/territory/entities/territory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({
    unique: true,
    where: `"deleted_at" is null`,
  })
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => Region, {
    eager: true,
  })
  region: Region;

  @ManyToOne(() => Territory, {
    eager: true,
  })
  territory: Territory;

  @Column()
  overview: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
