import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  sellSmarter: string;
  sellSmarterSub: string;
  getStarted: string;
  tryDemo: string;
  farmer: string;
  buyer: string;
  admin: string;
  activeCrops: string;
  marketValue: string;
  activeOffers: string;
  activeOrders: string;
  estimatedEarnings: string;
  todaysMarket: string;
  crop: string;
  price: string;
  change: string;
  demand: string;
  aiRecommendation: string;
  viewDetails: string;
  askAi: string;
  compareBuyers: string;
  myCrops: string;
  addNewCrop: string;
  buyerMatching: string;
  negotiation: string;
  logistics: string;
  orders: string;
  payments: string;
  marketIntel: string;
  notifications: string;
  acceptOffer: string;
  rejectOffer: string;
  negotiatePrice: string;
  calculateNet: string;
  netRevenue: string;
  transportCost: string;
  platformFee: string;
  distance: string;
  reliability: string;
  trustScore: string;
  readyToSell: string;
  grade: string;
  quantity: string;
  minPrice: string;
  harvestDate: string;
  location: string;
  voiceInput: string;
  askQuestionPlaceholder: string;
  demoFarmerName: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'AgriAgent',
    tagline: 'Autonomous AI for Crop Selling, Buyer Matching & Market Negotiation',
    sellSmarter: 'Sell Smarter. Earn Better.',
    sellSmarterSub: 'An AI-powered market agent that helps farmers find buyers, compare offers and negotiate better crop prices without middlemen.',
    getStarted: 'Get Started',
    tryDemo: 'Try Demo Mode',
    farmer: 'Farmer',
    buyer: 'Buyer',
    admin: 'Admin',
    activeCrops: 'Active Produce',
    marketValue: 'Current Market Value',
    activeOffers: 'Active Offers',
    activeOrders: 'Orders in Progress',
    estimatedEarnings: 'Estimated Net Earnings',
    todaysMarket: "Today's Mandi Market Rates",
    crop: 'Crop',
    price: 'Price/kg',
    change: '24h Change',
    demand: 'Market Demand',
    aiRecommendation: '🌾 AI Selling Recommendation',
    viewDetails: 'View Details',
    askAi: 'Consult AI Agent',
    compareBuyers: 'Compare Buyers',
    myCrops: 'My Produce Listings',
    addNewCrop: 'Add New Crop',
    buyerMatching: 'Buyer Matching',
    negotiation: 'Live Price Negotiation',
    logistics: 'Logistics & Transport',
    orders: 'Order Tracking',
    payments: 'Earnings & Payouts',
    marketIntel: 'Market Intelligence',
    notifications: 'Notifications',
    acceptOffer: 'Accept Offer',
    rejectOffer: 'Reject',
    negotiatePrice: 'Negotiate with Buyer',
    calculateNet: 'Calculate Net Profit',
    netRevenue: 'Net Take-Home Revenue',
    transportCost: 'Transportation Cost',
    platformFee: 'Platform Fee (1%)',
    distance: 'Distance',
    reliability: 'Reliability',
    trustScore: 'Buyer Trust Score',
    readyToSell: 'Ready to Sell',
    grade: 'Quality Grade',
    quantity: 'Quantity',
    minPrice: 'Min Acceptable Price',
    harvestDate: 'Harvest Date',
    location: 'Location',
    voiceInput: 'Tap to Speak',
    askQuestionPlaceholder: 'Ask AgriAgent anything about selling your crop...',
    demoFarmerName: 'Ravi Kumar (Hyderabad)'
  },
  te: {
    appName: 'అగ్రి ఏజెంట్ (AgriAgent)',
    tagline: 'పంట అమ్మకాలు, కొనుగోలుదారుల అనుసంధానం మరియు ధరల చర్చకు స్వతంత్ర AI',
    sellSmarter: 'తెలివిగా అమ్మండి. అధిక లాభం పొందండి.',
    sellSmarterSub: 'రైతులకు సరైన కొనుగోలుదారులను వెతికి, రవాణా ఖర్చులు లెక్కించి, మంచి ధరకు బేరం ఆడే AI మార్కెట్ ఏజెంట్.',
    getStarted: 'ప్రారంభించండి',
    tryDemo: 'డెమో ప్రయత్నించండి',
    farmer: 'రైతు (Farmer)',
    buyer: 'కొనుగోలుదారు (Buyer)',
    admin: 'అడ్మిన్ (Admin)',
    activeCrops: 'సిద్ధంగా ఉన్న పంటలు',
    marketValue: 'ప్రస్తుత మార్కెట్ విలువ',
    activeOffers: 'వచ్చిన ఆఫర్లు',
    activeOrders: 'నడుస్తున్న ఆర్డర్లు',
    estimatedEarnings: 'అంచనా నికర ఆదాయం',
    todaysMarket: 'నేటి మండి మార్కెట్ ధరలు',
    crop: 'పంట',
    price: 'ధర/కిలో',
    change: 'మార్పు',
    demand: 'గిరాకీ (డిమాండ్)',
    aiRecommendation: '🌾 AI అమ్మకం సిఫార్సు',
    viewDetails: 'వివరాలు చూడండి',
    askAi: 'AI ఏజెంట్‌ను అడగండి',
    compareBuyers: 'కొనుగోలుదారులను పోల్చండి',
    myCrops: 'నా పంటల జాబితా',
    addNewCrop: 'కొత్త పంట నమోదు',
    buyerMatching: 'కొనుగోలుదారుల మ్యాచ్',
    negotiation: 'ధర చర్చ (బేరం)',
    logistics: 'రవాణా సౌకర్యం',
    orders: 'ఆర్డర్ ట్రాకింగ్',
    payments: 'చెల్లింపులు & ఆదాయం',
    marketIntel: 'మార్కెట్ విశ్లేషణ',
    notifications: 'సమాచారం (నోటిఫికేషన్లు)',
    acceptOffer: 'ఆఫర్ అంగీకరించు',
    rejectOffer: 'తిరస్కరించు',
    negotiatePrice: 'మంచి ధర కోసం చర్చించు',
    calculateNet: 'నికర లాభం లెక్కించు',
    netRevenue: 'చేతికి వచ్చే నికర సొమ్ము',
    transportCost: 'రవాణా ఖర్చు',
    platformFee: 'ప్లాట్‌ఫారమ్ రుసుము (1%)',
    distance: 'దూరం',
    reliability: 'విశ్వసనీయత',
    trustScore: 'నమ్మక స్కోరు',
    readyToSell: 'అమ్మకానికి సిద్ధం',
    grade: 'నాణ్యత రకం',
    quantity: 'పరిమాణం',
    minPrice: 'కనీస ధర',
    harvestDate: 'కోత తేదీ',
    location: 'ప్రాంతం',
    voiceInput: 'మాట్లాడటానికి నొక్కండి',
    askQuestionPlaceholder: 'మీ పంట అమ్మకం గురించి ఏదైనా అడగండి...',
    demoFarmerName: 'రవి కుమార్ (హైదరాబాద్)'
  },
  hi: {
    appName: 'एग्री एजेंट (AgriAgent)',
    tagline: 'फसल बिक्री, खरीदार मिलान और बाजार बातचीत के लिए स्वायत्त AI',
    sellSmarter: 'सही बेचें। बेहतर कमाएं।',
    sellSmarterSub: 'एक AI-संचालित मार्केट एजेंट जो किसानों को सही खरीदार ढूंढने, ऑफर की तुलना करने और बिना बिचौलियों के बेहतर दाम पाने में मदद करता है।',
    getStarted: 'शुरू करें',
    tryDemo: 'डेमो मोड आज़माएं',
    farmer: 'किसान (Farmer)',
    buyer: 'खरीदार (Buyer)',
    admin: 'व्यवस्थापक (Admin)',
    activeCrops: 'सक्रिय फसलें',
    marketValue: 'वर्तमान बाजार मूल्य',
    activeOffers: 'सक्रिय ऑफर',
    activeOrders: 'प्रगति में ऑर्डर',
    estimatedEarnings: 'अनुमानित शुद्ध आय',
    todaysMarket: 'आज के मंडी भाव',
    crop: 'फसल',
    price: 'दाम/किग्रा',
    change: 'बदलाव',
    demand: 'बाजार मांग',
    aiRecommendation: '🌾 AI बिक्री सिफारिश',
    viewDetails: 'विवरण देखें',
    askAi: 'AI से पूछें',
    compareBuyers: 'खरीदारों की तुलना करें',
    myCrops: 'मेरी फसलें',
    addNewCrop: 'नई फसल जोड़ें',
    buyerMatching: 'खरीदार मिलान',
    negotiation: 'कीमत पर बातचीत',
    logistics: 'परिवहन एवं लॉजिस्टिक्स',
    orders: 'ऑर्डर ट्रैकिंग',
    payments: 'भुगतान और कमाई',
    marketIntel: 'बाजार भाव विश्लेषण',
    notifications: 'सूचनाएं',
    acceptOffer: 'ऑफर स्वीकार करें',
    rejectOffer: 'अस्वीकार करें',
    negotiatePrice: 'बातचीत करें',
    calculateNet: 'शुद्ध लाभ गणना',
    netRevenue: 'हाथ में आने वाला शुद्ध लाभ',
    transportCost: 'परिवहन लागत',
    platformFee: 'प्लेटफ़ॉर्म शुल्क (1%)',
    distance: 'दूरी',
    reliability: 'विश्वसनीयता',
    trustScore: 'विश्वास स्कोर',
    readyToSell: 'बिक्री के लिए तैयार',
    grade: 'गुणवत्ता ग्रेड',
    quantity: 'मात्रा',
    minPrice: 'न्यूनतम स्वीकार्य मूल्य',
    harvestDate: 'कटाई की तारीख',
    location: 'स्थान',
    voiceInput: 'बोलने के लिए दबाएं',
    askQuestionPlaceholder: 'फसल बिक्री के बारे में AgriAgent से पूछें...',
    demoFarmerName: 'रवि कुमार (हैदराबाद)'
  },
  kn: {
    appName: 'ಅಗ್ರಿ ಏಜೆಂಟ್ (AgriAgent)',
    tagline: 'ಬೆಳೆ ಮಾರಾಟ, ಖರೀದಿದಾರರ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಚರ್ಚೆಗಾಗಿ ಸ್ವಾಯತ್ತ AI',
    sellSmarter: 'ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಮಾರಿ. ಉತ್ತಮವಾಗಿ ಗಳಿಸಿ.',
    sellSmarterSub: 'ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ರೈತರಿಗೆ ಸರಿಯಾದ ಖರೀದಿದಾರರನ್ನು ಹುಡುಕಲು, ಸಾರಿಗೆ ವೆಚ್ಚ ಕಳೆದು ಲಾಭ ಲೆಕ್ಕಹಾಕಲು ಮತ್ತು ಉತ್ತಮ ಬೆಲೆ ಮಾತುಕತೆಗೆ ನೆರವಾಗುವ AI ಏಜೆಂಟ್.',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    tryDemo: 'ಡೆಮೊ ಮೋಡ್ ಪ್ರಯತ್ನಿಸಿ',
    farmer: 'ರೈತ (Farmer)',
    buyer: 'ಖರೀದಿದಾರ (Buyer)',
    admin: 'ಅಡ್ಮಿನ್ (Admin)',
    activeCrops: 'ಮಾರಾಟಕ್ಕಿರುವ ಬೆಳೆಗಳು',
    marketValue: 'ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯ',
    activeOffers: 'ಬಂದಿರುವ ಆಫರ್‌ಗಳು',
    activeOrders: 'ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಆರ್ಡರ್‌ಗಳು',
    estimatedEarnings: 'ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ',
    todaysMarket: 'ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ಧಾರಣೆ',
    crop: 'ಬೆಳೆ',
    price: 'ಬೆಲೆ/ಕೆಜಿ',
    change: 'ಬದಲಾವಣೆ',
    demand: 'ಬೇಡಿಕೆ',
    aiRecommendation: '🌾 AI ಮಾರಾಟ ಶಿಫಾರಸು',
    viewDetails: 'ವಿವರ ನೋಡಿ',
    askAi: 'AI ಗೆ ಕೇಳಿ',
    compareBuyers: 'ಖರೀದಿದಾರರನ್ನು ಹೋಲಿಸಿ',
    myCrops: 'ನನ್ನ ಬೆಳೆಗಳು',
    addNewCrop: 'ಹೊಸ ಬೆಳೆ ಸೇರಿಸಿ',
    buyerMatching: 'ಖರೀದಿದಾರರ ಹೊಂದಾಣಿಕೆ',
    negotiation: 'ಬೆಲೆ ಮಾತುಕತೆ',
    logistics: 'ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ',
    orders: 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    payments: 'ಪಾವತಿ & ಗಳಿಕೆ',
    marketIntel: 'ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ',
    notifications: 'ಸೂಚನೆಗಳು',
    acceptOffer: 'ಆಫರ್ ಸ್ವೀಕರಿಸಿ',
    rejectOffer: 'ತಿರಸ್ಕರಿಸಿ',
    negotiatePrice: 'ಬೆಲೆಗಾಗಿ ಚರ್ಚಿಸಿ',
    calculateNet: 'ನಿವ್ವಳ ಲಾಭ ಲೆಕ್ಕಾಚಾರ',
    netRevenue: 'ಕೈಗೆ ಸಿಗುವ ನಿವ್ವಳ ಹಣ',
    transportCost: 'ಸಾರಿಗೆ ವೆಚ್ಚ',
    platformFee: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕ (1%)',
    distance: 'ದೂರ',
    reliability: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
    trustScore: 'ವಿಶ್ವಾಸಾರ್ಹತೆ ಸ್ಕೋರ್',
    readyToSell: 'ಮಾರಾಟಕ್ಕೆ ಸಿದ್ಧ',
    grade: 'ಗುಣಮಟ್ಟದ ದರ್ಜೆ',
    quantity: 'ಪ್ರಮಾಣ',
    minPrice: 'ಕನಿಷ್ಠ ಒಪ್ಪಿತ ಬೆಲೆ',
    harvestDate: 'ಕೊಯ್ಲು ದಿನಾಂಕ',
    location: 'ಸ್ಥಳ',
    voiceInput: 'ಮಾತನಾಡಲು ಒತ್ತಿರಿ',
    askQuestionPlaceholder: 'ಬೆಳೆ ಮಾರಾಟದ ಬಗ್ಗೆ AgriAgent ಗೆ ಕೇಳಿ...',
    demoFarmerName: 'ರವಿ ಕುಮಾರ್ (ಹೈದರಾಬಾದ್)'
  }
};
