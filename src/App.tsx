import React, { useState } from 'react';
import { motion } from 'motion/react';
import { pcComponents } from './data';
import { PCVisualizer } from './components/PCVisualizer';
import { ComponentDetails } from './components/ComponentDetails';
import { ComponentCatalog } from './components/ComponentCatalog';
import { Cpu, Monitor, HardDrive, Tag, Info, HelpCircle, Camera } from 'lucide-react';

export default function App() {
  const [activeComponentId, setActiveComponentId] = useState<string | null>('monitor_primary');
  const selectedComponentIds = pcComponents.map((c) => c.id);

  const activeComponent = pcComponents.find((c) => c.id === activeComponentId) || null;

  const handleSelectComponent = (id: string) => {
    setActiveComponentId(id);
    
    // Smooth scroll to details on small screens
    const detailsEl = document.getElementById('inspect-details');
    if (detailsEl && window.innerWidth < 1024) {
      detailsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleInOffer = () => {
    // Stubbed since dynamic configuration checkmarks are removed as requested
  };

  // Quick stats calculations
  const totalOriginalSelected = pcComponents
    .filter((c) => selectedComponentIds.includes(c.id) && c.hasOriginalPrice)
    .reduce((sum, c) => sum + c.originalPrice, 0);

  const totalResaleSelectedMin = pcComponents
    .filter((c) => selectedComponentIds.includes(c.id))
    .reduce((sum, c) => sum + c.resaleMin, 0);

  const totalResaleSelectedMax = pcComponents
    .filter((c) => selectedComponentIds.includes(c.id))
    .reduce((sum, c) => sum + c.resaleMax, 0);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#E4E3E0] font-sans antialiased selection:bg-[#00F2FF] selection:text-[#0F0F0F] pb-16 relative">
      
      {/* Grid lines layout accent for technical theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#151619_1px,transparent_1px),linear-gradient(to_bottom,#151619_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10 opacity-70" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        <div className="space-y-8">
          {/* ==================== TECHNICAL HERO HEADER ==================== */}
          <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#151619] border border-[#222] p-6 md:p-8 rounded-lg relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FF]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3.5xl font-light tracking-tight text-white leading-tight">
                  Workstation Essentials for Sale
                </h1>

                {/* Specification Subheading Bullets */}
                <div className="flex flex-nowrap items-center gap-x-1.5 text-[9px] md:text-xs font-mono text-[#00F2FF] pt-1 whitespace-nowrap overflow-x-auto">
                  <span>Custom Build PC</span>
                  <span className="text-[#444]">|</span>
                  <span>Dual monitors + stand</span>
                  <span className="text-[#444]">|</span>
                  <span>Projector</span>
                  <span className="text-[#444]">|</span>
                  <span>Lamps</span>
                </div>
              </div>
              
              <p className="text-xs md:text-sm text-[#8E9299] leading-relaxed">
                A professional, high-performance workstation setup. Equipped with an 8-Core AMD Ryzen 7 3700X, RTX 2060 Super Mini graphics, 32GB RAM, Dual monitors + stand, EGATE i9 Pro Max Projector, and workstation lamps. The complete build is cleaned and ready for immediate use.
              </p>
            </div>

            {/* Quick Pricing Billboard Card */}
            <div className="bg-[#0F0F0F] border border-[#222] p-5 rounded min-w-[280px] flex flex-col justify-center shadow-inner relative overflow-hidden group">
              <div className="space-y-2.5">
                <span className="text-[10px] text-[#00F2FF] uppercase tracking-wider font-mono block flex items-center gap-1.5 border-b border-[#222] pb-1.5 font-bold">
                  <Tag className="w-3.5 h-3.5 text-[#00F2FF]" />
                  ASKING PRICE
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[#8E9299]">Custom Build PC</span>
                    <span className="text-white font-medium">₹90,000</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[#8E9299]">Dual monitors + stand</span>
                    <span className="text-white font-medium">₹12,000</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[#8E9299]">Projector</span>
                    <span className="text-white font-medium">₹7,000</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[#8E9299]">Work Lamp</span>
                    <span className="text-white font-medium">₹1,200</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[#8E9299]">Floor Lamp</span>
                    <span className="text-white font-medium">₹750</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

                {/* ==================== INTERACTIVE 2D DESK STAGE ==================== */}
                <section id="interactive-desk" className="space-y-6">
                  <PCVisualizer
                    activeComponentId={activeComponentId}
                    onSelectComponent={handleSelectComponent}
                    selectedComponentIds={selectedComponentIds}
                    onToggleComponentInOffer={handleToggleInOffer}
                  />
                </section>

                {/* ==================== WORKSPACE GRID (Catalog, Details, Calculator) ==================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN: Hardware Catalog List (7 spans on wide screens) */}
                  <div className="lg:col-span-7">
                    <ComponentCatalog
                      activeComponentId={activeComponentId}
                      onSelectComponent={handleSelectComponent}
                      selectedComponentIds={selectedComponentIds}
                      onToggleInOffer={handleToggleInOffer}
                    />
                  </div>

                  {/* RIGHT COLUMN: Inspected details panel & Condition logs (5 spans) */}
                  <div id="inspect-details" className="lg:col-span-5 h-full">
                    <ComponentDetails
                      component={activeComponent}
                      onToggleInOffer={handleToggleInOffer}
                      isIncluded={activeComponentId ? selectedComponentIds.includes(activeComponentId) : false}
                    />
                  </div>

                </div>

                {/* ==================== WORKSTATION CAPABILITIES & FAQ ==================== */}
                <section className="bg-[#151619] border border-[#222] p-6 md:p-8 rounded-lg space-y-6">
                  {/* Quick FAQ list */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono tracking-wider text-[#E4E3E0] uppercase flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#00F2FF]" />
                      FREQUENTLY ASKED QUESTIONS (FAQ)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: How old is the system, and what was it primarily used for?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: Most components were purchased brand new between late 2020 and early 2021. The system has been primarily used for architectural and design work, as well as gaming. It has been well maintained and remains in excellent condition.
                        </p>
                      </div>

                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: What is the exact condition of the PC and monitors?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: The PC is in excellent working condition and has been regularly cleaned. The primary Dell IPS monitor (manufactured in 2021) has a beautiful display with no dead pixels. The secondary Samsung monitor (manufactured in 2009) works perfectly as an extra screen for productivity. There is no physical damage to the displays, only minor cosmetic wear and tear on the exterior.
                        </p>
                      </div>

                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: Are any of the parts still under warranty?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: As the system was built in 2020, standard 1-to-3-year warranties on the CPU, GPU, and motherboard have expired. However, parts like the Corsair RAM often carry longer or lifetime manufacturer warranties. I will provide all the original digital invoices so you have the complete purchase history.
                        </p>
                      </div>

                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: Can it run modern games smoothly?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: Yes! The combination of the Ryzen 7 3700X, 32GB of RAM, and the RTX 2060 Super makes this a highly capable 1080p gaming machine. It will comfortably run popular titles like Valorant, GTA V, Cyberpunk 2077, and EA FC at high frame rates.
                        </p>
                      </div>

                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: Does the PC come with an operating system installed?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: Yes, the 1TB NVMe SSD has been completely formatted and loaded with a fresh, clean installation of Windows 11. It is fully plug-and-play.
                        </p>
                      </div>

                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: Can I buy just the PC or monitors or projector?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: Yes, I am open to selling just one of the items if the offer is appropriate, but I am not parting out individual components like the GPU or RAM from the main PC tower.
                        </p>
                      </div>

                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: Can I test the PC before purchasing?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: Absolutely. Serious buyers are welcome to see the PC running in person. We can run standard benchmark tests or boot up a game so that you can verify the temperatures and performance for yourself.
                        </p>
                      </div>

                      <div className="space-y-1 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                        <p className="font-bold text-[#00F2FF] font-mono text-[11px]">Q: What exactly is included in the final price?</p>
                        <p className="text-[#8E9299] leading-normal">
                          A: The full package price includes the main PC tower, the Dell 24-inch IPS monitor (2021 model), the Samsung 20-inch secondary monitor (2009 model), the EGATE i9 Pro Max Home Projector (with ceiling mount & cables), and all required power & display cables. Keyboard, mouse, or audio gear can be discussed as add-ons.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ==================== PHOTOS ==================== */}
                <section className="bg-[#151619] border border-[#222] p-6 md:p-8 rounded-lg space-y-4">
                  <h4 className="text-xs font-mono tracking-wider text-[#E4E3E0] uppercase flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#00F2FF]" />
                    PHOTOS
                  </h4>
                  <div className="bg-[#0F0F0F]/40 p-6 rounded border border-[#222] border-dashed text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#1A1C20] flex items-center justify-center border border-[#333]">
                      <Camera className="w-6 h-6 text-[#8E9299]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">Photos uploading soon</p>
                      <p className="text-xs text-[#8E9299]">
                        I will upload the photos on 17th July as I'm traveling.
                      </p>
                    </div>
                  </div>
                </section>

                {/* ==================== LOCATION & CONTACT ==================== */}
                <section className="bg-[#151619] border border-[#222] p-6 md:p-8 rounded-lg space-y-4">
                  <h4 className="text-xs font-mono tracking-wider text-[#E4E3E0] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00F2FF]" />
                    LOCATION & CONTACT DETAILS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="space-y-1.5 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                      <p className="text-[10px] text-[#00F2FF] font-mono uppercase tracking-wider font-bold">Location</p>
                      <p className="text-lg font-light text-white leading-normal">Kandivali, Mumbai</p>
                      <p className="text-[#8E9299] leading-relaxed">Available for physical inspection and local pickup by appointment.</p>
                    </div>
                    <div className="space-y-1.5 bg-[#0F0F0F]/40 p-4 rounded border border-[#222]">
                      <p className="text-[10px] text-[#00F2FF] font-mono uppercase tracking-wider font-bold">Contact Number</p>
                      <p className="text-lg font-light text-white leading-normal">8971508516</p>
                      <p className="text-[#8E9299] leading-relaxed">Interested people can contact this number directly via call or message.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Elegant minimalist footer */}
            <footer className="mt-16 text-center text-xs text-[#8E9299] border-t border-[#111] pt-6 font-mono space-y-1">
              <p>© 2026 Workstation Essentials for Sale</p>
              <p className="text-[10px] text-[#8E9299]/60">Kandivali, Mumbai</p>
            </footer>

          </div>
        );
      }

