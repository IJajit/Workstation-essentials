import React, { useState } from 'react';
import { PCComponent } from '../types';
import { pcComponents } from '../data';
import { Layers, Check, Monitor, Cpu, HardDrive, Package, Shield, Settings, BookOpen, Tv, Lightbulb } from 'lucide-react';

interface ComponentCatalogProps {
  activeComponentId: string | null;
  onSelectComponent: (id: string) => void;
  selectedComponentIds: string[];
  onToggleInOffer: (id: string) => void;
}

type FilterCategory = 'custom_built' | 'displays' | 'projector' | 'lamps';

export const ComponentCatalog: React.FC<ComponentCatalogProps> = ({
  activeComponentId,
  onSelectComponent,
  selectedComponentIds,
  onToggleInOffer,
}) => {
  const [filter, setFilter] = useState<FilterCategory>('custom_built');

  const getFilteredComponents = () => {
    if (filter === 'displays') {
      return pcComponents.filter((c) => c.category.startsWith('monitor') || c.category === 'stand');
    } else if (filter === 'projector') {
      return pcComponents.filter((c) => c.category === 'projector');
    } else if (filter === 'lamps') {
      return pcComponents.filter((c) => c.category === 'lamps');
    } else {
      return pcComponents.filter((c) => !c.category.startsWith('monitor') && c.category !== 'stand' && c.category !== 'projector' && c.category !== 'lamps');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'graphics_card':
      case 'processor':
        return <Cpu className="w-3.5 h-3.5 text-[#00F2FF]" />;
      case 'motherboard':
        return <Settings className="w-3.5 h-3.5 text-[#00F2FF]" />;
      case 'monitor_primary':
      case 'monitor_secondary':
      case 'stand':
        return <Monitor className="w-3.5 h-3.5 text-[#00F2FF]" />;
      case 'projector':
        return <Tv className="w-3.5 h-3.5 text-[#00F2FF]" />;
      case 'ram':
      case 'ssd':
        return <HardDrive className="w-3.5 h-3.5 text-[#00F2FF]" />;
      case 'lamps':
        return <Lightbulb className="w-3.5 h-3.5 text-[#00F2FF]" />;
      default:
        return <Package className="w-3.5 h-3.5 text-[#00F2FF]" />;
    }
  };

  const getComponentPrice = (id: string): string | null => {
    switch (id) {
      case 'monitor_primary': return '₹9,000';
      case 'monitor_secondary': return '₹1,500';
      case 'monitor_stand': return '₹1,500';
      case 'projector': return '₹7,000';
      case 'lamp_floor': return '₹750';
      case 'lamp_work': return '₹1,200';
      default: return null;
    }
  };

  const isSelectedInOffer = (id: string) => selectedComponentIds.includes(id);

  return (
    <div className="bg-[#151619] border border-[#222] rounded-lg p-6 shadow-xl">
      {/* Catalog Title and filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-mono tracking-tight text-[#E4E3E0] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00F2FF]" />
            CATALOG
          </h3>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-1 bg-[#0F0F0F] p-1 rounded border border-[#222]">
          {(['custom_built', 'displays', 'projector', 'lamps'] as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold font-mono uppercase transition-all duration-300 ${
                filter === cat
                  ? 'bg-[#00F2FF] text-[#0F0F0F] font-bold'
                  : 'text-[#8E9299] hover:text-[#E4E3E0] hover:bg-[#151619]/50'
              }`}
            >
              {cat === 'custom_built' ? 'Custom Build PC' : cat === 'displays' ? 'Monitors and stand' : cat === 'projector' ? 'Projector' : 'Lamps'}
            </button>
          ))}
        </div>
      </div>

      {/* Components List */}
      <div className="space-y-2">
        {getFilteredComponents().map((comp) => {
          const isActive = activeComponentId === comp.id;
          const price = getComponentPrice(comp.id);
          
          return (
            <div
              key={comp.id}
              onClick={() => onSelectComponent(comp.id)}
              className={`group flex items-center justify-between gap-4 p-3.5 rounded border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#0F0F0F] border-[#00F2FF] shadow-lg shadow-[#00F2FF]/5'
                  : 'bg-[#0F0F0F]/40 border-[#222] hover:bg-[#0F0F0F]/80 hover:border-[#333]'
              }`}
            >
              {/* Left Side: Identity only */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded bg-[#151619] border border-[#222] flex items-center justify-center group-hover:bg-[#0F0F0F] transition-colors">
                    {getCategoryIcon(comp.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className={`text-xs font-semibold truncate ${isActive ? 'text-[#00F2FF]' : 'text-[#E4E3E0] group-hover:text-[#00F2FF]'}`}>
                        {comp.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-[#8E9299] font-mono truncate mt-0.5 max-w-xs md:max-w-md">
                      {Object.entries(comp.specs).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join('  |  ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Price */}
              {price && (
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold font-mono text-[#00F2FF]">
                    {price}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic footer based on filter */}
      {filter === 'custom_built' && (
        <div className="mt-5 pt-4 border-t border-[#222] flex items-center justify-between text-xs text-[#8E9299] font-mono">
          <span>Custom Build PC</span>
          <span className="font-bold text-[#00F2FF]">₹90,000</span>
        </div>
      )}
    </div>
  );
};
