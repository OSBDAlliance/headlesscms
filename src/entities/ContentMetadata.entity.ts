// src/entities/ContentMetadata.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Unique
} from 'typeorm';
import {Content} from "./content.entity";

@Entity('content_metadata')
export class ContentMetadata {
    @PrimaryGeneratedColumn()
    metadataId!: number;

    @Column()
    contentId!: number;

    @Column({length: 100})
    metaKey!: string;

    @Column({type: 'text', nullable: true})
    metaValue!: string;

    @ManyToOne(() => Content, content => content.metadata)
    @JoinColumn({name: 'contentId'})
    content!: Content;

// @Unique(['contentId', 'metaKey'])
}