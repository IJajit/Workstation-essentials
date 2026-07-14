export interface PCComponent {
  id: string;
  name: string;
  fullName: string;
  category: 'graphics_card' | 'processor' | 'motherboard' | 'monitor_primary' | 'monitor_secondary' | 'stand' | 'ram' | 'ssd' | 'power_supply' | 'case' | 'projector' | 'lamps';
  originalPrice: number;
  hasOriginalPrice: boolean;
  resaleMin: number;
  resaleMax: number;
  specs: { [key: string]: string };
  description: string;
  condition: string;
  highlights: string[];
  svgId: string; // Used to match with SVG visualizer parts
}

export interface BuyerOffer {
  name: string;
  email: string;
  offeredPrice: number;
  selectedComponentIds: string[];
  message: string;
}
