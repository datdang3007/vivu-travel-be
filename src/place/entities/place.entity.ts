import { Content } from 'src/content/entities/content.entity';
import { PlaceImage } from 'src/place-image/entities/place-image.entity';
import { Province } from 'src/province/entities/province.entity';
import { Region } from 'src/region/entities/region.entity';
import { Territory } from 'src/territory/entities/territory.entity';
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
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Content, (content) => content.place, {
    cascade: ['soft-remove', 'insert'],
  })
  contents: Content[];

  @OneToMany(() => PlaceImage, (place_image) => place_image.place, {
    cascade: ['soft-remove', 'insert'],
  })
  image_stock: PlaceImage[];

  @ManyToOne(() => Region, {
    eager: true,
  })
  region: Region;

  @ManyToOne(() => Territory, {
    eager: true,
  })
  territory: Territory;

  @ManyToOne(() => Province, {
    eager: true,
  })
  province: Province;

  @Column()
  overview: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
