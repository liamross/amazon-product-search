import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  asin!: string;

  @Column()
  name!: string;

  @Column()
  imgUrl!: string;

  @Column()
  category!: string;

  @Column()
  rank!: string;

  @Column()
  dimensions!: string;

  @Column()
  storedDate!: number;
}
