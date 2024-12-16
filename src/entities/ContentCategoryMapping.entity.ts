// src/entities/ContentCategoryMapping.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import {Content} from "./content.entity";
import {ContentCategory} from "./ContentCategory.entity";

@Entity('content_category_mapping')
export class ContentCategoryMapping {
    @PrimaryColumn()
    contentId!: number;

    @PrimaryColumn()
    categoryId!: number;

    @ManyToOne(() => Content, content => content.categoryMappings)
    @JoinColumn({ name: 'contentId' })
    content!: Content;

    @ManyToOne(() => ContentCategory, category => category.contentMappings)
    @JoinColumn({ name: 'categoryId' })
    category!: ContentCategory;
}