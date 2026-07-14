import { PCComponent } from './types';

export const pcComponents: PCComponent[] = [
  {
    id: 'gpu',
    name: 'ZOTAC GeForce RTX 2060 Super Mini',
    fullName: 'ZOTAC Gaming GeForce RTX 2060 Super Mini 8GB GDDR6',
    category: 'graphics_card',
    originalPrice: 37000,
    hasOriginalPrice: true,
    resaleMin: 14000,
    resaleMax: 15500,
    specs: {
      'Memory': '8GB GDDR6',
      'Memory Bus': '256-bit',
      'Engine Clock': 'Boost: 1650 MHz',
      'CUDA Cores': '2176',
      'Outputs': '3x DisplayPort 1.4, 1x HDMI 2.0b',
      'Power Connectors': '1x 8-pin',
      'Form Factor': 'Super Mini (Length: 209.6mm)'
    },
    description: 'This is an exceptionally compact and powerful GPU. Being a "Super" variant, it performs nearly identically to an RTX 2070. Its mini form factor ensures excellent clearance and airflow inside the Corsair SPEC-05 chassis, making it a reliable graphics powerhouse for 1080p and 1440p gaming, as well as light rendering and machine learning tasks.',
    condition: 'Excellent. Thermal paste repasted recently. Fan blades cleaned, runs quiet and stays under 74°C under heavy benchmarks.',
    highlights: [
      'Compact size with dual cooling fans',
      'Supports Real-Time Ray Tracing and DLSS',
      '8GB VRAM is excellent for modern high-texture games',
      'VR Ready and handles multiple monitors seamlessly'
    ],
    svgId: 'visual-gpu'
  },
  {
    id: 'cpu',
    name: 'AMD Ryzen 7 3700X',
    fullName: 'AMD Ryzen 7 3700X Desktop Processor (8 Cores, 16 Threads, up to 4.4GHz)',
    category: 'processor',
    originalPrice: 29900,
    hasOriginalPrice: true,
    resaleMin: 8500,
    resaleMax: 9000,
    specs: {
      'Cores / Threads': '8 Cores / 16 Threads',
      'Base Clock': '3.6 GHz',
      'Max Boost Clock': 'Up to 4.4 GHz',
      'Total Cache': '36 MB (L2 + L3)',
      'Socket': 'AM4',
      'Default TDP': '65W',
      'Thermal Solution': 'Wraith Prism LED Cooler included'
    },
    description: 'The Ryzen 7 3700X is one of AMD\'s most legendary processors. Built on the 7nm Zen 2 architecture, its ultra-efficient 65W power design delivers incredible multi-threaded performance. It excels at streaming, video editing, compiling code, and gaming simultaneously, and includes the visually stunning RGB Wraith Prism cooler.',
    condition: 'Perfect. Never overclocked. Maintained with high-quality thermal paste, operating at stable temperatures.',
    highlights: [
      '8 physical cores and 16 virtual threads',
      'Extremely efficient 65W TDP saves electricity and runs cooler',
      'Comes with premium Wraith Prism RGB LED air cooler',
      'Unlocked for manual overclocking if desired'
    ],
    svgId: 'visual-cpu'
  },
  {
    id: 'motherboard',
    name: 'MSI X570-A Pro Gaming',
    fullName: 'MSI Components X570-A Pro Gaming Motherboard',
    category: 'motherboard',
    originalPrice: 16649,
    hasOriginalPrice: true,
    resaleMin: 7000,
    resaleMax: 8000,
    specs: {
      'Chipset': 'AMD X570 Chipset',
      'Memory Support': '4x DDR4 DIMM, Up to 128GB (4400MHz+ OC)',
      'PCIe Version': 'PCIe 4.0 Support',
      'Storage slots': '2x M.2 slots (Key M), 6x SATA 6Gb/s',
      'Form Factor': 'ATX (30.4 cm x 24.3 cm)',
      'Rear Ports': 'USB 3.2 Gen2 (Type-A+C), HDMI, Gigabit LAN, HD Audio'
    },
    description: 'A robust, high-performance motherboard designed for gamers and creators. Equipped with the premium AMD X570 chipset, it fully supports high-speed PCIe Gen 4 storage and graphics. It features active chipset cooling (Frozr Heatsink) to maintain optimal temperature, and MSI\'s Core Boost technology for stable power delivery.',
    condition: 'Great. All PCIe and RAM slots fully functional, BIOS updated to the latest version supporting newer AM4 processors.',
    highlights: [
      'PCIe 4.0 readiness doubles the bandwidth of PCIe 3.0',
      'Frozr Heatsink Design with patented propeller blade fan',
      'Audio Boost 4 with high-quality audio capacitors',
      'Pre-installed thermal shielding for primary M.2 drive'
    ],
    svgId: 'visual-motherboard'
  },
  {
    id: 'monitor_primary',
    name: 'Dell P2419H 24" IPS Monitor',
    fullName: 'Dell P Series 24-inch Full HD LED-Lit Monitor with IPS Panel (P2419H)',
    category: 'monitor_primary',
    originalPrice: 12420,
    hasOriginalPrice: true,
    resaleMin: 7000,
    resaleMax: 8500,
    specs: {
      'Purchase Year': '2021',
      'Diagonal Size': '23.8 Inches (60.96 cm)',
      'Panel Type': 'IPS (In-Plane Switching)',
      'Resolution': 'Full HD 1920 x 1080 at 60Hz',
      'Aspect Ratio': '16:9',
      'Brightness': '250 cd/m²',
      'Inputs': '1x HDMI 1.4, 1x DisplayPort 1.2, 1x VGA, 4x USB downstream ports',
      'Stand Adjustability': 'Height, Pivot (rotate 90°), Swivel, Tilt'
    },
    description: 'This is the crown jewel of professional productivity. Purchased in 2021, the Dell P2419H features a stunning 3-sided ultrathin bezel design and a highly accurate IPS panel, ensuring vibrant and uniform colors from any viewing angle. Its highly versatile ergonomic stand allows you to lift, tilt, swivel, and rotate the screen into portrait mode (perfect for reading logs or code).',
    condition: 'Flawless. Zero dead pixels, no scratches on the glass, stand mechanism works smoothly. Includes power and HDMI cables.',
    highlights: [
      'Stunning IPS panel with wide 178°/178° viewing angles',
      'Fully ergonomic stand (height, pivot, tilt, swivel adjustment)',
      'Built-in USB hub (USB Passthrough) for clean desk cable management',
      'ComfortView technology minimizes harmful blue light emission'
    ],
    svgId: 'visual-monitor-primary'
  },
  {
    id: 'monitor_secondary',
    name: 'Samsung SyncMaster LS20MYW',
    fullName: 'Samsung SyncMaster LS20MYW 20" LCD Monitor',
    category: 'monitor_secondary',
    originalPrice: 0,
    hasOriginalPrice: false,
    resaleMin: 800,
    resaleMax: 1200,
    specs: {
      'Purchase Year': '2009',
      'Diagonal Size': '20.1 Inches',
      'Panel Type': 'TN Active Matrix',
      'Resolution': 'WSXGA+ 1680 x 1050',
      'Aspect Ratio': '16:10 (More vertical space than 16:9)',
      'Refresh Rate': '60 Hz',
      'Inputs': '1x VGA (D-Sub), 1x DVI-D',
      'Viewing Angles': '160° Horizontal / 160° Vertical'
    },
    description: 'An extremely durable, classic secondary monitor purchased in 2009. Sporting a 16:10 aspect ratio, it offers excellent vertical real estate, which makes it ideal for running side tasks such as chat programs (Discord, Slack), terminal output, Spotify, or viewing reference documentation while you code or game on the main screen.',
    condition: 'Good. Well-preserved classic LCD monitor, fully working backlights, no line distortions, slight scuffs on the plastic frame consistent with age. Comes with a VGA or DVI-to-HDMI adapter.',
    highlights: [
      'Reliable secondary screen for multitasking efficiency',
      '16:10 widescreen aspect ratio offers comfortable text reading',
      'Matte anti-glare screen coating prevents reflections',
      'Highly sturdy build quality'
    ],
    svgId: 'visual-monitor-secondary'
  },
  {
    id: 'monitor_stand',
    name: 'Dual Monitor Stand',
    fullName: 'Dual Monitor Stand - Height-Adjustable Arm Mount, Steel',
    category: 'stand',
    originalPrice: 3299,
    hasOriginalPrice: true,
    resaleMin: 1800,
    resaleMax: 2200,
    specs: {
      'Purchase Year': '2021',
      'Mounting Type': 'Desk mount, C-clamp',
      'Supported Screen Size': 'Up to 27 inches',
      'Weight Capacity': 'Up to 10 kg (22 lbs) per arm',
      'VESA Standard': '75 x 75 mm and 100 x 100 mm',
      'Adjustability': 'Tilt (+15° to -15°), Swivel (360°), Rotation (360°)'
    },
    description: 'A heavy-duty steel dual monitor stand. It dramatically frees up desk space by raising two monitors off the desk surface. Perfect for creating a clean, ergonomic, floating-screen workstation. Highly versatile adjustment options allow you to rotate your monitors into landscape or portrait mode with ease.',
    condition: 'Excellent. Pristine matte black finish. All original C-clamp hardware, screws, and cable clips are fully included.',
    highlights: [
      'Heavy-duty steel construction ensures sturdy, wobble-free support',
      'Frees up desk surface area for a clean, professional aesthetic',
      'Integrated cable management clips organize wires cleanly along the arms',
      'Simple height adjustment along the main supporting column'
    ],
    svgId: 'visual-monitor-stand'
  },
  {
    id: 'projector',
    name: 'EGATE i9 Pro Max Projector',
    fullName: 'EGATE i9 Pro Max Projector with Built-in 24W Soundbar',
    category: 'projector',
    originalPrice: 9990,
    hasOriginalPrice: true,
    resaleMin: 4500,
    resaleMax: 5500,
    specs: {
      'Purchase Year': '2024',
      'Condition': 'Prime Condition',
      'Packaging': 'Available in Original Box',
      'Accessories': 'Ceiling Mount & Cable included',
      'Soundbar': '24W Built-In Stereo Soundbar',
      'Resolution': 'Full HD 1080p Support'
    },
    description: 'Purchased in 2024 and maintained in absolute prime condition, this unit comes complete in its original retail box. Perfect for setting up an immersive home theater or high-end multimedia presentations.',
    condition: 'Prime. Pristine hardware condition, very low usage hours. Package includes the original box, standard remote, plus a bonus ceiling mount kit and heavy-duty connector cable.',
    highlights: [
      'Incredibly loud and crisp 24W built-in soundbar eliminates the need for separate speakers',
      'Purchased in 2024, meticulously cared for, and preserved in immaculate prime condition',
      'Shipped complete inside its original retail box for secure and clean transport',
      'Comes bundled with a premium ceiling mount kit and connection cable'
    ],
    svgId: 'visual-projector'
  },
  {
    id: 'ram',
    name: 'Corsair Vengeance LPX 32GB DDR4',
    fullName: 'Corsair Vengeance LPX 32GB (2x16GB) DDR4 3200MHz RAM Kit',
    category: 'ram',
    originalPrice: 11278,
    hasOriginalPrice: true,
    resaleMin: 3500,
    resaleMax: 4500,
    specs: {
      'Total Capacity': '32 GB (2x 16GB dual-channel kit)',
      'Memory Type': 'DDR4 SDRAM',
      'Tested Speed': '3200 MHz (with XMP 2.0 active)',
      'Tested Latency': '16-20-20-38',
      'Voltage': '1.35V',
      'Form Factor': '288-pin UDIMM',
      'Heat Spreader': 'Anodized Aluminum (Low-Profile)'
    },
    description: 'Designed for high-performance overclocking. Corsair Vengeance LPX is famous for its pure aluminum heat spreader which draws heat away from the chips rapidly. Its low-profile form factor is highly functional, clearing larger air coolers with ease. 32GB of capacity is the ultimate sweet spot for modern multi-tasking, preventing any system bottlenecks.',
    condition: 'Like New. Fully tested using MemTest86 with zero errors, heat spreaders are completely scratch-free.',
    highlights: [
      'Dual-channel matching kit for maximized memory bandwidth',
      'Subtle low-profile design fits under any cpu cooler clearance',
      'Supports Intel XMP 2.0 and AMD Ryzen profiles for simple one-click speed tuning',
      'High-quality, hand-sorted ICs ensure exceptional thermal headroom'
    ],
    svgId: 'visual-ram'
  },
  {
    id: 'ssd',
    name: 'Kingston 1TB A2000 M.2 NVMe SSD',
    fullName: 'Kingston 1TB A2000 M.2 2280 NVMe PCIe Internal SSD',
    category: 'ssd',
    originalPrice: 10598,
    hasOriginalPrice: true,
    resaleMin: 2500,
    resaleMax: 2800,
    specs: {
      'Capacity': '1 TB',
      'Interface': 'PCIe NVMe Gen 3.0 x4',
      'Form Factor': 'M.2 2280',
      'Sequential Read': 'Up to 2,200 MB/s',
      'Sequential Write': 'Up to 2,000 MB/s',
      'Endurance': '600 TBW (Terabytes Written)',
      'Encryption': '256-bit AES Hardware-based'
    },
    description: 'The Kingston A2000 is an entry-level NVMe PCIe SSD that utilizes one-sided design for high thermal efficiency. Delivering up to 3x the performance of standard SATA SSDs, it provides ultra-fast boot times, near-instantaneous game load speeds, and highly responsive file indexing, all while operating at cool, stable temperatures.',
    condition: 'Perfect health. SSD health index is at 94% with solid read/write endurance remaining. Securely wiped and formatted.',
    highlights: [
      'NVMe speeds up to 2200 MB/s make files move instantly',
      'Saves slot space and cable clutter by fitting directly onto the motherboard',
      'Built-in full-security suite supports self-encrypting drives',
      'Single-sided design fits easily in slim laptops or motherboards'
    ],
    svgId: 'visual-ssd'
  },
  {
    id: 'power_supply',
    name: 'Gigabyte GP-B700H 700W modular PSU',
    fullName: 'Gigabyte GP-B700H 700W ATX 80 PLUS Bronze Modular Power Supply',
    category: 'power_supply',
    originalPrice: 5850,
    hasOriginalPrice: true,
    resaleMin: 1800,
    resaleMax: 2400,
    specs: {
      'Max Wattage': '700 Watts continuous power output',
      'Efficiency Certification': '80 PLUS Bronze (Up to 85% efficiency)',
      'Cabling': 'Semi-Modular (Keep only necessary cables connected)',
      'Cooling': '120mm Double Ball Bearing Smart Silent Fan',
      'Protection Standard': 'OVP, OPP, SCP, UVP, OCP, OTP',
      'MTBF': '>100,000 Hours'
    },
    description: 'A robust and clean power source. Sporting 700W of power, this PSU has massive headroom, easily powering the RTX 2060 Super and Ryzen 7, allowing quiet operations since the PSU rarely runs close to peak capacity. The semi-modular design allows you to detach unused cables, keeping the Corsair Carbide SPEC-05 case clean and tidy.',
    condition: 'Excellent. Fan operates silently, all modular cables are complete and bundled, voltage rails are highly stable under load.',
    highlights: [
      'Semi-modular cabling minimizes cable mess and improves case airflow',
      '80 PLUS Bronze certification reduces waste heat and electricity bills',
      'Double ball-bearing fan lasts twice as long as standard sleeve fans',
      'High-quality Japanese capacitors ensure robust power protection'
    ],
    svgId: 'visual-psu'
  },
  {
    id: 'case',
    name: 'Corsair Carbide SPEC-05 Case',
    fullName: 'Corsair Carbide SPEC-05 Mid-Tower Gaming Case - Black',
    category: 'case',
    originalPrice: 3229,
    hasOriginalPrice: true,
    resaleMin: 1200,
    resaleMax: 1600,
    specs: {
      'Chassis Type': 'Mid-Tower ATX',
      'Dimensions': '483mm x 199mm x 433mm',
      'Side Panel': 'Edge-to-Edge Transparent Acrylic Window',
      'Front Panel I/O': '1x USB 3.0, 1x USB 2.0, Headphone & Mic jacks',
      'GPU Clearance': 'Up to 370mm (Easily fits the RTX 2060 Super)',
      'Fan Support': 'Up to 5x 120mm fans (Front, Top, Rear)'
    },
    description: 'An aggressive yet minimalist mid-tower chassis. The Corsair Carbide SPEC-05 features an elegant asymmetric front panel styled with high-speed geometric styling and an integrated red/orange accent LED bar. Its transparent side window puts the internal components on full display, showcasing the X570 board, RAM, and RTX graphics card in style.',
    condition: 'Clean. Scuff-free acrylic side panel, all fan filters are fully vacuumed and clean. Includes original mounting screws and pre-routed cables.',
    highlights: [
      'Bold asymmetric design with stylish front illumination',
      'Generous cable routing tie-downs and cable paths behind the tray',
      'Full windowed side panel lets you show off your hardware',
      'High physical clearance for water cooling radiators or massive GPUs'
    ],
    svgId: 'visual-case'
  },
  {
    id: 'lamp_work',
    name: 'IKEA TERTIAL Work Lamp',
    fullName: 'IKEA TERTIAL Work Lamp (Beige)',
    category: 'lamps',
    originalPrice: 1200,
    hasOriginalPrice: true,
    resaleMin: 1000,
    resaleMax: 1000,
    specs: {
      'Purchase Year': '2025',
      'Color': 'Beige',
      'Material': 'Steel, Epoxy/polyester powder coating',
      'Adjustability': 'Adjustable arm and head'
    },
    description: 'The TERTIAL work lamp was introduced in the IKEA range in 1998. The classic, functional design has steel spring arms and adjustable heads, making it perfect for direct, targeted workstation task lighting.',
    condition: 'Like New. Excellent physical condition with secure desk clamp and stable metal spring-balanced arms.',
    highlights: [
      'Highly adjustable head and arm for precise light direction',
      'Sturdy classic metal build that clamps securely to the desk edge',
      'Comes with standard E27 bulb socket'
    ],
    svgId: 'visual-lamp-work'
  },
  {
    id: 'lamp_floor',
    name: 'IKEA BARLAST Floor Lamp',
    fullName: 'IKEA BARLAST Floor Lamp (Black/White)',
    category: 'lamps',
    originalPrice: 750,
    hasOriginalPrice: true,
    resaleMin: 600,
    resaleMax: 600,
    specs: {
      'Purchase Year': '2025',
      'Color': 'Black/White',
      'Height': '150 cm',
      'Base Diameter': '34 cm'
    },
    description: 'The BARLAST floor lamp provides a beautifully diffused, glare-free light. Simple and elegant, it stands tall at 150 cm to spread warm ambient illumination across your workspace room.',
    condition: 'Excellent. No cracks on the plastic shade, stand assembly is perfectly rigid and clean.',
    highlights: [
      'Soft, diffused ambient light that creates a cozy room atmosphere',
      'Sleek and slim profile occupies minimal floor space',
      'Perfect height (150 cm) for positioning next to a computer desk'
    ],
    svgId: 'visual-lamp-floor'
  }
];

export const totalOriginalPrice = pcComponents.reduce(
  (sum, comp) => sum + (comp.hasOriginalPrice ? comp.originalPrice : 0),
  0
);

export const totalResaleMin = pcComponents.reduce((sum, comp) => sum + comp.resaleMin, 0);
export const totalResaleMax = pcComponents.reduce((sum, comp) => sum + comp.resaleMax, 0);
export const defaultTargetResalePrice = 52000; // An appealing listing price inside the 47,800 - 55,200 range
