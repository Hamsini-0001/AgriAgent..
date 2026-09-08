import { BuyerProfile, BuyerOffer } from '../../types';
import { StorageService } from '../storage';

export class BuyerService {
  public static getAllBuyers(): BuyerProfile[] {
    return StorageService.getBuyers();
  }

  public static getBuyersForCrop(crop: string): BuyerProfile[] {
    return StorageService.getBuyers().filter(b =>
      b.cropsRequired.some(c => c.toLowerCase() === crop.toLowerCase())
    );
  }

  public static getFlaggedBuyers(): BuyerProfile[] {
    return StorageService.getBuyers().filter(b => b.cancellationRate > 5.0 || b.trustScore < 80);
  }
}
