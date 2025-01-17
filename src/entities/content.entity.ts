// src/entities/Content.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ContentType } from './ContentType.entity';
// import { User } from './User.entity';
import { ContentMetadata } from './ContentMetadata.entity';
import { ContentVersion } from './ContentVersion.entity';
import { ContentCategoryMapping } from './ContentCategoryMapping.entity';

@Entity('content')
export class Content {
    @PrimaryGeneratedColumn()
    contentId!: number;

    @Column({ length: 255 })
    title!: string;

    @Column({ length: 255, unique: true })
    slug!: string;

    @Column({ type: 'text', nullable: true })
    body!: string;

    @Column()
    contentTypeId!: number;

    @Column({ length: 50, default: 'draft' })
    status!: string;

    @Column()
    createdById!: number;

    @CreateDateColumn()
    createdDate!: Date;

    @Column({ nullable: true })
    modifiedById!: number;

    @UpdateDateColumn({ nullable: true })
    modifiedDate!: Date;

    @Column({ type: 'datetime', nullable: true })
    publishedDate!: Date;

    @Column({ default: false })
    isDeleted!: boolean;

    @ManyToOne(() => ContentType)
    @JoinColumn({ name: 'contentTypeId' })
    contentType!: ContentType;

    // @ManyToOne(() => User)
    // @JoinColumn({ name: 'createdById' })
    // createdBy: User;
    //
    // @ManyToOne(() => User)
    // @JoinColumn({ name: 'modifiedById' })
    // modifiedBy: User;

    @OneToMany(() => ContentMetadata, metadata => metadata.content)
    metadata!: ContentMetadata[];

    @OneToMany(() => ContentVersion, version => version.content)
    versions!: ContentVersion[];

    @OneToMany(() => ContentCategoryMapping, mapping => mapping.content)
    categoryMappings!: ContentCategoryMapping[];
}