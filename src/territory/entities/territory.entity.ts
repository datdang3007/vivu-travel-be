import { Place } from 'src/place/entities/place.entity';
import { Province } from 'src/province/entities/province.entity';
import { Region } from 'src/region/entities/region.entity';
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
export class Territory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slogan: string;

  @Column()
  image: string;

  @Column()
  overview: string;

  @ManyToOne(() => Region, {
    eager: true,
  })
  region: Region;

  @OneToMany(() => Province, (province) => province.territory, {
    cascade: ['soft-remove', 'insert'],
  })
  provinceList: Province[];

  @OneToMany(() => Place, (place) => place.territory, {
    cascade: ['soft-remove', 'insert'],
  })
  placeList: Place[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
