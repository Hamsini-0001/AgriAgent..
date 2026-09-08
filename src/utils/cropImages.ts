export const CROP_IMAGES: Record<string, string> = {
  'Tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
  'Chilli': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80',
  'Onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80',
  'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
  'Cotton': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&auto=format&fit=crop&q=80',
  'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
  'Rice (Basmati)': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
  'Turmeric': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
  'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
  'Soybean': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
  'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80'
};

export function getCropImage(cropName: string, customImage?: string): string {
  if (customImage && !customImage.includes('photo-1592924357228-91a4daadcfea')) {
    return customImage;
  }
  const clean = cropName.trim();
  for (const [key, url] of Object.entries(CROP_IMAGES)) {
    if (clean.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(clean.toLowerCase())) {
      return url;
    }
  }
  return CROP_IMAGES['Tomato'];
}
