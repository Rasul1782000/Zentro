import { PropertiesService } from '../properties/properties.service';
export declare class ScraperService {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    seed(): Promise<{
        message: string;
        count: number;
    }>;
}
