import { Place } from 'src/place/entities/place.entity';
import { Province } from 'src/province/entities/province.entity';
import { Territory } from 'src/territory/entities/territory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Region {
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

  @OneToMany(() => Territory, (territory) => territory.region, {
    cascade: ['soft-remove', 'insert'],
  })
  territoryList: Territory[];

  @OneToMany(() => Province, (province) => province.region, {
    cascade: ['soft-remove', 'insert'],
  })
  provinceList: Province[];

  @OneToMany(() => Place, (place) => place.region, {
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
