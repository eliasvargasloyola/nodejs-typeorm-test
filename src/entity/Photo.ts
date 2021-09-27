import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";
import { Author } from "./Author";

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  title: string;
  @Column("text")
  description: string;
  @Column()
  fileName: string;
  @Column("numeric", { default: 0 })
  views: number;
  @Column({ default: false })
  published: boolean;

  @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo, { nullable: true })
  metadata: PhotoMetadata;

  @ManyToOne(type => Author, author => author.photos)
  author: Author;
}
