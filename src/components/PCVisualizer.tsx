import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PCComponent } from '../types';
import { pcComponents } from '../data';
import { Monitor, Cpu, Layers, HardDrive, Shield, HelpCircle, Check, Zap, Eye, Lightbulb } from 'lucide-react';

interface PCVisualizerProps {
  activeComponentId: string | null;
  onSelectComponent: (id: string) => void;
  selectedComponentIds: string[];
  onToggleComponentInOffer: (id: string) => void;
}

type LEDColor = 'orange' | 'cyan' | 'purple' | 'green' | 'off';

export const PCVisualizer: React.FC<PCVisualizerProps> = ({
  activeComponentId,
  onSelectComponent,
  selectedComponentIds,
  onToggleComponentInOffer,
}) => {
  const [ledColor, setLedColor] = useState<LEDColor>('cyan');
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  // Helper to determine LED glow colors
  const getGlowColor = (type: 'text' | 'stroke' | 'fill' | 'shadow') => {
    if (ledColor === 'off') {
      return type === 'text' ? 'text-gray-500' : type === 'shadow' ? 'none' : '#222';
    }
    const colors = {
      orange: {
        text: 'text-amber-500',
        stroke: '#ff6200',
        fill: '#ff5722',
        shadow: 'rgba(255, 87, 34, 0.4)',
      },
      cyan: {
        text: 'text-[#00F2FF]',
        stroke: '#00F2FF',
        fill: '#00F2FF',
        shadow: 'rgba(0, 242, 255, 0.4)',
      },
      purple: {
        text: 'text-fuchsia-500',
        stroke: '#d946ef',
        fill: '#e879f9',
        shadow: 'rgba(217, 70, 239, 0.4)',
      },
      green: {
        text: 'text-emerald-500',
        stroke: '#10b981',
        fill: '#34d399',
        shadow: 'rgba(16, 185, 129, 0.4)',
      },
    };
    return colors[ledColor][type];
  };

  const getComponentPriceString = (id: string) => {
    const component = pcComponents.find((c) => c.id === id);
    if (!component) return '';
    return `₹${component.resaleMin.toLocaleString()} - ₹${component.resaleMax.toLocaleString()}`;
  };

  const isIncluded = (id: string) => selectedComponentIds.includes(id);

  return (
    <div id="interactive-desk" className="bg-[#151619] border border-[#222] rounded-lg p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
      
      {/* SVG Setup Stage */}
      <div className="w-full max-w-[760px] aspect-[16/10] bg-[#0F0F0F] rounded-lg p-4 border border-[#222] relative flex items-center justify-center select-none shadow-inner">
        
        {/* Ambient room backlight */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-1000 blur-[80px]"
          style={{
            background: ledColor === 'off' ? 'transparent' : `radial-gradient(circle at 70% 30%, ${getGlowColor('fill')} 0%, transparent 60%)`,
          }}
        />

        {/* Dynamic component hover popup */}
        <AnimatePresence>
          {hoveredComponent && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-4 left-4 bg-[#151619]/95 backdrop-blur-md border border-[#333] px-4 py-2.5 rounded-md shadow-xl z-20 pointer-events-none max-w-[260px]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[9px] font-bold text-[#8E9299] uppercase tracking-widest font-mono">
                  {pcComponents.find(c => c.id === hoveredComponent)?.category.replace('_', ' ')}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-[#E4E3E0] truncate mt-1">
                {pcComponents.find(c => c.id === hoveredComponent)?.name}
              </h4>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vector SVG Canvas */}
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions */}
          <defs>
            {/* Screen Gradients */}
            <linearGradient id="dellScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="samsungScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#020408" />
            </linearGradient>

            {/* LED Glowing Gradients */}
            <linearGradient id="ledFanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={getGlowColor('fill')} stopOpacity="0.8" />
              <stop offset="50%" stopColor={getGlowColor('fill')} stopOpacity="0.2" />
              <stop offset="100%" stopColor={getGlowColor('fill')} stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="ramGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={getGlowColor('fill')} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BACKGROUND DESK AND FLOOR DETAILS */}
          {/* Wood Desk surface */}
          <rect x="30" y="420" width="740" height="15" rx="3" fill="#2d1d13" stroke="#1f140e" strokeWidth="1" />
          <rect x="30" y="435" width="740" height="6" fill="#1b120c" />
          
          {/* Steel desk grommet/legs support */}
          <rect x="90" y="441" width="22" height="60" fill="#333" />
          <rect x="688" y="441" width="22" height="60" fill="#333" />
          
          {/* Back Wall Horizontal Line */}
          <line x1="0" y1="410" x2="800" y2="410" stroke="#1c1d21" strokeWidth="1" strokeDasharray="5,5" />

          {/* ==================== MULTI-MONITOR ASSEMBLY ==================== */}

          {/* DELL P2419H (Primary Monitor) - ID: monitor_primary */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectComponent('monitor_primary')}
            onMouseEnter={() => setHoveredComponent('monitor_primary')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Monitor Stand Base & Arm */}
            <path d="M 330 420 L 370 420 L 360 280 L 340 280 Z" fill="#2c2d30" stroke="#1e1f21" strokeWidth="1" />
            <rect x="300" y="415" width="100" height="6" rx="2" fill="#3a3c42" />
            
            {/* Monitor Outer Frame/Cabinet */}
            <rect
              x="190" y="100" width="320" height="190" rx="4"
              fill="#18191b"
              stroke={activeComponentId === 'monitor_primary' ? '#00F2FF' : hoveredComponent === 'monitor_primary' ? '#4b5563' : '#27282c'}
              strokeWidth={activeComponentId === 'monitor_primary' ? 2 : 1}
              className="transition-all duration-300"
              style={{
                filter: activeComponentId === 'monitor_primary' ? 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.45))' : 'none'
              }}
            />
            {/* Screen Inner Display Area */}
            <rect x="194" y="104" width="312" height="174" fill="url(#dellScreenGrad)" />

            {/* Screen Wallpaper Graphics - representing visualizer desktop */}
            {/* Grid background */}
            <g opacity="0.15">
              <line x1="194" y1="130" x2="506" y2="130" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="194" y1="160" x2="506" y2="160" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="194" y1="190" x2="506" y2="190" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="194" y1="220" x2="506" y2="220" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="194" y1="250" x2="506" y2="250" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="250" y1="104" x2="250" y2="278" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="310" y1="104" x2="310" y2="278" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="370" y1="104" x2="370" y2="278" stroke="#00F2FF" strokeWidth="0.5" />
              <line x1="430" y1="104" x2="430" y2="278" stroke="#00F2FF" strokeWidth="0.5" />
            </g>
            
            {/* Beautiful digital landscape abstract on monitor */}
            <polygon points="194,278 260,190 320,240 400,160 506,278" fill="#151619" opacity="0.5" />
            <polygon points="210,278 280,210 340,250 440,140 506,278" fill="#0F0F0F" opacity="0.75" />
            <circle cx="440" cy="140" r="12" fill="#00F2FF" opacity="0.6" />

            {/* Dell screen displays a clean background only */}
            <rect x="335" y="278" width="30" height="2" fill="#888" />
          </g>


          {/* SAMSUNG SYNCMASTER (Secondary Monitor) - ID: monitor_secondary */}
          {/* Positioned on the left, slightly angled */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectComponent('monitor_secondary')}
            onMouseEnter={() => setHoveredComponent('monitor_secondary')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Round Sturdy Stand */}
            <path d="M 120 420 L 140 420 L 135 340 L 125 340 Z" fill="#2d2d30" stroke="#1a1a1c" strokeWidth="1" />
            <ellipse cx="130" cy="418" rx="35" ry="8" fill="#222" stroke="#111" strokeWidth="1" />
            
            {/* Monitor Cabinet/Frame (Thicker bezel for older monitor style) */}
            <rect
              x="40" y="160" width="180" height="146" rx="4"
              fill="#26272b"
              stroke={activeComponentId === 'monitor_secondary' ? '#00F2FF' : hoveredComponent === 'monitor_secondary' ? '#4b5563' : '#1e1f21'}
              strokeWidth={activeComponentId === 'monitor_secondary' ? 2 : 1}
              className="transition-all duration-300"
              style={{
                filter: activeComponentId === 'monitor_secondary' ? 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.45))' : 'none'
              }}
            />
            {/* Screen Inner Display Area */}
            <rect x="46" y="166" width="168" height="126" fill="url(#samsungScreenGrad)" />

            {/* Simulated Chat Interface or Server logs */}
            <g opacity="0.6">
              {/* Terminal-like text lines */}
              <rect x="52" y="174" width="60" height="5" fill="#00F2FF" rx="1" opacity="0.7" />
              <rect x="52" y="184" width="110" height="4" fill="#38bdf8" rx="1" />
              <rect x="52" y="192" width="85" height="4" fill="#64748b" rx="1" />
              <rect x="52" y="200" width="130" height="4" fill="#f1f5f9" rx="1" />
              
              <rect x="52" y="214" width="75" height="5" fill="#00F2FF" rx="1" opacity="0.7" />
              <rect x="52" y="224" width="120" height="4" fill="#38bdf8" rx="1" />
              <rect x="52" y="232" width="100" height="4" fill="#f1f5f9" rx="1" />
              
              {/* Mini Spotify widget representation */}
              <rect x="52" y="250" width="156" height="32" rx="3" fill="#111" />
              <circle cx="68" cy="266" r="10" fill="#00F2FF" />
              <path d="M 64 266 Q 68 262 72 266" stroke="#0F0F0F" strokeWidth="1" fill="none" />
              <rect x="84" y="260" width="60" height="4" fill="#fff" />
              <rect x="84" y="268" width="40" height="3" fill="#555" />
            </g>

            {/* Old monitor design detail lines at bottom bezel */}
            <circle cx="130" cy="298" r="1.5" fill="#888" />
            <circle cx="200" cy="298" r="1" fill="#00F2FF" /> {/* Power LED */}
          </g>


          {/* ==================== THE COMPUTER CASE ASSEMBLY ==================== */}

          {/* COMPUTER CASE CHASSIS - ID: case */}
          {/* Built as a grouped interactive element or transparent screen to view internals */}
          <g transform="translate(540, 110)">
            {/* The outer solid case body (matte black paint) */}
            <rect
              x="0" y="0" width="190" height="310" rx="4"
              fill="#0d0e11"
              stroke={activeComponentId === 'case' ? '#00F2FF' : hoveredComponent === 'case' ? '#4b5563' : '#222328'}
              strokeWidth={activeComponentId === 'case' ? 2 : 1}
              className="transition-all duration-300"
              style={{
                filter: activeComponentId === 'case' ? 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.45))' : 'none'
              }}
              onClick={(e) => {
                // Only select case if we clicked on the boundary edge, not the components inside
                onSelectComponent('case');
                e.stopPropagation();
              }}
              onMouseEnter={() => setHoveredComponent('case')}
              onMouseLeave={() => setHoveredComponent(null)}
            />

            {/* Front Panel Sleek Geometric Cutting with Accent Light (Corsair SPEC-05 style) */}
            <g>
              <path d="M 160 0 L 190 40 L 190 310 L 160 310 Z" fill="#14161b" />
              <path d="M 160 0 L 163 0 L 190 36 L 190 40 Z" fill="#2d3039" />
              
              {/* Glowing Front LED Streak (matches the LED setting!) */}
              {ledColor !== 'off' && (
                <path
                  d="M 165 40 L 180 80 L 175 220 L 162 280"
                  fill="none"
                  stroke={getGlowColor('stroke')}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.9"
                  style={{ filter: 'url(#glowEffect)' }}
                />
              )}
              {/* Passive LED streak (when off) */}
              <path
                d="M 165 40 L 180 80 L 175 220 L 162 280"
                fill="none"
                stroke="#2a1e1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={ledColor === 'off' ? 1 : 0.2}
              />
              
              {/* Power button front detail */}
              <circle cx="175" cy="20" r="3" fill="#3a3d46" />
              <circle cx="175" cy="20" r="1.5" fill={ledColor !== 'off' ? '#00F2FF' : '#222'} />
            </g>

            {/* ==================== INTERNALS (Transparent Window Panel) ==================== */}
            <g transform="translate(10, 20)">
              {/* Window Glass boundary */}
              <rect x="0" y="0" width="140" height="270" rx="4" fill="#050608" stroke="#1d2025" strokeWidth="1" />
              
              {/* Custom dynamic back fan glowing ambient inside */}
              {ledColor !== 'off' && (
                <circle
                  cx="25" cy="50" r="30"
                  fill="none"
                  stroke={getGlowColor('stroke')}
                  strokeWidth="8"
                  opacity="0.15"
                  style={{ filter: 'url(#intenseGlow)' }}
                />
              )}

              {/* MOTHERBOARD BACKPLANE - ID: motherboard */}
              <g
                className="cursor-pointer"
                onClick={(e) => {
                  onSelectComponent('motherboard');
                  e.stopPropagation();
                }}
                onMouseEnter={() => setHoveredComponent('motherboard')}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                <rect
                  x="10" y="10" width="120" height="190" rx="4"
                  fill="#11151c"
                  stroke={activeComponentId === 'motherboard' ? '#00F2FF' : hoveredComponent === 'motherboard' ? '#4b5563' : '#1d232e'}
                  strokeWidth={activeComponentId === 'motherboard' ? 1.5 : 0.5}
                />
                {/* Circuit paths lines on PCB */}
                <path d="M 20 20 L 50 20 L 55 25 L 80 25 M 15 40 L 40 40 L 45 45 L 45 70" stroke="#1f293d" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M 100 130 L 100 180 L 120 180" stroke="#1f293d" strokeWidth="1.5" fill="none" opacity="0.7" />
                
                {/* Chipset Frozr Heatsink Fan (X570 specific!) */}
                <rect x="85" y="145" width="30" height="30" rx="3" fill="#1b1e24" stroke="#2c3039" strokeWidth="0.5" />
                <circle cx="100" cy="160" r="10" fill="#0d0e11" />
                <path d="M 94 160 L 106 160 M 100 154 L 100 166" stroke="#4b5563" strokeWidth="1" />
                

              </g>


              {/* PROCESSOR CPU (Behind Cooler, clickable region) - ID: cpu */}
              <g
                className="cursor-pointer"
                onClick={(e) => {
                  onSelectComponent('cpu');
                  e.stopPropagation();
                }}
                onMouseEnter={() => setHoveredComponent('cpu')}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                {/* CPU Base Bracket */}
                <rect
                  x="45" y="45" width="40" height="40" rx="3"
                  fill="#181c24"
                  stroke={activeComponentId === 'cpu' ? '#00F2FF' : hoveredComponent === 'cpu' ? '#4b5563' : '#2d3748'}
                  strokeWidth={activeComponentId === 'cpu' ? 1.5 : 0.5}
                />
                
                {/* WRAITH PRISM RGB COOLER DRAWING (Ryzen cooler sits on top) */}
                {/* Cooler body */}
                <rect x="40" y="38" width="50" height="54" rx="6" fill="#141517" stroke="#333" strokeWidth="1.5" />
                <circle cx="65" cy="65" r="18" fill="#0b0c0e" />
                
                {/* Dynamic LED fan blades */}
                <g opacity="0.85">
                  <path d="M 65 65 L 53 53 M 65 65 L 77 77 M 65 65 L 77 53 M 65 65 L 53 77" stroke="#25272a" strokeWidth="5.5" strokeLinecap="round" />
                  <circle cx="65" cy="65" r="6" fill="#444" />
                </g>

                {/* Wraith Prism Glowing RGB Ring */}
                {ledColor !== 'off' && (
                  <circle
                    cx="65" cy="65" r="18"
                    fill="none"
                    stroke={getGlowColor('stroke')}
                    strokeWidth="3.5"
                    opacity="0.85"
                    style={{ filter: 'url(#glowEffect)' }}
                  />
                )}
                {/* Inactive physical ring accent */}
                <circle
                  cx="65" cy="65" r="18"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2.5"
                  opacity={ledColor === 'off' ? 1 : 0.25}
                />


              </g>


              {/* CORSAIR VENGEANCE RAM - ID: ram */}
              <g
                className="cursor-pointer"
                onClick={(e) => {
                  onSelectComponent('ram');
                  e.stopPropagation();
                }}
                onMouseEnter={() => setHoveredComponent('ram')}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                {/* Memory Slot DIMM 2 & 4 (Populated for dual-channel) */}
                {/* Stick 1 */}
                <rect
                  x="96" y="35" width="5" height="52" rx="1"
                  fill="#0c0d0f"
                  stroke={activeComponentId === 'ram' ? '#00F2FF' : hoveredComponent === 'ram' ? '#64748b' : '#1e293b'}
                  strokeWidth="0.5"
                />
                {/* Stick 2 */}
                <rect
                  x="105" y="35" width="5" height="52" rx="1"
                  fill="#0c0d0f"
                  stroke={activeComponentId === 'ram' ? '#00F2FF' : hoveredComponent === 'ram' ? '#64748b' : '#1e293b'}
                  strokeWidth="0.5"
                />

                {/* Heatsink geometric ridges */}
                <line x1="97" y1="45" x2="97" y2="75" stroke="#1a1e24" strokeWidth="1" strokeDasharray="2,3" />
                <line x1="106" y1="45" x2="106" y2="75" stroke="#1a1e24" strokeWidth="1" strokeDasharray="2,3" />

                {/* Optional subtle LED glow representing RAM illumination if active */}
                {ledColor !== 'off' && (
                  <g opacity="0.6">
                    <rect x="97" y="36" width="3" height="15" fill={getGlowColor('fill')} style={{ filter: 'url(#glowEffect)' }} />
                    <rect x="106" y="36" width="3" height="15" fill={getGlowColor('fill')} style={{ filter: 'url(#glowEffect)' }} />
                  </g>
                )}


              </g>


              {/* KINGSTON M.2 SSD (Sits underneath graphics card slot) - ID: ssd */}
              <g
                className="cursor-pointer"
                onClick={(e) => {
                  onSelectComponent('ssd');
                  e.stopPropagation();
                }}
                onMouseEnter={() => setHoveredComponent('ssd')}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                {/* The tiny NVMe Drive, semi-obscured but clickable */}
                <rect
                  x="45" y="110" width="45" height="10" rx="1"
                  fill="#111c16"
                  stroke={activeComponentId === 'ssd' ? '#00F2FF' : hoveredComponent === 'ssd' ? '#4b5563' : '#1f293d'}
                  strokeWidth={activeComponentId === 'ssd' ? 1.5 : 0.5}
                />
                {/* Memory chips on SSD */}
                <rect x="52" y="112" width="10" height="6" fill="#0d0e11" />
                <rect x="66" y="112" width="10" height="6" fill="#0d0e11" />
                <rect x="79" y="112" width="5" height="6" fill="#92400e" /> {/* Controller */}


              </g>


              {/* ZOTAC RTX 2060 SUPER MINI GPU - ID: gpu */}
              {/* Mounted horizontally in secondary section */}
              <g
                className="cursor-pointer"
                onClick={(e) => {
                  onSelectComponent('gpu');
                  e.stopPropagation();
                }}
                onMouseEnter={() => setHoveredComponent('gpu')}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                {/* Backplate & Cooling shroud of the Zotac GPU */}
                <rect
                  x="15" y="124" width="112" height="34" rx="4"
                  fill="#1e2025"
                  stroke={activeComponentId === 'gpu' ? '#00F2FF' : hoveredComponent === 'gpu' ? '#4b5563' : '#2c3039'}
                  strokeWidth={activeComponentId === 'gpu' ? 1.5 : 0.5}
                  className="transition-all duration-300"
                />

                {/* Twin fan cutouts */}
                <circle cx="42" cy="141" r="11.5" fill="#0e0f11" stroke="#2d3039" strokeWidth="1" />
                <circle cx="88" cy="141" r="11.5" fill="#0e0f11" stroke="#2d3039" strokeWidth="1" />
                
                {/* Fan blades */}
                <path d="M 34 141 L 50 141 M 42 133 L 42 149" stroke="#1d2025" strokeWidth="2.5" />
                <path d="M 80 141 L 96 141 M 88 133 L 88 149" stroke="#1d2025" strokeWidth="2.5" />
                
                {/* ZOTAC glowing RGB accent logo */}
                {ledColor !== 'off' ? (
                  <path
                    d="M 60 128 L 74 128"
                    stroke={getGlowColor('stroke')}
                    strokeWidth="2"
                    style={{ filter: 'url(#glowEffect)' }}
                  />
                ) : (
                  <path d="M 60 128 L 74 128" stroke="#444" strokeWidth="1.5" />
                )}

                {/* Metallic PCIe bracket holding it on the left */}
                <rect x="10" y="125" width="5" height="24" fill="#6b7280" />


              </g>


              {/* POWER SUPPLY & SHROUD - ID: power_supply */}
              {/* Located at the bottom section */}
              <g
                className="cursor-pointer"
                onClick={(e) => {
                  onSelectComponent('power_supply');
                  e.stopPropagation();
                }}
                onMouseEnter={() => setHoveredComponent('power_supply')}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                {/* PSU Shroud cover (Solid metal tray separating bottom) */}
                <rect x="3" y="210" width="134" height="57" rx="3" fill="#090a0d" />
                {/* Dynamic accent frame */}
                <rect
                  x="5" y="212" width="130" height="53" rx="2"
                  fill="none"
                  stroke={activeComponentId === 'power_supply' ? '#00F2FF' : hoveredComponent === 'power_supply' ? '#4b5563' : '#15171e'}
                  strokeWidth={activeComponentId === 'power_supply' ? 1.5 : 0.5}
                />
                
                {/* Grid Mesh cutouts on shroud */}
                <g opacity="0.35">
                  <line x1="70" y1="220" x2="115" y2="220" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="70" y1="225" x2="115" y2="225" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="70" y1="230" x2="115" y2="230" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="70" y1="235" x2="115" y2="235" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="70" y1="240" x2="115" y2="240" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                </g>

                {/* Gigabyte PSU details sticker visible through shroud window cutout */}
                <g transform="translate(15, 222)">
                  <rect x="0" y="0" width="45" height="33" rx="1.5" fill="#111" stroke="#222" strokeWidth="0.5" />
                  <text x="4" y="11" fill="#999" fontSize="6" fontWeight="bold" fontFamily="monospace">GIGABYTE</text>
                  <text x="4" y="21" fill="#eab308" fontSize="8" fontWeight="bold" fontFamily="monospace">B700H</text>
                  <rect x="4" y="25" width="20" height="3" fill="#cd7f32" rx="0.5" /> {/* Bronze 80plus indicator */}
                </g>

                {/* Modular Cable sleeves bundle emerging from PSU to motherboard */}
                <path d="M 60 210 Q 90 195 118 190" fill="none" stroke="#0a0a0d" strokeWidth="6" />
                <path d="M 60 210 Q 90 195 118 190" fill="none" stroke="#222" strokeWidth="4" strokeDasharray="1,1" />


              </g>

            </g>
          </g>

          {/* ==================== PROJECTOR & LAMPS ==================== */}

          {/* EGATE i9 Pro Max Projector - ID: projector */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectComponent('projector')}
            onMouseEnter={() => setHoveredComponent('projector')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Ceiling suspension metal mount */}
            <rect x="347" y="0" width="6" height="25" fill="#333" stroke="#222" strokeWidth="0.5" />
            <rect x="341" y="22" width="18" height="4" fill="#555" />

            {/* Projector Case Body */}
            <rect
              x="315" y="26" width="70" height="32" rx="5"
              fill="#f4f4f5"
              stroke={activeComponentId === 'projector' ? '#00F2FF' : hoveredComponent === 'projector' ? '#4b5563' : '#d4d4d8'}
              strokeWidth={activeComponentId === 'projector' ? 2 : 1}
              className="transition-all duration-300"
              style={{
                filter: activeComponentId === 'projector' ? 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.45))' : 'none'
              }}
            />

            {/* Front black glass panel detail */}
            <rect x="320" y="32" width="60" height="10" rx="2" fill="#18181b" />

            {/* Projector Lens with cyan active light */}
            <circle cx="335" cy="37" r="7" fill="#111" stroke="#444" strokeWidth="1" />
            <circle cx="335" cy="37" r="4" fill="#222" />
            
            {/* Active lens glow if LED is on */}
            {ledColor !== 'off' && (
              <circle
                cx="335" cy="37" r="3"
                fill={getGlowColor('fill') as string}
                style={{ filter: 'url(#glowEffect)' }}
              />
            )}

            {/* Air Vent Grille Lines on right side of projector body */}
            <line x1="365" y1="32" x2="365" y2="48" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="370" y1="32" x2="370" y2="48" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="375" y1="32" x2="375" y2="48" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="2,2" />

            {/* Elegant projection light beam cast downward-right, representing active multimedia status */}
            {ledColor !== 'off' && (
              <polygon
                points="335,37 200,410 480,410"
                fill={getGlowColor('fill') as string}
                opacity="0.08"
                pointerEvents="none"
                style={{ filter: 'url(#glowEffect)' }}
              />
            )}
          </g>

          {/* IKEA BARLAST Floor Lamp - ID: lamp_floor */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectComponent('lamp_floor')}
            onMouseEnter={() => setHoveredComponent('lamp_floor')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Stand Base */}
            <ellipse cx="18" cy="485" rx="14" ry="4" fill="#111" stroke="#222" strokeWidth="1" />
            
            {/* Thin Pole */}
            <rect
              x="17" y="150" width="2" height="333"
              fill="#c5c6c9"
              stroke={activeComponentId === 'lamp_floor' ? '#00F2FF' : hoveredComponent === 'lamp_floor' ? '#4b5563' : '#1e1f21'}
              strokeWidth={activeComponentId === 'lamp_floor' ? 1.5 : 0.5}
            />

            {/* Glowing Aura when selected/on */}
            {ledColor !== 'off' && (
              <circle
                cx="18" cy="125" r="24"
                fill={getGlowColor('fill') as string}
                opacity="0.15"
                style={{ filter: 'url(#intenseGlow)' }}
                pointerEvents="none"
              />
            )}

            {/* Lamp Shade (White Plastic Cylinder) */}
            <rect
              x="8" y="100" width="20" height="50" rx="3"
              fill="#fafafa"
              stroke={activeComponentId === 'lamp_floor' ? '#00F2FF' : hoveredComponent === 'lamp_floor' ? '#4b5563' : '#a1a1aa'}
              strokeWidth={activeComponentId === 'lamp_floor' ? 2 : 1}
              style={{
                filter: activeComponentId === 'lamp_floor' ? 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.45))' : 'none'
              }}
            />

            {/* Inner Shade Glow Effect (if LED is on) */}
            {ledColor !== 'off' && (
              <rect
                x="10" y="102" width="16" height="46" rx="2"
                fill={getGlowColor('fill') as string}
                opacity="0.4"
                pointerEvents="none"
              />
            )}
          </g>

          {/* IKEA TERTIAL Work Lamp - ID: lamp_work */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectComponent('lamp_work')}
            onMouseEnter={() => setHoveredComponent('lamp_work')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Clamp Base on Desk */}
            <rect x="522" y="415" width="8" height="10" fill="#1e1f22" stroke="#333" strokeWidth="0.5" />
            <rect x="520" y="413" width="12" height="3" fill="#3a3a3c" />

            {/* Arm Joint Springs and Pivot Points */}
            {/* Lower Arm (Dual Parallel Struts) */}
            <line x1="526" y1="415" x2="512" y2="305" stroke="#3a3a3c" strokeWidth="1.5" />
            <line x1="523" y1="415" x2="509" y2="305" stroke="#3a3a3c" strokeWidth="1.5" />
            
            {/* Middle Joint Elbow */}
            <circle cx="510" cy="305" r="3.5" fill="#111" stroke="#555" strokeWidth="1" />
            <line x1="512" y1="305" x2="495" y2="300" stroke="#ff3333" strokeWidth="0.75" opacity="0.8" /> {/* Spring detail */}

            {/* Upper Arm (Dual Parallel Struts) */}
            <line x1="510" y1="305" x2="465" y2="255" stroke="#3a3a3c" strokeWidth="1.5" />
            <line x1="507" y1="303" x2="462" y2="253" stroke="#3a3a3c" strokeWidth="1.5" />

            {/* Shade Joint/Elbow */}
            <circle cx="463" cy="254" r="3" fill="#111" stroke="#555" strokeWidth="1" />

            {/* Lamp Shade (Classic Bell Shape, pointing down-left) */}
            <path
              d="M 463 254 L 442 240 L 434 252 L 455 266 Z"
              fill="#e4e4e7"
              stroke={activeComponentId === 'lamp_work' ? '#00F2FF' : hoveredComponent === 'lamp_work' ? '#4b5563' : '#a1a1aa'}
              strokeWidth={activeComponentId === 'lamp_work' ? 1.5 : 0.5}
            />
            {/* Wide bell flared opening */}
            <ellipse
              cx="438" cy="246" rx="5" ry="9"
              transform="rotate(33 438 246)"
              fill="#fafafa"
              stroke={activeComponentId === 'lamp_work' ? '#00F2FF' : hoveredComponent === 'lamp_work' ? '#4b5563' : '#a1a1aa'}
              strokeWidth={activeComponentId === 'lamp_work' ? 1.5 : 0.5}
            />

            {/* Faint Light Beam Cone when LED is active */}
            {ledColor !== 'off' && (
              <polygon
                points="435,238 310,340 370,420 445,255"
                fill={getGlowColor('fill') as string}
                opacity="0.1"
                pointerEvents="none"
                style={{ filter: 'url(#glowEffect)' }}
              />
            )}

            {/* Active Outline highlight filter */}
            {activeComponentId === 'lamp_work' && (
              <path
                d="M 526 415 L 510 305 L 463 254"
                fill="none"
                stroke="#00F2FF"
                strokeWidth="2"
                opacity="0.5"
                style={{ filter: 'url(#glowEffect)' }}
                pointerEvents="none"
              />
            )}
          </g>
        </svg>


      </div>
    </div>
  );
};
