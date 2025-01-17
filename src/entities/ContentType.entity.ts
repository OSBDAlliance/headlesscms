// src/entities/ContentType.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

import {Content} from "./content.entity";

@Entity('content_types')
export class ContentType {
    @PrimaryGeneratedColumn()
    contentTypeId!: number;

    @Column({ length: 100, unique: true })
    name!: string;

    @Column({ length: 255, nullable: true })
    description!: string;

    @Column({ type: 'json', nullable: true })
    schema!: string;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn({ nullable: true })
    modifiedDate!: Date;

    @Column({ default: true })
    isActive!: boolean;

    @OneToMany(() => Content, content => content.contentType)
    contents!: Content[];
}