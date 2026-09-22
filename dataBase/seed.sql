-- =========================
-- SHOPASSIST: ADDITIONAL PRODUCTS
-- 10 categories x 5 new products = 50 products (P1004 - P1053)
-- Run after seed.sql
-- =========================

INSERT INTO products
(id, name, description, category, price, stock, returnable)
VALUES

-- ---------- AUDIO ----------
('P1004', 'Apple AirPods Pro (2nd Gen)', 'True wireless earbuds with active noise cancellation, Adaptive Transparency, spatial audio and MagSafe charging case', 'Audio', 24900.00, 60, FALSE),
('P1005', 'boAt Airdopes 141', 'Budget true wireless earbuds with 42 hours total playback, ENx noise reduction mic and low-latency Beast Mode', 'Audio', 1299.00, 200, FALSE),
('P1006', 'JBL Flip 6', 'Portable Bluetooth speaker with IP67 waterproof and dustproof rating, 12 hours battery life and PartyBoost support', 'Audio', 11999.00, 45, TRUE),
('P1007', 'Bose QuietComfort Ultra Headphones', 'Premium over-ear wireless headphones with world-class noise cancellation, immersive audio and 24 hours battery life', 'Audio', 35900.00, 18, TRUE),
('P1008', 'Sennheiser HD 560S', 'Open-back wired audiophile headphones with a neutral, reference-style sound signature and detachable cable', 'Audio', 15990.00, 12, TRUE),

-- ---------- LAPTOP ----------
('P1009', 'Dell XPS 13', 'Ultra-portable 13.4-inch laptop with Intel Core Ultra 7, 16GB RAM, 512GB SSD and InfinityEdge display', 'Laptop', 109990.00, 8, TRUE),
('P1010', 'Lenovo ThinkPad E14 Gen 6', 'Business laptop with 14-inch FHD display, Intel Core i5, 16GB RAM, 512GB SSD and spill-resistant keyboard', 'Laptop', 62990.00, 22, TRUE),
('P1011', 'HP Pavilion 15', 'Everyday 15.6-inch laptop with AMD Ryzen 5, 16GB RAM, 512GB SSD and backlit keyboard', 'Laptop', 64990.00, 30, TRUE),
('P1012', 'ASUS ROG Zephyrus G14', 'Compact 14-inch gaming laptop with AMD Ryzen 9, NVIDIA RTX graphics, 32GB RAM, 1TB SSD and 120Hz OLED display', 'Laptop', 149990.00, 5, TRUE),
('P1013', 'Acer Aspire 5', 'Value 15.6-inch laptop with Intel Core i5, 8GB RAM, 512GB SSD and Full HD IPS display', 'Laptop', 45990.00, 35, TRUE),

-- ---------- FOOTWEAR ----------
('P1014', 'Adidas Ultraboost Light', 'Premium running shoes with Light BOOST midsole cushioning and Primeknit+ upper for a sock-like fit', 'Footwear', 17999.00, 28, TRUE),
('P1015', 'Puma Softride Pro', 'Lightweight everyday running shoes with SoftFoam+ sockliner and breathable mesh upper', 'Footwear', 3499.00, 75, TRUE),
('P1016', 'Skechers Go Walk 7', 'Slip-on walking shoes with ultra-light cushioning and machine-washable knit upper', 'Footwear', 4999.00, 55, TRUE),
('P1017', 'New Balance 574 Classic', 'Retro lifestyle sneakers with ENCAP midsole support and suede-mesh upper', 'Footwear', 8999.00, 42, TRUE),
('P1018', 'Crocs Classic Clog', 'Lightweight, water-friendly clogs made of Croslite foam with ventilation ports and pivoting heel strap', 'Footwear', 3495.00, 90, FALSE),

