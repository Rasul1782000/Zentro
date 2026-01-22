import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column('decimal')
    price: number;

    @Column()
    location: string;

    @Column()
    type: string; // Apartment, Villa, etc.

    @Column({ nullable: true })
    bedrooms: number;

    @Column({ nullable: true })
    bathrooms: number;

    @Column({ nullable: true })
    size: number; // in sqft

    @Column('simple-array', { nullable: true })
    images: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

