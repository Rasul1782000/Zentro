import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    searchAI(body: {
        prompt: string;
    }): Promise<import("./entities/property.entity").Property[] | {
        parsed_intent: {};
        results: any;
        externalLinks: any;
    }>;
    create(createPropertyDto: CreatePropertyDto): Promise<import("./entities/property.entity").Property>;
    findAll(location?: string, minPrice?: number, maxPrice?: number): Promise<import("./entities/property.entity").Property[]>;
    findOne(id: string): Promise<import("./entities/property.entity").Property | null>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<import("./entities/property.entity").Property | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
