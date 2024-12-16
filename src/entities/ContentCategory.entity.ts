
// src/entities/ContentCategory.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import {ContentCategoryMapping} from "./ContentCategoryMapping.entity";

@Entity('content_categories')
export class ContentCategory {
    @PrimaryGeneratedColumn()
    categoryId!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 100, unique: true })
    slug!: string;

    @Column({ nullable: true })
    parentCategoryId!: number;

    @Column({ length: 255, nullable: true })
    description!: string;

    @Column({ default: true })
    isActive!: boolean;

    @ManyToOne(() => ContentCategory)
    @JoinColumn({ name: 'parentCategoryId' })
    parentCategory!: ContentCategory;

    @OneToMany(() => ContentCategoryMapping, mapping => mapping.category)
    contentMappings!: ContentCategoryMapping[];
}
