
// src/entities/ContentApiLog.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import {Content} from "./content.entity";

@Entity('content_api_logs')
export class ContentApiLog {
    @PrimaryGeneratedColumn()
    logId!: number;

    @Column({ length: 50 })
    operation!: string;

    @Column({ nullable: true })
    contentId!: number;

    @Column()
    userId!: number;

    @Column({ type: 'text', nullable: true })
    requestData!: string;

    @Column({ type: 'text', nullable: true })
    responseData!: string;

    @Column({ nullable: true })
    statusCode!: number;

    @Column({ type: 'text', nullable: true })
    errorMessage!: string;

    @Column({ length: 50, nullable: true })
    ipAddress!: string;

    @Column({ length: 255, nullable: true })
    userAgent!: string;

    @CreateDateColumn()
    requestDate!: Date;

    @Column({ nullable: true })
    executionTime!: number;

    @ManyToOne(() => Content)
    @JoinColumn({ name: 'contentId' })
    content!: Content;

    // @ManyToOne(() => User)
    // @JoinColumn({ name: 'userId' })
    // user: User;
}