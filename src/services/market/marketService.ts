import { MarketPrice, HistoricalPrice } from '../../types';
import { StorageService } from '../storage';

export class MarketService {
  public static getMandiPrices(crop?: string, state?: string): MarketPrice[] {
    const all = StorageService.getMarketPrices();
    let res = all;
    if (crop && crop !== 'All') {
      res = res.filter(p => p.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    if (state && state !== 'All') {
      res = res.filter(p => p.state.toLowerCase() === state.toLowerCase());
    }
    return res;
  }

  public static getHistoricalTrend(crop: string): HistoricalPrice[] {
    return StorageService.getHistoricalPrices();
  }

  public static getMarketSummary(crop: string = 'Tomato') {
    const prices = this.getMandiPrices(crop);
    const avg = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b.currentPrice, 0) / prices.length) : 26;
    const max = prices.length > 0 ? Math.max(...prices.map(p => p.currentPrice)) : 28;
    const min = prices.length > 0 ? Math.min(...prices.map(p => p.currentPrice)) : 24;

    return {
      averagePrice: avg,
      maxPrice: max,
      minPrice: min,
      demandIndex: 'High',
      priceChange24h: '+₹2/kg',
      forecastNext3Days: '₹27–₹29/kg'
    };
  }
}
