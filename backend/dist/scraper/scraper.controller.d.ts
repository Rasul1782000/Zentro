import { ScraperService } from './scraper.service';
export declare class ScraperController {
    private readonly scraperService;
    constructor(scraperService: ScraperService);
    seed(): Promise<{
        message: string;
        count: number;
    }>;
}
