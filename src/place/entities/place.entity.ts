import { Content } from 'src/content/entities/content.entity';
import { PlaceCategory } from 'src/place-category/entities/place-category.entity';
import { PlaceImage } from 'src/place-image/entities/place-image.entity';
import { Province } from 'src/province/entities/province.entity';
import { Region } from 'src/region/entities/region.entity';
import { Territory } from 'src/territory/entities/territory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => PlaceCategory, (category) => category.place, {
    cascade: ['soft-remove', 'insert'],
  })
  @JoinTable({
    name: 'place_tourism_types',
    joinColumn: {
      name: 'place_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'place_category_id',
      referencedColumnName: 'id',
    },
  })
  category: PlaceCategory[];

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