-- ---------- SMARTPHONE ----------
('P1019', 'Apple iPhone 16 (128GB)', '6.1-inch Super Retina XDR display, A18 chip, 48MP Fusion camera and Action button', 'Smartphone', 79900.00, 40, TRUE),
('P1020', 'Samsung Galaxy S25 (256GB)', '6.2-inch Dynamic AMOLED 2X display, Snapdragon 8 Elite, triple camera and 7 years of updates', 'Smartphone', 74999.00, 35, TRUE),
('P1021', 'OnePlus 13 (256GB)', '6.82-inch LTPO AMOLED display, Snapdragon 8 Elite, Hasselblad cameras and 100W fast charging', 'Smartphone', 69999.00, 30, TRUE),
('P1022', 'Google Pixel 9 (128GB)', '6.3-inch Actua display, Tensor G4 chip, advanced AI camera features and 7 years of updates', 'Smartphone', 74999.00, 20, TRUE),
('P1023', 'Redmi Note 14 Pro 5G (128GB)', '6.67-inch 120Hz AMOLED display, 200MP main camera and 5500mAh battery with 45W charging', 'Smartphone', 24999.00, 120, TRUE),

-- ---------- WEARABLES ----------
('P1024', 'Apple Watch Series 10 (GPS, 42mm)', 'Wide-angle always-on display, ECG and blood oxygen sensors, sleep tracking and water resistance to 50m', 'Wearables', 46900.00, 30, TRUE),
('P1025', 'Samsung Galaxy Watch7 (44mm)', 'Wear OS smartwatch with BioActive sensor, body composition analysis, sleep coaching and 40-hour battery', 'Wearables', 29999.00, 25, TRUE),
('P1026', 'Garmin Forerunner 265', 'GPS running smartwatch with AMOLED display, training readiness metrics and up to 13 days battery in smartwatch mode', 'Wearables', 39990.00, 14, TRUE),
('P1027', 'Noise ColorFit Pro 5', 'Budget smartwatch with 1.85-inch AMOLED display, Bluetooth calling, heart rate monitor and 100+ sports modes', 'Wearables', 3999.00, 150, TRUE),
('P1028', 'Fitbit Charge 6', 'Slim fitness tracker with built-in GPS, heart rate tracking, Google apps and 7-day battery life', 'Wearables', 14999.00, 38, TRUE),

-- ---------- GAMING ----------
('P1029', 'Sony PlayStation 5 Slim (Disc)', '1TB console with ultra-high-speed SSD, ray tracing, 4K gaming up to 120fps and DualSense controller', 'Gaming', 49990.00, 15, TRUE),
('P1030', 'Xbox Series X (1TB)', '4K gaming console with 12 teraflops GPU, Quick Resume and Game Pass compatibility', 'Gaming', 52990.00, 12, TRUE),
('P1031', 'Nintendo Switch OLED', 'Hybrid handheld and TV console with 7-inch OLED screen, 64GB storage and adjustable stand', 'Gaming', 34999.00, 22, TRUE),
('P1032', 'Logitech G502 X Gaming Mouse', 'Wired gaming mouse with HERO 25K sensor, hybrid optical-mechanical switches and 13 programmable buttons', 'Gaming', 5995.00, 65, TRUE),
('P1033', 'Razer BlackWidow V4 Keyboard', 'Full-size mechanical gaming keyboard with Razer Green switches, RGB lighting and magnetic wrist rest', 'Gaming', 14999.00, 27, TRUE),

-- ---------- CAMERA ----------
('P1034', 'Canon EOS R50 (Body + 18-45mm)', 'Compact mirrorless camera with 24.2MP APS-C sensor, 4K video and subject-tracking autofocus', 'Camera', 79995.00, 10, TRUE),
('P1035', 'Sony ZV-E10 Vlogging Camera', 'Interchangeable-lens vlog camera with 24.2MP sensor, flip-out screen and directional 3-capsule mic', 'Camera', 64990.00, 14, TRUE),
('P1036', 'Nikon Z fc (Body + 16-50mm)', 'Retro-styled mirrorless camera with 20.9MP APS-C sensor, vari-angle touchscreen and 4K video', 'Camera', 89990.00, 6, TRUE),
('P1037', 'GoPro HERO13 Black', 'Waterproof action camera with 5.3K video, HyperSmooth stabilization and swappable lens system', 'Camera', 39990.00, 33, TRUE),
('P1038', 'Fujifilm Instax Mini 12', 'Instant film camera with auto exposure, selfie mode and close-up lens for credit-card sized prints', 'Camera', 7999.00, 48, TRUE),

