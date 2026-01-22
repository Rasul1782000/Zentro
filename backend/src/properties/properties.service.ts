import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) { }

  create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertiesRepository.create(createPropertyDto);
    return this.propertiesRepository.save(property);
  }

  findAll(query?: { location?: string; minPrice?: number; maxPrice?: number }) {
    const qb = this.propertiesRepository.createQueryBuilder('property');

    if (query?.location) {
      qb.andWhere('property.location ILIKE :location', { location: `%${query.location}%` });
    }

    if (query?.minPrice) {
      qb.andWhere('property.price >= :minPrice', { minPrice: query.minPrice });
    }

    if (query?.maxPrice) {
      qb.andWhere('property.price <= :maxPrice', { maxPrice: query.maxPrice });
    }

    return qb.getMany();
  }

  findOne(id: string) {
    return this.propertiesRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    await this.propertiesRepository.update(id, updatePropertyDto);
    return this.findOne(id);
  }

  async aiSearch(prompt: string) {
    console.log('[AI Search] Prompt:', prompt);
    const OpenAI = require('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [
          {
            role: 'system',
            content: `You are an expert real estate AI assistant for Dubai/UAE. 
            The user will search for properties. You must return a STRICT JSON object (no markdown, no backticks) with two keys:
            1. "results": an array of 4-6 realistic property objects based on the user's query. Each object MUST have:
               - id (mostly random string)
               - title (string)
               - description (short string)
               - price (number, in AED)
               - location (string)
               - type (Apartment, Villa, Penthouse, etc.)
               - bedrooms (number)
               - bathrooms (number)
               - size (number, sqft)
               - images (array of 1 string URL). YOU MUST PICK ONE OF THESE SPECIFIC URLS RANDOMLY:
                 * 'https://images.unsplash.com/photo-1709056330726-00a8ea31059a?w=600&auto=format&fit=crop&q=60'
                 * 'https://images.unsplash.com/photo-1640880997996-c166edb0ba5e?w=600&auto=format&fit=crop&q=60'
                 * 'https://images.unsplash.com/photo-1640877268187-2fa6b2ed7a5f?w=600&auto=format&fit=crop&q=60'
                 * 'https://plus.unsplash.com/premium_photo-1723669629708-0de9b27820b5?w=600&auto=format&fit=crop&q=60'
                 * 'https://plus.unsplash.com/premium_photo-1750235561224-5252ee4a37ef?w=600&auto=format&fit=crop&q=60'
                 * 'https://images.unsplash.com/photo-1724685936874-04193d71bc44?w=600&auto=format&fit=crop&q=60'
            2. "externalLinks": an array of objects showing where to find similar properties on real sites (Dubizzle, PropertyFinder, Bayut).
               Each object must have:
               - title (e.g. "Search on Dubizzle")
               - url (a valid search URL for that platform matching the query location/type)
               - icon (optional, use 'pi pi-external-link')

            Example JSON structure:
            {
              "results": [...],
              "externalLinks": [
                { "title": "View on Dubizzle", "url": "https://dubai.dubizzle.com/property-for-sale/residential/..." }
              ]
            }
            `
          },
          { role: 'user', content: prompt }
        ]
      });

      const rawContent = completion.choices[0].message.content;
      console.log('[AI Search] Raw Response:', rawContent);

      // Clean up potential markdown formatting
      const cleanContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanContent);

      return {
        parsed_intent: {},
        results: result.results || [],
        externalLinks: result.externalLinks || []
      };
    } catch (error) {
      console.error('[AI Search] Error:', error);
      // Fallback to local search if AI fails
      return this.findAll({ location: prompt });
    }
  }

  remove(id: string) {
    return this.propertiesRepository.delete(id);
  }
}
