import React from 'react';
import { motion } from 'motion/react';
import { PCComponent } from '../types';
import { Shield, Sparkles, Check, DollarSign, Calendar, Info, Layers, RefreshCw } from 'lucide-react';

interface ComponentDetailsProps {
  component: PCComponent | null;
  onToggleInOffer: (id: string) => void;
  isIncluded: boolean;
}

export const ComponentDetails: React.FC<ComponentDetailsProps> = ({
  component,
  onToggleInOffer,
  isIncluded,
}) => {
  if (!component) {
    return (
      <div className="bg-[#151619] border border-[#222] rounded-lg p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px] shadow-xl">
        <div className="w-14 h-14 bg-[#0F0F0F] rounded flex items-center justify-center border border-[#222] mb-4 text-[#00F2FF] shadow-md">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-base font-mono tracking-wider text-[#E4E3E0] uppercase">No Component Selected</h3>
        <p className="text-xs text-[#8E9299] mt-2 max-w-sm font-sans leading-relaxed">
          Click on any part in the interactive desk setup above or list below to inspect individual specs, prices, and physical hardware condition.
        </p>
      </div>
    );
  }

  // Get specific category emojis/icons
  const getCategoryIcon = () => {
    switch (component.category) {
      case 'graphics_card': return '🎮';
      case 'processor': return '🧠';
      case 'motherboard': return '📟';
      case 'monitor_primary': return '🖥️';
      case 'monitor_secondary': return '📺';
      case 'stand': return '🏗️';
      case 'ram': return '⚡';
      case 'ssd': return '🚀';
      case 'power_supply': return '🔌';
      case 'case': return '📦';
      default: return '⚙️';
    }
  };

  return (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#151619] border border-[#222] rounded-lg p-6 shadow-xl flex flex-col h-full relative"
    >
      {/* Category badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div>
            <h3 className="text-lg font-light font-serif italic text-white leading-snug">
              {component.name}
            </h3>
          </div>
        </div>

        {/* No configure buttons as requested */}
      </div>

      {/* Main content grid */}
      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {/* About Component */}
        <div>
          <h4 className="text-[10px] font-semibold text-[#8E9299] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
            <Info className="w-3.5 h-3.5 text-[#00F2FF]" />
            OVERVIEW & CONTEXT
          </h4>
          <p className="text-xs text-[#E4E3E0] leading-relaxed bg-[#0F0F0F] p-4 rounded border border-[#222]">
            {component.description}
          </p>
        </div>

        {/* Specifications Grid */}
        <div>
          <h4 className="text-[10px] font-semibold text-[#8E9299] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
            <Layers className="w-3.5 h-3.5 text-[#00F2FF]" />
            HARDWARE SPECIFICATIONS
          </h4>
          <div className="bg-[#0F0F0F] border border-[#222] rounded overflow-hidden text-xs">
            {Object.entries(component.specs).map(([key, val], idx) => (
              <div
                key={key}
                className={`flex justify-between p-2.5 border-[#222] ${
                  idx !== Object.keys(component.specs).length - 1 ? 'border-b' : ''
                } ${idx % 2 === 0 ? 'bg-[#151619]/40' : 'bg-transparent'}`}
              >
                <span className="font-mono text-[11px] text-[#8E9299]">{key}</span>
                <span className="text-[#E4E3E0] font-mono text-[11px] text-right pl-4">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
