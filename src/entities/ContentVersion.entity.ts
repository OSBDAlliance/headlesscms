
// src/entities/ContentVersion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

import {Content} from "./content.entity";

@Entity('content_versions')
export class ContentVersion {
    @PrimaryGeneratedColumn()
    versionId!: number;

    @Column()
    contentId!: number;

    @Column({ length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    body!: string;

    @Column()
    version!: number;

    @Column()
    createdById!: number;

    @CreateDateColumn()
    createdDate!: Date;

    @Column({ length: 500, nullable: true })
    changeComment!: string;

    @ManyToOne(() => Content, content => content.versions)
    @JoinColumn({ name: 'contentId' })
    content!: Content;

    // @ManyToOne(() => User)
    // @JoinColumn({ name: 'createdById' })
    // createdBy: User;
}