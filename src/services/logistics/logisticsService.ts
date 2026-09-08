import { VehicleOption, LogisticsBooking } from '../../types';
import { StorageService } from '../storage';

export class LogisticsService {
  public static getVehicles(): VehicleOption[] {
    return StorageService.getVehicles();
  }

  public static calculateCost(vehicleId: string, distanceKm: number): number {
    const v = StorageService.getVehicles().find(veh => veh.id === vehicleId) || StorageService.getVehicles()[0];
    return v.baseCost + (v.costPerKm * distanceKm);
  }

  public static recommendVehicle(weightKg: number): VehicleOption {
    const vehicles = StorageService.getVehicles();
    const sorted = [...vehicles].sort((a, b) => a.capacityKg - b.capacityKg);
    const matched = sorted.find(v => v.capacityKg >= weightKg);
    return matched || vehicles[0];
  }
}
