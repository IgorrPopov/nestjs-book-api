import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 23 })
  id: number;

  @Column()
  @ApiProperty({ example: 'Iliad' })
  title: string;

  @Column()
  @ApiProperty({ example: 'Homer' })
  author: string;

  @Column()
  @ApiProperty({ example: -1180 })
  publishedYear: number;

  @Column()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  text: string;
}
