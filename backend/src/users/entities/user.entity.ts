import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() // Use default table name 'user' or specify 'users'
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true }) // Nullable for now in case of social auth later, or just simple
    password: string;

    @Column({ default: 'user' }) // 'admin', 'user'
    role: string;

    @Column({ nullable: true })
    resetPasswordToken: string;

    @Column({ nullable: true })
    resetPasswordExpires: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