-- ---------- HOME APPLIANCES ----------
('P1039', 'Dyson V12 Detect Slim', 'Cordless vacuum cleaner with laser dust detection, HEPA filtration and up to 60 minutes runtime', 'Home Appliances', 52900.00, 9, TRUE),
('P1040', 'LG 1.5 Ton 5-Star Dual Inverter Split AC', 'Energy-efficient split air conditioner with AI convertible cooling, anti-virus protection and copper condenser', 'Home Appliances', 44990.00, 16, TRUE),
('P1041', 'Samsung 236L Double Door Refrigerator', 'Frost-free double door refrigerator with digital inverter compressor and convertible freezer', 'Home Appliances', 27990.00, 11, TRUE),
('P1042', 'IFB 7kg Front Load Washing Machine', 'Fully automatic front loader with steam wash, 1400 RPM spin and 5-star energy rating', 'Home Appliances', 32990.00, 13, TRUE),
('P1043', 'Philips Air Purifier AC1215', 'Room air purifier with HEPA filter, real-time air quality indicator and coverage up to 333 sq ft', 'Home Appliances', 9999.00, 40, TRUE),

-- ---------- KITCHEN ----------
('P1044', 'Instant Pot Duo 7-in-1 (6L)', 'Multi-cooker that works as pressure cooker, slow cooker, rice cooker, steamer, saute pan, yogurt maker and warmer', 'Kitchen', 9999.00, 34, TRUE),
('P1045', 'Philips Air Fryer HD9252 (4.1L)', 'Rapid Air technology air fryer for low-oil cooking with digital touch panel and dishwasher-safe basket', 'Kitchen', 8995.00, 50, TRUE),
('P1046', 'Prestige PIC 20 Induction Cooktop', '2000W induction cooktop with 8 preset menus, auto shut-off and push-button controls', 'Kitchen', 2999.00, 85, TRUE),
('P1047', 'Bajaj Rex 750W Mixer Grinder', 'Three-jar mixer grinder with stainless steel blades and overload protection', 'Kitchen', 3499.00, 70, TRUE),
('P1048', 'Borosil Glass Lunch Box Set (3 pcs)', 'Microwave-safe borosilicate glass containers with airtight locking lids, leak-proof and easy to clean', 'Kitchen', 1199.00, 110, TRUE),

-- ---------- FITNESS ----------
('P1049', 'Decathlon Domyos Yoga Mat 8mm', 'Non-slip, cushioned yoga and exercise mat with comfortable thickness for joint support', 'Fitness', 1499.00, 100, FALSE),
('P1050', 'Boldfit Adjustable Dumbbell Set (20kg)', 'Pair of adjustable dumbbells with anti-slip grip, changeable plates and secure locking collars', 'Fitness', 4999.00, 45, TRUE),
('P1051', 'Fitness Resistance Bands Set (5 pcs)', 'Set of latex loop resistance bands with varying strengths and carry pouch for home workouts', 'Fitness', 899.00, 180, FALSE),
('P1052', 'Powermax Fitness Foldable Treadmill', 'Motorised foldable treadmill with LCD display, 12 preset programs and shock-absorbing deck', 'Fitness', 24999.00, 7, TRUE),
('P1053', 'Yonex Astrox 88 S Badminton Racket', 'Head-heavy graphite racket built for powerful smashes with a stiff shaft and rotational generator system', 'Fitness', 10990.00, 20, TRUE);