import { Injectable } from '@nestjs/common';
import { PropertiesService } from '../properties/properties.service';

@Injectable()
export class ScraperService {
  constructor(private readonly propertiesService: PropertiesService) { }

  async seed() {
    const dummyProperties = [
      // The User's specific example request: "2-bedroom apartment in Dubai Marina under AED 100,000"
      {
        title: 'Cozy 2-Bedroom in Marina Promenade',
        description: 'A beautiful 2-bedroom apartment with partial sea view, close to metro and pet-friendly building. Perfect for small families.',
        price: 95000,
        location: 'Dubai Marina',
        type: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        size: 1100,
        images: ['https://images.unsplash.com/photo-1709056330726-00a8ea31059a?w=600&auto=format&fit=crop&q=60'],
      },
      // More Marina options to show filtering
      {
        title: 'High-floor Studio in Marina Gate',
        description: 'Modern studio with direct marina access and state-of-the-art gym.',
        price: 85000,
        location: 'Dubai Marina',
        type: 'Studio',
        bedrooms: 0,
        bathrooms: 1,
        size: 500,
        images: ['https://images.unsplash.com/photo-1640880997996-c166edb0ba5e?w=600&auto=format&fit=crop&q=60'],
      },
      {
        title: 'Luxury 3-Bed Apartment, Marina',
        description: 'Spacious 3-bedroom with full marina view.',
        price: 180000,
        location: 'Dubai Marina',
        type: 'Apartment',
        bedrooms: 3,
        bathrooms: 4,
        size: 2200,
        images: ['https://images.unsplash.com/photo-1640877268187-2fa6b2ed7a5f?w=600&auto=format&fit=crop&q=60'],
      },
      // Downtown options
      {
        title: 'Modern 1-Bed near Burj Khalifa',
        description: 'Walking distance to Dubai Mall, luxury furnishing.',
        price: 130000,
        location: 'Downtown Dubai',
        type: 'Apartment',
        bedrooms: 1,
        bathrooms: 2,
        size: 900,
        images: ['https://plus.unsplash.com/premium_photo-1723669629708-0de9b27820b5?w=600&auto=format&fit=crop&q=60'],
      },
      {
        title: 'Vibrant 2-Bed in Downtown',
        description: 'High floor, city view, pool and gym access.',
        price: 160000,
        location: 'Downtown Dubai',
        type: 'Apartment',
        bedrooms: 2,
        bathrooms: 3,
        size: 1400,
        images: ['https://plus.unsplash.com/premium_photo-1750235561224-5252ee4a37ef?w=600&auto=format&fit=crop&q=60'],
      },
      // Villas
      {
        title: 'Family Villa in Springs',
        description: 'Renovated 3-bedroom villa with private garden and lake view.',
        price: 250000,
        location: 'The Springs',
        type: 'Villa',
        bedrooms: 3,
        bathrooms: 3,
        size: 2800,
        images: ['https://images.unsplash.com/photo-1724685936874-04193d71bc44?w=600&auto=format&fit=crop&q=60'],
      },
      {
        title: 'Luxury Mansion in Palm Jumeirah',
        description: 'Exclusive 5-bedroom villa with private beach access.',
        price: 1500000, // Yearly rent context
        location: 'Palm Jumeirah',
        type: 'Villa',
        bedrooms: 5,
        bathrooms: 6,
        size: 7000,
        images: ['https://images.unsplash.com/photo-1709056330726-00a8ea31059a?w=600&auto=format&fit=crop&q=60'],
      },
      // Budget Friendly
      {
        title: 'Affordable Studio in JVC',
        description: 'New building, community view, quiet neighborhood.',
        price: 45000,
        location: 'Jumeirah Village Circle',
        type: 'Studio',
        bedrooms: 0,
        bathrooms: 1,
        size: 450,
        images: ['https://images.unsplash.com/photo-1640880997996-c166edb0ba5e?w=600&auto=format&fit=crop&q=60'],
      },
    ];

    for (const prop of dummyProperties) {
      await this.propertiesService.create(prop);
    }

    return { message: 'Seeding complete', count: dummyProperties.length };
  }
}
