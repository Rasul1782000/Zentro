import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
export declare class PropertiesService {
    private propertiesRepository;
    constructor(propertiesRepository: Repository<Property>);
    create(createPropertyDto: CreatePropertyDto): Promise<Property>;
    findAll(query?: {
        location?: string;
        minPrice?: number;
        maxPrice?: number;
    }): Promise<Property[]>;
    findOne(id: string): Promise<Property | null>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property | null>;
    aiSearch(prompt: string): Promise<Property[] | {
        parsed_intent: {};
        results: any;
        externalLinks: any;
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
