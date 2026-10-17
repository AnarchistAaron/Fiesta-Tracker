import { useState } from "react";

const PHASE_CONFIG = {
  1:   { label: "Phase 1",   color: "#E65100", bg: "#2A1800", desc: "Suspension & Front End" },
  2:   { label: "Phase 2",   color: "#F9A825", bg: "#2A2000", desc: "Cooling & Seals" },
  3:   { label: "Phase 3",   color: "#558B2F", bg: "#0D1A08", desc: "Ignition, Sensors & Exhaust" },
  4:   { label: "Phase 4",   color: "#1565C0", bg: "#071228", desc: "Tappets" },
  6:   { label: "Phase 5",   color: "#AD1457", bg: "#200510", desc: "Map @ Ozmo" },
  7:   { label: "Phase 6",   color: "#546E7A", bg: "#0D1214", desc: "Post-Map Jobs" },
  99:  { label: "Service",   color: "#F57F17", bg: "#1A1200", desc: "Service Items" },
};

const PHASE_ORDER = [1, 2, 3, 4, 6, 7, 99];

const RELIABILITY = [
  { id: "r25", name: "SKF Crank Pulley",                          cost: 37,   status: "ASAP",        phase: 1,   purchased: false, inGarage: false, done: false, asap: true },
  { id: "r26", name: "Febi Bilstein Crank Bolt",                  cost: 3,    status: "ASAP",        phase: 1,   purchased: false, inGarage: false, done: false, asap: true },
  { id: "r27", name: "Dayco V Belt",                              cost: 8,    status: "ASAP",        phase: 1,   purchased: false, inGarage: false, done: false, asap: true },
  { id: "r1",  name: "Front Knuckles, Bearings & Hubs",          cost: null, status: "To Order",     phase: 1,   purchased: false, inGarage: false, done: false },
  { id: "r2",  name: "Meyle HD Tie Rods & Ends",                 cost: null, status: "To Order",     phase: 1,   purchased: false, inGarage: false, done: false },
  { id: "r3",  name: "Front Shocks - Bilstein B8",               cost: 300,  status: "To Order",    phase: 1,   purchased: false, inGarage: false, done: false },
  { id: "r4",  name: "Rear Shocks - Bilstein B8",                cost: 265,  status: "To Order",    phase: 1,   purchased: false, inGarage: false, done: false },
  { id: "r5",  name: "KYB Front & Rear Top Mounts",              cost: null, status: "To Order",     phase: 1,   purchased: false, inGarage: false, done: false },
  { id: "r6",  name: "Front Strut Brace",                        cost: 60,   status: "To Order",    phase: 1,   purchased: false, inGarage: false, done: false },
  { id: "r7",  name: "ARB D Bushes",                             cost: null, status: "To Order",     phase: 1,   purchased: false, inGarage: false, done: false },
  { id: "r19", name: "Mtec Brake Discs x2 (stop-gap)",           cost: 82,   status: "To Order",    phase: 1.5, purchased: false, inGarage: false, done: false },
  { id: "r8",  name: "Full Silicone Coolant Hose Kit",           cost: 163,  status: "To Order",    phase: 2,   purchased: false, inGarage: false, done: false },
  { id: "r9",  name: "Thermostat, Housing & Sensor",             cost: null, status: "To Order",     phase: 2,   purchased: false, inGarage: false, done: false },
  { id: "r10", name: "Formula Power HT Leads",                   cost: 60,   status: "To Order",    phase: 3,   purchased: false, inGarage: false, done: false },
  { id: "r24", name: "NGK Coil Pack",                            cost: 30,   status: "To Order",    phase: 3,   purchased: false, inGarage: false, done: false },
  { id: "r11", name: "NGK LTR6IX-11 Iridium Plugs",             cost: 50,   status: "To Order",    phase: 3,   purchased: false, inGarage: false, done: false },
  { id: "r12", name: "Oil Pressure Sensor",                      cost: null, status: "To Order",     phase: 3,   purchased: false, inGarage: false, done: false },
  { id: "r13", name: "Bucket Tappets x16",                       cost: 140,  status: "To Order",    phase: 4,   purchased: false, inGarage: false, done: false },
  { id: "r14", name: "Cam Cover Gasket (Ford OE)",               cost: 67,   status: "To Order",    phase: 4,   purchased: false, inGarage: false, done: false },
  { id: "r20", name: "Lucas 120A Alternator",                    cost: 110,  status: "To Order",    phase: 4,   purchased: false, inGarage: false, done: false },
  { id: "r21", name: "SNR Aux Belt Tensioner Pulley",            cost: 23,   status: "To Order",    phase: 4,   purchased: false, inGarage: false, done: false },
  { id: "r17", name: "Rear Brake Cylinders & Regrease",          cost: null, status: "To Order",     phase: 7,   purchased: false, inGarage: false, done: false },
  { id: "r18", name: "Luxster Dracarys LEDs",                    cost: 100,  status: "To Order",    phase: 7,   purchased: false, inGarage: false, done: false },
];

const PERFORMANCE = [
  { id: "p4",  name: "Vibratechnics Dogbone Mount",              cost: null, status: "Purchased",   phase: 1,   sub: false, purchased: true,  inGarage: false, done: false },
  { id: "p5",  name: "Redline MTL 75w80 Gearbox Oil",            cost: 53,   status: "To Order",    phase: 1.5, sub: false, purchased: false, inGarage: false, done: false },
  { id: "p6",  name: "TRE & Tie Rod Fit, Tyre Fit & 4-Wheel Track", cost: 150, status: "Garage",   phase: 1.5, sub: false, purchased: false, inGarage: false, done: false },
  { id: "p15", name: "Eagle F1 ASY 6 Tyres x2",                 cost: 220,  status: "To Order",    phase: 1.5, sub: false, purchased: false, inGarage: false, done: false },
  { id: "p1",  name: "Upstream O2 Sensor",                       cost: 70,   status: "To Order",    phase: 3,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p2",  name: "Exhaust Resonator & Clamps",               cost: 130,  status: "To Order",    phase: 3,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p3",  name: "Wurth Exhaust Assembly Paste",             cost: 16,   status: "To Order",    phase: 3,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p7",  name: "Remap @ Ozmo Dorchester",                  cost: 360,  status: "Booked",      phase: 6,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p8",  name: "ST180 Rear Beam & Braided Hoses",          cost: 440,  status: "To Order",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p9",  name: "302mm Front Brake Upgrade",                cost: null, status: "Research",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p9a", name: "Brembo Xtra 302mm 09.A185.1X",            cost: null, status: "Research",    phase: 7,   sub: true,  purchased: false, inGarage: false, done: false },
  { id: "p9b", name: "Fiesta ST180 Calipers",                    cost: null, status: "Research",    phase: 7,   sub: true,  purchased: false, inGarage: false, done: false },
  { id: "p9c", name: "Pumaspeed Carrier for 302mm",              cost: null, status: "Research",    phase: 7,   sub: true,  purchased: false, inGarage: false, done: false },
  { id: "p9d", name: "Brembo Xtra Pads P24153X",                cost: null, status: "Research",    phase: 7,   sub: true,  purchased: false, inGarage: false, done: false },
  { id: "p10", name: "Brembo Xtra Pads P24072X (standard)",     cost: 70,   status: "To Order",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p11", name: "Vibratechnics Transmission Mount",         cost: 150,  status: "To Order",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p12", name: "Vibratechnics Engine Mount",               cost: 150,  status: "To Order",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p13", name: "Rear Strut Brace",                         cost: 100,  status: "To Order",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p14", name: "Speaker Kit",                              cost: 120,  status: "To Order",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p16", name: "Braided Brake Lines - Front & Rear",       cost: 120,  status: "To Order",    phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
  { id: "p17", name: "Miltek Sport Exhaust, Manifold & Sport CAT", cost: 1000, status: "To Order",  phase: 7,   sub: false, purchased: false, inGarage: false, done: false },
];

const AESTHETICS = [
  { id: "a1",  name: "Front Bumper Refit",                       cost: 10,   status: "To Order",    phase: 1,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a2",  name: "Front Grill Fit",                          cost: null, status: "To Order",    phase: 1,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a17", name: "Ford Rear Badge",                          cost: 20,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a18", name: "Headlight Enclosures - Left & Right",      cost: 260,  status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a19", name: "Maxton Design Rear Valence (twin exit)",   cost: 390,  status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a4",  name: "Weighted Gear Knob",                       cost: 55,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a5",  name: "Frozen White Misting Washer Jets",         cost: 40,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a6",  name: "Front Badge",                              cost: 20,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a7",  name: "Rear Wiper Delete",                        cost: 15,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a8",  name: "New Side Sequentials",                     cost: 20,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a9",  name: "New Alloy Wheels",                         cost: null, status: "Research",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a10", name: "Foliatech Caliper Paint",                  cost: 25,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a11", name: "Front Fogs",                               cost: 46,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a12", name: "Rear LED Fogs (+ reverse)",                cost: 150,  status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a13", name: "Wheel Nuts",                               cost: 23,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a14", name: "Dent Removal",                             cost: 150,  status: "To Order",    phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a15", name: "Wing Mirror Covers",                       cost: 30,   status: "To Order",   phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
  { id: "a16", name: "Full Leather Interior (used Fiesta)",      cost: 250,  status: "Sourced",    phase: 7,  sub: false, purchased: false, inGarage: false, done: false },
];

const HISTORY_INITIAL = [
  { id: "h89", desc: "Ford Cam Bolts & Phaser Oil Plugs",                                   date: "07/26", mileage: "159,660" },
  { id: "h88", desc: "Fitment of Phasers, O2 Sensor, Cambelt, TRE, Tie Rods & Tracking",  date: "07/26", mileage: "159,660" },
  { id: "h87", desc: "Gates PowerGrip G-Force Redline Cam Belt",                           date: "07/26", mileage: "159,660" },
  { id: "h86", desc: "Ford OEM Phasers Intake & Exhaust",                                  date: "07/26", mileage: "159,660" },
  { id: "h85", desc: "Bosch Pre-CAT O2 Sensor",                                            date: "07/26", mileage: "159,660" },
  { id: "h84", desc: "Meyle HD Tie Rods & Ends",                                           date: "07/26", mileage: "159,660" },
  { id: "h83", desc: "Bosch ABS Sensors Front",                                            date: "07/26", mileage: "159,580" },
  { id: "h82", desc: "Reinhock Front Knuckles, SKF Bearings & GSP Hubs",                  date: "07/26", mileage: "159,580" },
  { id: "h81", desc: "Pierburg Exhaust VVT Solenoid",                                      date: "07/26", mileage: "159,500" },
  { id: "h80", desc: "Mahle Oil Filter (Filter Change)",                                   date: "07/26", mileage: "159,500" },
  { id: "h79", desc: "Ravenol FDS 5w30 5L (Oil Change)",                                   date: "07/26", mileage: "159,500" },
  { id: "h78", desc: "Ford PCV Grommet",                                                   date: "07/26", mileage: "159,460" },
  { id: "h77", desc: "TerraClean",                                                         date: "07/26", mileage: "159,460" },
  { id: "h75", desc: "XADO Carbon Clean",                                                  date: "07/26", mileage: "159,360" },
  { id: "h74", desc: "2nd Hand Valeo FoMoCo Alternator",                                   date: "07/26", mileage: "159,050" },
  { id: "h73", desc: "Used Ford Genuine OEM Fuel Rail Dampener",                           date: "07/26", mileage: "158,400" },
  { id: "h72", desc: "NGK LTR6IX-11 Iridium Plugs",                                       date: "06/26", mileage: "157,775" },
  { id: "h71", desc: "Bosch Injectors",                                                    date: "06/26", mileage: "157,500" },
  { id: "h70", desc: "NGK Coil Pack",                                                      date: "06/26", mileage: "157,000" },
  { id: "h69", desc: "Full Leather Interior (used Fiesta)",                                date: "06/26", mileage: "157,000" },
  { id: "h68", desc: "Gbox Flush & Full Redline MTL Fill",                                 date: "05/26", mileage: "155,740" },
  { id: "h67", desc: "Dark Ice Short Shifter",                                             date: "05/26", mileage: "155,447" },
  { id: "h66", desc: "Mahle Oil Filter (Filter Change)",                                   date: "05/26", mileage: "155,000" },
  { id: "h65", desc: "Ravenol VST 5w40 5L (Oil Change)",                                   date: "05/26", mileage: "155,000" },
  { id: "h64", desc: "7 Inch Stubby Aerial",                                               date: "05/26", mileage: "154,830" },
  { id: "h63", desc: "Full Brake Bleed Inc Clutch, DOT4LV & RLD4 Dye Added",              date: "05/26", mileage: "154,830" },
  { id: "h62", desc: "New Side Sequentials",                                               date: "05/26", mileage: "154,445" },
  { id: "h61", desc: "Cam Cover Gasket (Ford OE)",                                         date: "05/26", mileage: "154,300" },
  { id: "h60", desc: "MOT, Crank Pulley Fit",                                              date: "05/26", mileage: "154,300" },
  { id: "h59", desc: "Dayco V Belt",                                                       date: "05/26", mileage: "154,300" },
  { id: "h58", desc: "Febi Bilstein Crank Bolt",                                           date: "05/26", mileage: "154,300" },
  { id: "h57", desc: "SKF Crank Pulley",                                                   date: "05/26", mileage: "154,300" },
  { id: "h56", desc: "TRW LCA Left",                                                       date: "05/26", mileage: "154,150" },
  { id: "h55", desc: "Brembo Xtra Pads P24072X (standard)",                               date: "04/26", mileage: "153,650" },
  { id: "h54", desc: "Front Fogs",                                                         date: "04/26", mileage: "153,020" },
  { id: "h53", desc: "Front Bumper Refit",                                                 date: "04/26", mileage: "153,020" },
  { id: "h52", desc: "2nd Hand Recirculation Flap Motor",                                  date: "04/26", mileage: "152,700" },
  { id: "h51", desc: "Front Grill Fit",                                                    date: "04/26", mileage: "152,620" },
  { id: "h50", desc: "Redline MTL 75w80 Gearbox Oil",                                      date: "03/26", mileage: "151,950" },
  { id: "h49", desc: "Mahle Oil Filter (Filter Change)",                                   date: "03/26", mileage: "151,950" },
  { id: "h48", desc: "Mannol Legend 0w40 (Oil Change)",                                    date: "03/26", mileage: "151,950" },
  { id: "h47", desc: "Rear Wiper Delete",                                                  date: "03/26", mileage: "151,745" },
  { id: "h46", desc: "2nd Hand Passenger Door",                                            date: "03/26", mileage: "151,600" },
  { id: "h45", desc: "Mtec Brake Discs x2 (stop-gap)",                                    date: "03/26", mileage: "151,550" },
  { id: "h44", desc: "Vibratechnics Dogbone Mount",                                        date: "03/26", mileage: "151,150" },
  { id: "h43", desc: "Part Worn Front Tyres",                                              date: "03/26", mileage: "151,000" },
  { id: "h42", desc: "New Boot Button",                                                    date: "03/26", mileage: "150,000" },
  { id: "h41", desc: "New Heater Resistor",                                                date: "03/26", mileage: "150,000" },
  { id: "h40", desc: "New Bosch Throttle Body",                                            date: "02/26", mileage: "149,900" },
  { id: "h39", desc: "New Febi Gearbox Mount",                                             date: "02/26", mileage: "149,800" },
  { id: "h38", desc: "Used Gearbox (60k miles) + Motul 300 75w90, Liquimoly Gear Additive, Valeo Clutch, Sachs CSC", date: "02/26", mileage: "149,800" },
  { id: "h37", desc: "New TRW LCAs & 12.9 Bolts",                                         date: "01/26", mileage: "147,900" },
  { id: "h36", desc: "New Yuasa 5000 Battery",                                             date: "01/26", mileage: "147,500" },
  { id: "h35", desc: "Oil & Filter Change + Velosyn",                                      date: "01/26", mileage: "147,500" },
  { id: "h34", desc: "2nd Hand Knuckle, Hub & Bearing - O/S",                             date: "12/25", mileage: "146,500" },
  { id: "h33", desc: "New GSP Passenger Side Driveshaft",                                  date: "12/25", mileage: "146,500" },
  { id: "h32", desc: "New Vaico Expansion Tank",                                           date: "12/25", mileage: "146,000" },
  { id: "h31", desc: "New Lemforder RH Engine Mount",                                      date: "12/25", mileage: "146,000" },
  { id: "h30", desc: "New Meyle HD ARB Links",                                             date: "12/25", mileage: "145,500" },
  { id: "h29", desc: "Falken FK520 Front Tyres & Alignment",                               date: "11/25", mileage: "144,100" },
  { id: "h28", desc: "New Lesjofors Front Springs & Top Mounts",                           date: "11/25", mileage: "144,000" },
  { id: "h27", desc: "New SKF Rear Wheel Bearings",                                        date: "11/25", mileage: "143,500" },
  { id: "h26", desc: "New Lesjofors Rear Coil Springs & Isolators",                        date: "10/25", mileage: "142,400" },
  { id: "h25", desc: "Oil & Filter Change Inc Cabin + Velosyn",                            date: "10/25", mileage: "142,100" },
  { id: "h24", desc: "Genuine Ford Cam Cover Gasket",                                      date: "10/25", mileage: "141,800" },
  { id: "h23", desc: "New Elstock Starter Motor",                                          date: "10/25", mileage: "141,700" },
  { id: "h22", desc: "Falken FK520 Front Tyres",                                           date: "10/25", mileage: "141,500" },
  { id: "h21", desc: "Brembo Xtra Front Pads",                                             date: "10/25", mileage: "140,700" },
  { id: "h20", desc: "INA Cambelt, Waterpump, Tensioner & Aux Belt",                       date: "08/25", mileage: "137,000" },
  { id: "h19", desc: "Greased All Joints, New CAI",                                        date: "08/25", mileage: "135,700" },
  { id: "h18", desc: "New CKP Sensor & Loom",                                              date: "07/25", mileage: "134,900" },
  { id: "h17", desc: "Oil & Filter Change Inc Additives (Nano C5, Velosyn, AR9100)",       date: "07/25", mileage: "134,700" },
  { id: "h16", desc: "Front Tyres & Tracking",                                             date: "06/25", mileage: "134,300" },
  { id: "h15", desc: "Spark Plugs & PCV Valve",                                            date: "06/25", mileage: "132,900" },
  { id: "h14", desc: "New GSP Drivers Side Driveshaft, Gearbox Oil Change & Additive",    date: "05/25", mileage: "131,500" },
  { id: "h13", desc: "Delphi Rear Shoes & MOT",                                            date: "05/25", mileage: "131,000" },
  { id: "h12", desc: "Valeo Clutch & Slave Cylinder",                                      date: "05/25", mileage: "130,050" },
  { id: "h11", desc: "Oil & Filter Change Inc Air Filter",                                 date: "04/25", mileage: "128,700" },
  { id: "h10", desc: "2nd Hand Nissens Radiator Fan",                                      date: "04/25", mileage: "128,000" },
  { id: "h9",  desc: "Front Tyres & Tracking",                                             date: "03/25", mileage: "127,000" },
  { id: "h8",  desc: "Left Front Control Arm",                                             date: "02/25", mileage: "124,500" },
  { id: "h7",  desc: "Delphi Tie Rods & Ends",                                             date: "02/25", mileage: "124,000" },
  { id: "h6",  desc: "Cam Cover Gasket",                                                   date: "02/25", mileage: "124,000" },
  { id: "h5",  desc: "Front Brembo Xtra Drilled Discs & EBC Green Pads",                  date: "02/25", mileage: "123,500" },
  { id: "h4",  desc: "Front Control Arms, Lower Engine Mount & 4 Tyres",                  date: "12/24", mileage: "120,000" },
  { id: "h3",  desc: "New Front Bumper",                                                   date: "11/24", mileage: "118,000" },
  { id: "h2",  desc: "x2 Trailing Arm Bushes",                                             date: "04/23", mileage: "105,210" },
];

const STATUS_COLORS = {
  "Purchased": "#2E7D32", "In Garage": "#F57F17", "Done": "#1B5E20", "Booked": "#AD1457",
  "Sourced": "#1565C0", "To Order": "#666",
  "Garage": "#F57F17", "Research": "#6A1B9A", "Service Items": "#F57F17",
  "With tappets": "#1565C0", "Post-Map": "#546E7A", "ASAP": "#FF5252",
};

const SECTION_META = {
  reliability: { label: "RELIABILITY", color: "#E65100" },
  performance: { label: "PERFORMANCE", color: "#1565C0" },
  aesthetics:  { label: "AESTHETICS",  color: "#6A1B9A" },
};

const DEFAULT_PHASE_DESCS = {
  1: "Suspension & Front End", 2: "Cooling & Seals",
  3: "Ignition, Sensors & Exhaust", 4: "Tappets", 6: "Map @ Ozmo", 7: "Post-Map Jobs", 99: "Service Items"
};

function calcPhaseTotals(items) {
  var totals = {};
  items.forEach(function(item) {
    if (!item.purchased && !item.done && item.cost) {
      totals[item.phase] = (totals[item.phase] || 0) + item.cost;
    }
  });
  return totals;
}

(function() {
  try {
    if (localStorage.getItem("ft_version") !== "v9") {
      localStorage.setItem("ft_version", "v9");
      localStorage.removeItem("ft_reliability");
      localStorage.removeItem("ft_performance");
      localStorage.removeItem("ft_aesthetics");
    }
  } catch(e) {}
})();

export default function App() {
  var load = function(key, def) {
    try { var s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch(e) { return def; }
  };
  var loadInt = function(key, def) {
    try { var s = localStorage.getItem(key); return s ? parseInt(s, 10) : def; } catch(e) { return def; }
  };
  var loadStr = function(key, def) {
    try { return localStorage.getItem(key) || def; } catch(e) { return def; }
  };
  var loadBool = function(key) {
    try { return localStorage.getItem(key) === "true"; } catch(e) { return false; }
  };

  const [history, setHistory] = useState(function() { return load("ft_history", HISTORY_INITIAL); });
  const [reliability, setReliability] = useState(function() { return load("ft_reliability", RELIABILITY); });
  const [performance, setPerformance] = useState(function() { return load("ft_performance", PERFORMANCE); });
  const [aesthetics, setAesthetics] = useState(function() { return load("ft_aesthetics", AESTHETICS); });
  const [currentMileage, setCurrentMileage] = useState(function() { return loadInt("ft_mileage", 159660); });
  const [nextService, setNextService] = useState(function() { return loadInt("ft_nextservice", 164500); });
  const [oilName, setOilName] = useState(function() { return loadStr("ft_oilname", "Mannol Legend 0w40 & Velosyn"); });
  const [oilCost, setOilCost] = useState(function() { return loadStr("ft_oilcost", "60"); });
  const [filterName, setFilterName] = useState(function() { return loadStr("ft_filtername", "Mahle Oil Filter"); });
  const [filterCost, setFilterCost] = useState(function() { return loadStr("ft_filtercost", "8"); });
  const [oilPurchased, setOilPurchased] = useState(function() { return loadBool("ft_oilpurchased"); });
  const [filterPurchased, setFilterPurchased] = useState(function() { return loadBool("ft_filterpurchased"); });
  const [oilInGarage, setOilInGarage] = useState(function() { return loadBool("ft_oilingarage"); });
  const [filterInGarage, setFilterInGarage] = useState(function() { return loadBool("ft_filteringarage"); });
  const [phaseDescs, setPhaseDescs] = useState(function() { return load("ft_phasedescs", DEFAULT_PHASE_DESCS); });

  const [activeSection, setActiveSection] = useState("all");
  const [activePhase, setActivePhase] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [pendingFitId, setPendingFitId] = useState(null);
  const [mileageInput, setMileageInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({});
  const [editingMileage, setEditingMileage] = useState(false);
  const [mileageEditVal, setMileageEditVal] = useState("");
  const [confirmMileage, setConfirmMileage] = useState(false);
  const [editingService, setEditingService] = useState(false);
  const [serviceEditVal, setServiceEditVal] = useState("");
  const [confirmService, setConfirmService] = useState(false);
  const [editingOil, setEditingOil] = useState(false);
  const [editingFilter, setEditingFilter] = useState(false);
  const [oilNameEdit, setOilNameEdit] = useState("");
  const [oilCostEdit, setOilCostEdit] = useState("");
  const [filterNameEdit, setFilterNameEdit] = useState("");
  const [filterCostEdit, setFilterCostEdit] = useState("");
  const [newItem, setNewItem] = useState({ name: "", category: "reliability", phase: 1, cost: "", status: "To Order", asap: false });
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [editingPhaseDesc, setEditingPhaseDesc] = useState(null);
  const [phaseDescEdit, setPhaseDescEdit] = useState("");
  const [customPhases, setCustomPhases] = useState(function() { return load("ft_customphases", []); });
  const [newPhaseLabel, setNewPhaseLabel] = useState("");
  const [newPhaseDesc, setNewPhaseDesc] = useState("");
  const [newPhaseColor, setNewPhaseColor] = useState("#9C27B0");
  const [newPhasePosition, setNewPhasePosition] = useState("end");
  const [confirmAddPhase, setConfirmAddPhase] = useState(false);
  const [confirmDeletePhase, setConfirmDeletePhase] = useState(null);
  const [showHistoryExport, setShowHistoryExport] = useState(false);
  const [showAllExport, setShowAllExport] = useState(false);
  const [showManageExport, setShowManageExport] = useState(false);
  const [newHistDesc, setNewHistDesc] = useState("");
  const [newHistDate, setNewHistDate] = useState("");
  const [newHistMileage, setNewHistMileage] = useState("");
  const [confirmAddHist, setConfirmAddHist] = useState(false);
  const [editHistoryId, setEditHistoryId] = useState(null);
  const [editHistoryData, setEditHistoryData] = useState({});

  // Merge custom phases into config and order
  var allPhaseConfig = Object.assign({}, PHASE_CONFIG);
  customPhases.forEach(function(cp) { allPhaseConfig[cp.id] = { label: cp.label, color: cp.color, bg: cp.bg, desc: cp.desc }; });

  var builtInOrder = [1, 2, 3, 4, 6, 7, 99];
  var allPhaseOrder = builtInOrder.slice();
  customPhases.forEach(function(cp) {
    var pos = cp.position;
    if (pos === "end") {
      var idx99 = allPhaseOrder.indexOf(99);
      allPhaseOrder.splice(idx99, 0, cp.id);
    } else {
      var insertAfter = parseFloat(pos);
      var idx = allPhaseOrder.indexOf(insertAfter);
      if (idx !== -1) allPhaseOrder.splice(idx + 1, 0, cp.id);
      else allPhaseOrder.push(cp.id);
    }
  });

  var allItems = [...reliability, ...performance, ...aesthetics];
  var activeItems = allItems.filter(function(i) { return !i.done; });
  var phaseTotals = calcPhaseTotals(activeItems);
  var premap = [1, 2, 3, 4].reduce(function(a, p) { return a + (phaseTotals[p] || 0); }, 0);
  var customPhaseTotal = customPhases.reduce(function(a, cp) { return a + (phaseTotals[cp.id] || 0); }, 0);
  var postmap = (phaseTotals[6] || 0) + (phaseTotals[7] || 0) + customPhaseTotal;
  var grand = premap + postmap + (phaseTotals[99] || 0);
  var milesLeft = nextService - currentMileage;
  var svcColor = milesLeft <= 500 ? "#FF5252" : milesLeft <= 1000 ? "#F57F17" : "#4CAF50";

  function save(rel, perf, aes, hist, mil) {
    try {
      localStorage.setItem("ft_reliability", JSON.stringify(rel));
      localStorage.setItem("ft_performance", JSON.stringify(perf));
      localStorage.setItem("ft_aesthetics", JSON.stringify(aes));
      localStorage.setItem("ft_history", JSON.stringify(hist));
      localStorage.setItem("ft_mileage", String(mil));
    } catch(e) {}
  }

  function getDesc(phNum) {
    return phaseDescs[phNum] || phaseDescs[String(phNum)] || (allPhaseConfig[phNum] && allPhaseConfig[phNum].desc) || String(phNum);
  }

  function getSetter(id) {
    if (reliability.find(function(i) { return i.id === id; })) return setReliability;
    if (performance.find(function(i) { return i.id === id; })) return setPerformance;
    return setAesthetics;
  }

  function getArr(id) {
    if (reliability.find(function(i) { return i.id === id; })) return reliability;
    if (performance.find(function(i) { return i.id === id; })) return performance;
    return aesthetics;
  }

  function updateItem(id, updates) {
    var newRel = reliability.map(function(i) { return i.id === id ? Object.assign({}, i, updates) : i; });
    var newPerf = performance.map(function(i) { return i.id === id ? Object.assign({}, i, updates) : i; });
    var newAes = aesthetics.map(function(i) { return i.id === id ? Object.assign({}, i, updates) : i; });
    setReliability(newRel); setPerformance(newPerf); setAesthetics(newAes);
    save(newRel, newPerf, newAes, history, currentMileage);
  }

  function markPurchased(id) { updateItem(id, { purchased: true, cost: null, status: "Purchased" }); setConfirmId(null); }
  function markInGarage(id) { updateItem(id, { inGarage: true, status: "In Garage" }); setConfirmId(null); }

  function markDone(id, mileage) {
    var now = new Date();
    var dateStr = String(now.getMonth()+1).padStart(2,"0") + "/" + String(now.getFullYear()).slice(2);
    var mileageNum = parseInt(String(mileage).replace(/,/g,""), 10) || currentMileage;
    var item = allItems.find(function(i) { return i.id === id; });
    var newHist = [{ id: "h_"+Date.now(), desc: item ? item.name : "Unknown", date: dateStr, mileage: mileageNum.toLocaleString() }].concat(history);
    var newMil = Math.max(mileageNum, currentMileage);
    setHistory(newHist);
    setCurrentMileage(newMil);
    var newRel = reliability.map(function(i) { return i.id === id ? Object.assign({}, i, { done: true, status: "Done" }) : i; });
    var newPerf = performance.map(function(i) { return i.id === id ? Object.assign({}, i, { done: true, status: "Done" }) : i; });
    var newAes = aesthetics.map(function(i) { return i.id === id ? Object.assign({}, i, { done: true, status: "Done" }) : i; });
    setReliability(newRel); setPerformance(newPerf); setAesthetics(newAes);
    save(newRel, newPerf, newAes, newHist, newMil);
    try { localStorage.setItem("ft_history", JSON.stringify(newHist)); } catch(e) {}
    setConfirmId(null); setPendingFitId(null); setMileageInput("");
  }

  function deleteItem(id) {
    var newRel = reliability.filter(function(i) { return i.id !== id; });
    var newPerf = performance.filter(function(i) { return i.id !== id; });
    var newAes = aesthetics.filter(function(i) { return i.id !== id; });
    setReliability(newRel); setPerformance(newPerf); setAesthetics(newAes);
    save(newRel, newPerf, newAes, history, currentMileage);
    setConfirmDeleteId(null);
  }

  function deleteHistoryItem(id) {
    var newHist = history.filter(function(h) { return h.id !== id; });
    setHistory(newHist);
    try { localStorage.setItem("ft_history", JSON.stringify(newHist)); } catch(e) {}
    setConfirmDeleteId(null);
  }

  function addItem() {
    var cost = newItem.cost === "" ? null : parseInt(newItem.cost, 10);
    var item = { id: "custom_"+Date.now(), name: newItem.name, cost: cost,
      status: newItem.asap ? "ASAP" : newItem.status, phase: parseFloat(newItem.phase),
      sub: false, purchased: false, inGarage: false, done: false, asap: newItem.asap };
    var itemWithPhase = newItem.category === "service" ? Object.assign({}, item, { phase: 99 }) : item;
    var newRel = (newItem.category === "reliability" || newItem.category === "service") ? reliability.concat([itemWithPhase]) : reliability;
    var newPerf = newItem.category === "performance" ? performance.concat([item]) : performance;
    var newAes = newItem.category === "aesthetics" ? aesthetics.concat([item]) : aesthetics;
    setReliability(newRel); setPerformance(newPerf); setAesthetics(newAes);
    save(newRel, newPerf, newAes, history, currentMileage);
    setNewItem({ name: "", category: "reliability", phase: 1, cost: "", status: "To Order", asap: false });
    setConfirmAdd(false);
  }

  function saveEditItem() {
    var cost = editItemData.cost === "" ? null : parseInt(editItemData.cost, 10);
    var updates = { name: editItemData.name, cost: cost, status: editItemData.asap ? "ASAP" : editItemData.status, phase: parseFloat(editItemData.phase), asap: editItemData.asap, dueMileage: editItemData.dueMileage || null };
    var id = editItemId;
    var newCat = editItemData.category;
    var curCat = reliability.find(function(i) { return i.id === id; }) ? "reliability" : performance.find(function(i) { return i.id === id; }) ? "performance" : "aesthetics";

    if (newCat && newCat !== curCat) {
      // Move item to new category
      var item = [...reliability, ...performance, ...aesthetics].find(function(i) { return i.id === id; });
      var updatedItem = Object.assign({}, item, updates);
      var newRel = curCat === "reliability" ? reliability.filter(function(i) { return i.id !== id; }) : newCat === "reliability" ? reliability.concat([updatedItem]) : reliability;
      var newPerf = curCat === "performance" ? performance.filter(function(i) { return i.id !== id; }) : newCat === "performance" ? performance.concat([updatedItem]) : performance;
      var newAes = curCat === "aesthetics" ? aesthetics.filter(function(i) { return i.id !== id; }) : newCat === "aesthetics" ? aesthetics.concat([updatedItem]) : aesthetics;
      setReliability(newRel); setPerformance(newPerf); setAesthetics(newAes);
      save(newRel, newPerf, newAes, history, currentMileage);
    } else {
      updateItem(id, updates);
    }
    setEditItemId(null); setEditItemData({});
  }

  function markOilFitted(mileage) {
    var now = new Date();
    var dateStr = String(now.getMonth()+1).padStart(2,"0") + "/" + String(now.getFullYear()).slice(2);
    var mileageNum = parseInt(String(mileage).replace(/,/g,""), 10) || currentMileage;
    var newNextSvc = mileageNum + 5000;
    var newHist = [{ id: "h_"+Date.now(), desc: oilName+" (Oil Change)", date: dateStr, mileage: mileageNum.toLocaleString() }].concat(history);
    setHistory(newHist); setNextService(newNextSvc); setOilPurchased(false); setOilInGarage(false);
    var newMil = Math.max(mileageNum, currentMileage);
    setCurrentMileage(newMil);
    try {
      localStorage.setItem("ft_history", JSON.stringify(newHist));
      localStorage.setItem("ft_nextservice", String(newNextSvc));
      localStorage.setItem("ft_mileage", String(newMil));
      localStorage.setItem("ft_oilpurchased", "false");
      localStorage.setItem("ft_oilingarage", "false");
    } catch(e) {}
    setConfirmId(null); setPendingFitId(null); setMileageInput("");
  }

  function markFilterFitted(mileage) {
    var now = new Date();
    var dateStr = String(now.getMonth()+1).padStart(2,"0") + "/" + String(now.getFullYear()).slice(2);
    var mileageNum = parseInt(String(mileage).replace(/,/g,""), 10) || currentMileage;
    var newHist = [{ id: "h_"+Date.now(), desc: filterName+" (Filter Change)", date: dateStr, mileage: mileageNum.toLocaleString() }].concat(history);
    setHistory(newHist); setFilterPurchased(false); setFilterInGarage(false);
    var newMil = Math.max(mileageNum, currentMileage);
    setCurrentMileage(newMil);
    try {
      localStorage.setItem("ft_history", JSON.stringify(newHist));
      localStorage.setItem("ft_mileage", String(newMil));
      localStorage.setItem("ft_filterpurchased", "false");
      localStorage.setItem("ft_filteringarage", "false");
    } catch(e) {}
    setConfirmId(null); setPendingFitId(null); setMileageInput("");
  }

  function getItems(section) {
    var items = section === "reliability" ? reliability : section === "performance" ? performance : aesthetics;
    items = items.filter(function(i) { return !i.done; });
    if (activePhase !== null) items = items.filter(function(i) { return i.phase === activePhase; });
    return items;
  }

  function renderFittedStep(itemId, onConfirm) {
    if (pendingFitId === itemId) {
      return (
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <input type="text" value={mileageInput} onChange={function(e) { setMileageInput(e.target.value); }}
            style={{ width: 72, padding: "4px 6px", background: "#0D0D0D", border: "1px solid #1565C0", color: "#42A5F5", fontSize: 9, borderRadius: 2, fontFamily: "inherit" }} />
          <button onClick={function() { onConfirm(mileageInput); }}
            style={{ padding: "4px 8px", background: "#0D1F3A", border: "1px solid #1565C0", color: "#42A5F5", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>OK</button>
          <button onClick={function() { setPendingFitId(null); setMileageInput(""); setConfirmId(null); }}
            style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
        </div>
      );
    }
    if (confirmId === ("fit-"+itemId)) {
      return (
        <div style={{ display: "flex", gap: 3 }}>
          <button onClick={function() { setPendingFitId(itemId); setMileageInput(currentMileage.toLocaleString()); }}
            style={{ padding: "4px 8px", background: "#0D1F3A", border: "1px solid #1565C0", color: "#42A5F5", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>YES</button>
          <button onClick={function() { setConfirmId(null); }}
            style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
        </div>
      );
    }
    return (
      <button onClick={function() { setConfirmId("fit-"+itemId); }}
        style={{ padding: "4px 8px", background: "transparent", border: "1px solid #1565C0", color: "#42A5F5", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>FITTED</button>
    );
  }

  function renderGarageStep(itemId, onConfirm) {
    if (confirmId === ("garage-"+itemId)) {
      return (
        <div style={{ display: "flex", gap: 3 }}>
          <button onClick={onConfirm}
            style={{ padding: "4px 8px", background: "#1A1200", border: "1px solid #F57F17", color: "#F57F17", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>YES</button>
          <button onClick={function() { setConfirmId(null); }}
            style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
        </div>
      );
    }
    return (
      <button onClick={function() { setConfirmId("garage-"+itemId); }}
        style={{ padding: "4px 8px", background: "transparent", border: "1px solid #F57F17", color: "#F57F17", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>IN GARAGE</button>
    );
  }

  function renderBuyStep(itemId, onConfirm) {
    if (confirmId === ("buy-"+itemId)) {
      return (
        <div style={{ display: "flex", gap: 3 }}>
          <button onClick={onConfirm}
            style={{ padding: "4px 8px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>YES</button>
          <button onClick={function() { setConfirmId(null); }}
            style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
        </div>
      );
    }
    return (
      <button onClick={function() { setConfirmId("buy-"+itemId); }}
        style={{ padding: "4px 8px", background: "transparent", border: "1px solid #1B5E20", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>PURCHASED</button>
    );
  }

  function renderActions(item, isDone, isPurchased, is302Group) {
    if (isDone) return <div style={{ color: "#42A5F5", fontSize: 14, flexShrink: 0 }}>OK</div>;
    if (is302Group || item.sub) return null;

    var inGarage = item.inGarage;
    var hasCost = !!item.cost;
    var isResearch = item.status === "Research";

    if (isResearch) return null;

    return (
      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
        {!isPurchased && hasCost && renderBuyStep(item.id, function() { markPurchased(item.id); })}
        {(isPurchased || !hasCost) && !inGarage && renderGarageStep(item.id, function() { markInGarage(item.id); })}
        {inGarage && renderFittedStep(item.id, function(m) { markDone(item.id, m); })}
        {!isPurchased && hasCost && (
          <button disabled style={{ padding: "4px 8px", background: "transparent", border: "1px solid #1A1A1A", color: "#2A2A2A", fontSize: 9, borderRadius: 2, cursor: "not-allowed", fontFamily: "inherit" }}>FITTED</button>
        )}
        {isPurchased && !inGarage && (
          <button disabled style={{ padding: "4px 8px", background: "transparent", border: "1px solid #1A1A1A", color: "#2A2A2A", fontSize: 9, borderRadius: 2, cursor: "not-allowed", fontFamily: "inherit" }}>FITTED</button>
        )}
      </div>
    );
  }

  function renderItem(item, idx) {
    var isDone = item.done;
    var isPurchased = item.purchased;
    var is302Group = ["p9","p9a","p9b","p9c","p9d"].includes(item.id);
    var phase = allPhaseConfig[item.phase] || { color: "#333", label: "" };
    var rowFill = isDone ? "#080D12" : idx % 2 === 0 ? "#0D0D0D" : "#0A0A0A";
    var isEditingThis = editMode && editItemId === item.id;

    if (isEditingThis) {
      return (
        <div key={item.id} style={{ background: "#0F0F0F", borderBottom: "1px solid #E65100", padding: "12px 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input type="text" value={editItemData.name || ""} onChange={function(e) { setEditItemData(Object.assign({}, editItemData, { name: e.target.value })); }}
              style={{ padding: "6px 8px", background: "#0A0A0A", border: "1px solid #E65100", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit" }} />
            {parseFloat(editItemData.phase) === 99 && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: "#666", letterSpacing: 1, flexShrink: 0 }}>DUE AT (mi)</span>
                <input type="text" value={editItemData.dueMileage || ""} onChange={function(e) { setEditItemData(Object.assign({}, editItemData, { dueMileage: e.target.value })); }}
                  placeholder="e.g. 160,000" style={{ flex: 1, padding: "5px 8px", background: "#0A0A0A", border: "1px solid #F57F17", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
              </div>
            )}
            <select value={editItemData.category || "reliability"} onChange={function(e) { setEditItemData(Object.assign({}, editItemData, { category: e.target.value })); }}
              style={{ padding: "5px 6px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 10, borderRadius: 2, fontFamily: "inherit" }}>
              <option value="reliability">Reliability</option>
              <option value="performance">Performance</option>
              <option value="aesthetics">Aesthetics</option>
            </select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <select value={editItemData.phase || 1} onChange={function(e) { setEditItemData(Object.assign({}, editItemData, { phase: e.target.value })); }}
                style={{ padding: "5px 6px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 10, borderRadius: 2, fontFamily: "inherit" }}>
                <option value="1">Phase 1</option>
                <option value="2">Phase 2</option>
                <option value="3">Phase 3</option>
                <option value="4">Phase 4</option>
                <option value="6">Phase 5 (Map)</option>
                <option value="7">Phase 6</option>
                <option value="99">Mileage</option>
                {customPhases.map(function(cp) { return <option key={String(cp.id)} value={String(cp.id)}>{cp.label}</option>; })}
              </select>
              <select value={editItemData.status || "To Order"} onChange={function(e) { setEditItemData(Object.assign({}, editItemData, { status: e.target.value })); }}
                style={{ padding: "5px 6px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 10, borderRadius: 2, fontFamily: "inherit" }}>
                <option value="To Order">To Order</option>
                <option value="In Garage">In Garage</option>
                <option value="Research">Research</option>
                <option value="Garage">Garage</option>
                <option value="Booked">Booked</option>
                <option value="Sourced">Sourced</option>
                <option value="ASAP">ASAP</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#888" }}>£</span>
              <input type="number" value={editItemData.cost === null ? "" : (editItemData.cost || "")} onChange={function(e) { setEditItemData(Object.assign({}, editItemData, { cost: e.target.value })); }}
                style={{ width: 70, padding: "5px 6px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
              <button onClick={function() { setEditItemData(Object.assign({}, editItemData, { asap: !editItemData.asap })); }}
                style={{ padding: "4px 10px", background: editItemData.asap ? "#7F0000" : "transparent", border: "1px solid "+(editItemData.asap ? "#FF5252" : "#333"), color: editItemData.asap ? "#FF5252" : "#555", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>ASAP</button>
              <button onClick={saveEditItem} style={{ padding: "4px 12px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", marginLeft: "auto" }}>SAVE</button>
              <button onClick={function() { setEditItemId(null); setEditItemData({}); }} style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={item.id} onClick={editMode ? function() { setEditItemId(item.id); (function() {
            var cat = reliability.find(function(i) { return i.id === item.id; }) ? "reliability" : performance.find(function(i) { return i.id === item.id; }) ? "performance" : "aesthetics";
            setEditItemData({ name: item.name, phase: String(item.phase), status: item.status || "To Order", cost: item.cost === null ? "" : String(item.cost || ""), asap: item.asap || false, category: cat, dueMileage: item.dueMileage || "" });
          })(); } : undefined}
        style={{ display: "flex", alignItems: "center", padding: "10px 16px", background: editMode ? "#0F0800" : rowFill, borderBottom: "1px solid "+(editMode ? "#2A1200" : "#141414"), opacity: isDone ? 0.45 : 1, gap: 10, cursor: editMode ? "pointer" : "default" }}>
        <div style={{ width: 3, height: 32, borderRadius: 2, background: phase.color, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, lineHeight: 1.3, paddingLeft: item.sub ? 12 : 0, color: isDone ? "#42A5F5" : item.sub ? "#999" : "#DDD", textDecoration: isDone ? "line-through" : "none" }}>
            {item.sub ? "-> " : ""}{item.name}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
<span style={{ fontSize: 9, color: phase.color, letterSpacing: 1 }}>{getDesc(item.phase)}</span>
            {item.status ? <span style={{ fontSize: 9, color: STATUS_COLORS[item.status] || "#666", letterSpacing: 1 }}>| {item.status.toUpperCase()}</span> : null}
            {item.dueMileage ? <span style={{ fontSize: 9, color: "#F57F17", letterSpacing: 1 }}>| @ {parseInt(String(item.dueMileage).replace(/,/g,""),10).toLocaleString()}mi</span> : null}
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: "bold", color: item.cost ? "#FFF" : "#2E7D32", minWidth: 44, textAlign: "right", flexShrink: 0 }}>
          {item.cost ? ("£"+item.cost) : ""}
        </div>
        {editMode ? (
          confirmDeleteId === item.id ? (
            <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
              <button onClick={function(e) { e.stopPropagation(); deleteItem(item.id); }}
                style={{ padding: "4px 8px", background: "#7F0000", border: "1px solid #FF5252", color: "#FF5252", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>DELETE</button>
              <button onClick={function(e) { e.stopPropagation(); setConfirmDeleteId(null); }}
                style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
            </div>
          ) : (
            <button onClick={function(e) { e.stopPropagation(); setConfirmDeleteId(item.id); }}
              style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #FF5252", color: "#FF5252", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>DEL</button>
          )
        ) : renderActions(item, isDone, isPurchased, is302Group)}
      </div>
    );
  }

  function renderServiceItem(isOil) {
    var name = isOil ? oilName : filterName;
    var cost = isOil ? oilCost : filterCost;
    var purchased = isOil ? oilPurchased : filterPurchased;
    var inGarage = isOil ? oilInGarage : filterInGarage;
    var itemId = isOil ? "svc_oil" : "svc_filter";
    var isEditing = isOil ? editingOil : editingFilter;
    var nameEdit = isOil ? oilNameEdit : filterNameEdit;
    var costEdit = isOil ? oilCostEdit : filterCostEdit;
    var phase = allPhaseConfig[99];
    return (
      <div key={itemId} style={{ background: "#0D0D0D", borderBottom: "1px solid #141414" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 16px", gap: 10 }}>
          <div style={{ width: 3, height: 32, borderRadius: 2, background: phase.color, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            {isEditing ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <input type="text" value={nameEdit} onChange={function(e) { isOil ? setOilNameEdit(e.target.value) : setFilterNameEdit(e.target.value); }}
                  style={{ padding: "3px 6px", background: "#0A0A0A", border: "1px solid #F57F17", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "#888" }}>£</span>
                  <input type="text" value={costEdit} onChange={function(e) { isOil ? setOilCostEdit(e.target.value) : setFilterCostEdit(e.target.value); }}
                    style={{ width: 60, padding: "3px 6px", background: "#0A0A0A", border: "1px solid #F57F17", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
                  <button onClick={function() {
                    if (isOil) { setOilName(nameEdit); setOilCost(costEdit); setEditingOil(false); try { localStorage.setItem("ft_oilname", nameEdit); localStorage.setItem("ft_oilcost", costEdit); } catch(e) {} }
                    else { setFilterName(nameEdit); setFilterCost(costEdit); setEditingFilter(false); try { localStorage.setItem("ft_filtername", nameEdit); localStorage.setItem("ft_filtercost", costEdit); } catch(e) {} }
                  }} style={{ padding: "3px 8px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>SAVE</button>
                  <button onClick={function() { isOil ? setEditingOil(false) : setEditingFilter(false); }}
                    style={{ padding: "3px 6px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 12, color: "#DDD", display: "flex", alignItems: "center", gap: 6 }}>
                  {name}
                  <button onClick={function() { if (isOil) { setOilNameEdit(oilName); setOilCostEdit(oilCost); setEditingOil(true); } else { setFilterNameEdit(filterName); setFilterCostEdit(filterCost); setEditingFilter(true); } }}
                    style={{ background: "transparent", border: "1px solid #333", color: "#555", fontSize: 8, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", padding: "1px 5px" }}>EDIT</button>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                  <span style={{ fontSize: 9, color: phase.color, letterSpacing: 1 }}>Mileage</span>
                  <span style={{ fontSize: 9, color: "#666", letterSpacing: 1 }}>| @ {nextService.toLocaleString()}mi</span>
                </div>
              </div>
            )}
          </div>
          {!isEditing && (
            <div style={{ fontSize: 13, fontWeight: "bold", color: purchased ? "#2E7D32" : "#FFF", minWidth: 44, textAlign: "right", flexShrink: 0 }}>
              {purchased ? "" : ("£"+cost)}
            </div>
          )}
          {!isEditing && (
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              {!purchased && renderBuyStep(itemId, function() {
                if (isOil) { setOilPurchased(true); try { localStorage.setItem("ft_oilpurchased","true"); } catch(e) {} }
                else { setFilterPurchased(true); try { localStorage.setItem("ft_filterpurchased","true"); } catch(e) {} }
                setConfirmId(null);
              })}
              {purchased && !inGarage && renderGarageStep(itemId, function() {
                if (isOil) { setOilInGarage(true); try { localStorage.setItem("ft_oilingarage","true"); } catch(e) {} }
                else { setFilterInGarage(true); try { localStorage.setItem("ft_filteringarage","true"); } catch(e) {} }
                setConfirmId(null);
              })}
              {inGarage && renderFittedStep(itemId, function(m) { isOil ? markOilFitted(m) : markFilterFitted(m); })}
              {!purchased && <button disabled style={{ padding: "4px 8px", background: "transparent", border: "1px solid #1A1A1A", color: "#2A2A2A", fontSize: 9, borderRadius: 2, cursor: "not-allowed", fontFamily: "inherit" }}>FITTED</button>}
              {purchased && !inGarage && <button disabled style={{ padding: "4px 8px", background: "transparent", border: "1px solid #1A1A1A", color: "#2A2A2A", fontSize: 9, borderRadius: 2, cursor: "not-allowed", fontFamily: "inherit" }}>FITTED</button>}
            </div>
          )}
        </div>
      </div>
    );
  }

  var sectionKeys = activeSection === "all" ? ["reliability","performance","aesthetics"] : [activeSection];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#E0E0E0", fontFamily: "'Courier New', monospace", paddingBottom: 60 }}>

      <div style={{ background: "linear-gradient(135deg, #0D0D0D 0%, #2E1200 100%)", borderBottom: "2px solid #E65100", padding: "20px 16px 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontSize: 11, color: "#E65100", letterSpacing: 3, marginBottom: 4 }}>FIESTA BUILD PLAN</div>
        <div style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>2012 Fiesta MK7 Zetec S</div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 2, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span>1.6 Ti-VCT HXJB |</span>
          {editingMileage ? (
            confirmMileage ? (
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ color: "#F57F17" }}>{parseInt(mileageEditVal.replace(/,/g,""),10).toLocaleString()}mi?</span>
                <button onClick={function() { var n = parseInt(mileageEditVal.replace(/,/g,""),10); if (!isNaN(n)) { setCurrentMileage(n); try { localStorage.setItem("ft_mileage",String(n)); } catch(e) {} } setEditingMileage(false); setConfirmMileage(false); setMileageEditVal(""); }}
                  style={{ padding: "2px 6px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>YES</button>
                <button onClick={function() { setConfirmMileage(false); }} style={{ padding: "2px 6px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
              </span>
            ) : (
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <input type="text" value={mileageEditVal} onChange={function(e) { setMileageEditVal(e.target.value); }}
                  style={{ width: 72, padding: "2px 6px", background: "#0D0D0D", border: "1px solid #E65100", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
                <button onClick={function() { setConfirmMileage(true); }} style={{ padding: "2px 6px", background: "transparent", border: "1px solid #E65100", color: "#E65100", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>OK</button>
                <button onClick={function() { setEditingMileage(false); setMileageEditVal(""); }} style={{ padding: "2px 6px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
              </span>
            )
          ) : (
            <button onClick={function() { setEditingMileage(true); setMileageEditVal(currentMileage.toLocaleString()); }}
              style={{ background: "transparent", border: "none", color: "#E65100", fontSize: 11, cursor: "pointer", fontFamily: "inherit", padding: 0, textDecoration: "underline dotted" }}>
              {currentMileage.toLocaleString()}mi
            </button>
          )}
          <span>|</span>
          {editingService ? (
            confirmService ? (
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ color: "#4CAF50" }}>{parseInt(serviceEditVal.replace(/,/g,""),10).toLocaleString()}mi?</span>
                <button onClick={function() { var n = parseInt(serviceEditVal.replace(/,/g,""),10); if (!isNaN(n)) { setNextService(n); try { localStorage.setItem("ft_nextservice",String(n)); } catch(e) {} } setEditingService(false); setConfirmService(false); setServiceEditVal(""); }}
                  style={{ padding: "2px 6px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>YES</button>
                <button onClick={function() { setConfirmService(false); }} style={{ padding: "2px 6px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
              </span>
            ) : (
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <input type="text" value={serviceEditVal} onChange={function(e) { setServiceEditVal(e.target.value); }}
                  style={{ width: 72, padding: "2px 6px", background: "#0D0D0D", border: "1px solid #4CAF50", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
                <button onClick={function() { setConfirmService(true); }} style={{ padding: "2px 6px", background: "transparent", border: "1px solid #4CAF50", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>OK</button>
                <button onClick={function() { setEditingService(false); setServiceEditVal(""); }} style={{ padding: "2px 6px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
              </span>
            )
          ) : (
            <button onClick={function() { setEditingService(true); setServiceEditVal(nextService.toLocaleString()); }}
              style={{ background: "transparent", border: "none", color: "#4CAF50", fontSize: 11, cursor: "pointer", fontFamily: "inherit", padding: 0, textDecoration: "underline dotted" }}>
              Svc: {nextService.toLocaleString()}mi
            </button>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, color: "#555", letterSpacing: 2 }}>SERVICE COUNTDOWN</span>
            <span style={{ fontSize: 13, fontWeight: "bold", color: svcColor }}>{milesLeft > 0 ? milesLeft.toLocaleString()+" miles" : "SERVICE DUE"}</span>
            <div style={{ width: 100, height: 4, background: "#1A1A1A", borderRadius: 2 }}>
              <div style={{ height: "100%", width: Math.max(0, Math.min(100, (milesLeft/5000)*100))+"%", background: svcColor, borderRadius: 2, transition: "width 0.5s ease" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "#1A1A1A", borderBottom: "1px solid #2A2A2A" }}>
        {[{label:"PRE-MAP",val:premap,color:"#E65100"},{label:"POST-MAP",val:postmap,color:"#546E7A"},{label:"REMAINING",val:grand,color:"#FFD700"}].map(function(s) {
          return (
            <div key={s.label} style={{ background: "#111", padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: s.color }}>{"£"+s.val.toLocaleString()}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 6, padding: "12px 16px", overflowX: "auto", borderBottom: "1px solid #1A1A1A", scrollbarWidth: "none" }}>
        <button onClick={function() { setActivePhase(null); }} style={{ padding: "5px 12px", borderRadius: 2, border: "1px solid "+(activePhase===null?"#E65100":"#333"), background: activePhase===null?"#1A0800":"transparent", color: activePhase===null?"#E65100":"#666", fontSize: 10, letterSpacing: 1, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", flexShrink: 0 }}>ALL</button>
        {allPhaseOrder.map(function(phNum) {
          var cfg = allPhaseConfig[phNum];
          var isActive = activePhase === phNum;
          return (
            <button key={String(phNum)} onClick={function() { setActivePhase(isActive ? null : phNum); }} style={{ padding: "5px 10px", borderRadius: 2, border: "1px solid "+(isActive?cfg.color:"#333"), background: isActive?cfg.bg:"transparent", color: isActive?cfg.color:"#555", fontSize: 10, letterSpacing: 1, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", flexShrink: 0 }}>{getDesc(phNum)}</button>
          );
        })}
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #1A1A1A", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {[["all","ALL"],["asap","ASAP"],["reliability","RELIABILITY"],["performance","PERFORMANCE"],["aesthetics","AESTHETICS"],["pending","IN GARAGE"],["history","HISTORY"],["manage","MANAGE"]].map(function(pair) {
          var key = pair[0]; var label = pair[1];
          return (
            <button key={key} onClick={function() { setActiveSection(key); }} style={{ flexShrink: 0, padding: "10px 14px", background: activeSection===key?"#151515":"transparent", border: "none", borderBottom: "2px solid "+(activeSection===key?"#E65100":"transparent"), color: activeSection===key?"#FFF":"#555", fontSize: 9, letterSpacing: 1, cursor: "pointer", fontFamily: "inherit" }}>{label}</button>
          );
        })}
      </div>

      <div style={{ padding: "8px 0" }}>
        {activeSection === "manage" ? (
          <div style={{ padding: 16 }}>
            <div style={{ background: "#111", border: "1px solid #2A2A2A", borderRadius: 4, padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#E65100", letterSpacing: 3 }}>ADD NEW ITEM</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={function() { setShowManageExport(true); }}
                    style={{ padding: "5px 12px", background: "transparent", border: "1px solid #546E7A", color: "#546E7A", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>EXPORT</button>
                  <button onClick={function() { setEditMode(!editMode); setConfirmDeleteId(null); setEditItemId(null); }}
                  style={{ padding: "5px 14px", background: editMode?"#7F0000":"transparent", border: "1px solid "+(editMode?"#FF5252":"#555"), color: editMode?"#FF5252":"#555", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>
                  {editMode ? "EDIT MODE ON" : "EDIT MODE OFF"}
                </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>NAME</div>
                  <input type="text" value={newItem.name} onChange={function(e) { setNewItem(Object.assign({}, newItem, { name: e.target.value })); }}
                    placeholder="Item name" style={{ width: "100%", padding: "7px 10px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>CATEGORY</div>
                    <select value={newItem.category} onChange={function(e) { setNewItem(Object.assign({}, newItem, { category: e.target.value })); }}
                      style={{ width: "100%", padding: "7px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }}>
                      <option value="reliability">Reliability</option>
                      <option value="performance">Performance</option>
                      <option value="aesthetics">Aesthetics</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>PHASE</div>
                    <select value={newItem.phase} onChange={function(e) { setNewItem(Object.assign({}, newItem, { phase: e.target.value })); }}
                      style={{ width: "100%", padding: "7px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }}>
                      <option value="1">Phase 1</option>
                      <option value="2">Phase 2</option>
                      <option value="3">Phase 3</option>
                      <option value="4">Phase 4</option>
                      <option value="6">Phase 5 (Map)</option>
                      <option value="7">Phase 6</option>
                      <option value="99">Mileage</option>
                      {customPhases.map(function(cp) { return <option key={String(cp.id)} value={String(cp.id)}>{cp.label}</option>; })}
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>COST (£)</div>
                    <input type="number" value={newItem.cost} onChange={function(e) { setNewItem(Object.assign({}, newItem, { cost: e.target.value })); }}
                      placeholder="Leave blank if owned" style={{ width: "100%", padding: "7px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>STATUS</div>
                    <select value={newItem.status} onChange={function(e) { setNewItem(Object.assign({}, newItem, { status: e.target.value })); }}
                      style={{ width: "100%", padding: "7px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }}>
                      <option value="To Order">To Order</option>
                      <option value="In Garage">In Garage</option>
                      <option value="Research">Research</option>
                      <option value="Garage">Garage</option>
                      <option value="Booked">Booked</option>
                      <option value="Sourced">Sourced</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={function() { setNewItem(Object.assign({}, newItem, { asap: !newItem.asap })); }}
                    style={{ padding: "6px 14px", background: newItem.asap?"#7F0000":"transparent", border: "1px solid "+(newItem.asap?"#FF5252":"#333"), color: newItem.asap?"#FF5252":"#555", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>
                    {newItem.asap ? "ASAP ON" : "ASAP OFF"}
                  </button>
                </div>
                {newItem.name.trim() !== "" && (
                  confirmAdd ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#888" }}>Add "{newItem.name}"?</span>
                      <button onClick={addItem} style={{ padding: "6px 14px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>YES</button>
                      <button onClick={function() { setConfirmAdd(false); }} style={{ padding: "6px 10px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                    </div>
                  ) : (
                    <button onClick={function() { setConfirmAdd(true); }}
                      style={{ padding: "8px 0", background: "#1A0800", border: "1px solid #E65100", color: "#E65100", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 2, width: "100%" }}>
                      ADD ITEM
                    </button>
                  )
                )}
              </div>
            </div>

            {showManageExport && (
              <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 16px", overflowY: "auto" }}>
                <div style={{ background: "#111", border: "1px solid #E65100", borderRadius: 4, padding: 16, width: "100%", maxWidth: 600 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, color: "#E65100", letterSpacing: 3 }}>PURCHASE LIST EXPORT</span>
                    <button onClick={function() { setShowManageExport(false); }}
                      style={{ padding: "4px 10px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>CLOSE</button>
                  </div>
                  <textarea readOnly
                    value={(function() {
                      var lines = [];
                      var allPhasesInOrder = [1, 2, 3, 4, 6, 7].concat(customPhases.map(function(cp) { return cp.id; })).concat([99]);
                      var secKeys = ["reliability","performance","aesthetics"];
                      allPhasesInOrder.forEach(function(phNum) {
                        var cfg = allPhaseConfig[phNum];
                        if (!cfg) return;
                        var phaseLines = [];
                        secKeys.forEach(function(sec) {
                          var arr = sec==="reliability" ? reliability : sec==="performance" ? performance : aesthetics;
                          var items = arr.filter(function(i) { return i.phase === phNum && !i.done && !i.sub; });
                          items.forEach(function(item) {
                            var line = item.name;
                            if (item.cost) line += " - £" + item.cost;
                            var statusLabel = item.inGarage ? "In Garage" : item.purchased ? "Purchased" : (item.status || "");
                            if (statusLabel) line += " [" + statusLabel + "]";
                            phaseLines.push(line);
                          });
                        });
                        if (phaseLines.length > 0) {
                          lines.push("--- " + getDesc(phNum).toUpperCase() + " ---");
                          phaseLines.forEach(function(l) { lines.push(l); });
                          lines.push("");
                        }
                      });
                      return lines.join("\n");
                    })()}
                    style={{ width: "100%", height: 400, padding: "10px", background: "#0A0A0A", border: "1px solid #333", color: "#CCC", fontSize: 11, borderRadius: 2, fontFamily: "inherit", resize: "none", boxSizing: "border-box", lineHeight: 1.8 }}
                  />
                  <div style={{ fontSize: 9, color: "#444", marginTop: 8, letterSpacing: 1 }}>TAP AND HOLD TO SELECT ALL, THEN COPY</div>
                </div>
              </div>
            )}

            <div style={{ background: "#111", border: "1px solid #2A2A2A", borderRadius: 4, padding: 16 }}>
              <div style={{ fontSize: 10, color: "#E65100", letterSpacing: 3, marginBottom: 14 }}>PHASE DESCRIPTIONS</div>
              {allPhaseOrder.map(function(phNum) {
                var cfg = allPhaseConfig[phNum];
                var isEditingThis = editingPhaseDesc === phNum;
                return (
                  <div key={String(phNum)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #1A1A1A" }}>
                    <div style={{ width: 3, height: 24, background: cfg.color, borderRadius: 1, flexShrink: 0 }} />
                    <span style={{ fontSize: 10, color: cfg.color, flexShrink: 0, minWidth: 60 }}>{cfg.label}</span>
                    {isEditingThis ? (
                      <div style={{ display: "flex", gap: 4, flex: 1 }}>
                        <input type="text" value={phaseDescEdit} onChange={function(e) { setPhaseDescEdit(e.target.value); }}
                          style={{ flex: 1, padding: "4px 8px", background: "#0A0A0A", border: "1px solid #E65100", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
                        <button onClick={function() {
                          var newDescs = Object.assign({}, phaseDescs);
                          newDescs[phNum] = phaseDescEdit;
                          setPhaseDescs(newDescs);
                          try { localStorage.setItem("ft_phasedescs", JSON.stringify(newDescs)); } catch(e) {}
                          setEditingPhaseDesc(null); setPhaseDescEdit("");
                        }} style={{ padding: "4px 10px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>SAVE</button>
                        <button onClick={function() { setEditingPhaseDesc(null); setPhaseDescEdit(""); }}
                          style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                      </div>
                    ) : (
                      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 11, color: "#AAA" }}>{getDesc(phNum)}</span>
                        <button onClick={function() { setEditingPhaseDesc(phNum); setPhaseDescEdit(getDesc(phNum)); }}
                          style={{ padding: "3px 10px", background: "transparent", border: "1px solid #333", color: "#555", fontSize: 8, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>EDIT</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#111", border: "1px solid #2A2A2A", borderRadius: 4, padding: 16, marginTop: 16 }}>
              <div style={{ fontSize: 10, color: "#E65100", letterSpacing: 3, marginBottom: 14 }}>CUSTOM PHASES</div>

              {customPhases.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  {customPhases.map(function(cp) {
                    return (
                      <div key={cp.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #1A1A1A" }}>
                        <div style={{ width: 3, height: 20, background: cp.color, borderRadius: 1, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: cp.color, flexShrink: 0, minWidth: 60 }}>{cp.label}</span>
                        <span style={{ fontSize: 11, color: "#AAA", flex: 1 }}>{cp.desc}</span>
                        {confirmDeletePhase === cp.id ? (
                          <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                            <button onClick={function() {
                              var updated = customPhases.filter(function(p) { return p.id !== cp.id; });
                              setCustomPhases(updated);
                              try { localStorage.setItem("ft_customphases", JSON.stringify(updated)); } catch(e) {}
                              setConfirmDeletePhase(null);
                            }} style={{ padding: "3px 8px", background: "#7F0000", border: "1px solid #FF5252", color: "#FF5252", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>DEL</button>
                            <button onClick={function() { setConfirmDeletePhase(null); }}
                              style={{ padding: "3px 6px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                          </div>
                        ) : (
                          <button onClick={function() { setConfirmDeletePhase(cp.id); }}
                            style={{ padding: "3px 8px", background: "#1A0000", border: "1px solid #FF5252", color: "#FF5252", fontSize: 8, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>DEL</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>LABEL (e.g. "Phase 8")</div>
                  <input type="text" value={newPhaseLabel} onChange={function(e) { setNewPhaseLabel(e.target.value); }}
                    placeholder="Phase label" style={{ width: "100%", padding: "7px 10px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>DESCRIPTION</div>
                  <input type="text" value={newPhaseDesc} onChange={function(e) { setNewPhaseDesc(e.target.value); }}
                    placeholder="Phase description" style={{ width: "100%", padding: "7px 10px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>COLOUR</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["#E65100","#F57F17","#558B2F","#1565C0","#AD1457","#546E7A","#9C27B0","#00838F","#2E7D32","#6D4C41"].map(function(col) {
                        return (
                          <div key={col} onClick={function() { setNewPhaseColor(col); }}
                            style={{ width: 20, height: 20, borderRadius: 2, background: col, cursor: "pointer", border: newPhaseColor===col?"2px solid #FFF":"2px solid transparent" }} />
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>INSERT AFTER</div>
                    <select value={newPhasePosition} onChange={function(e) { setNewPhasePosition(e.target.value); }}
                      style={{ width: "100%", padding: "7px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }}>
                      {allPhaseOrder.filter(function(p) { return p !== 99; }).map(function(phNum) {
                        var cfg = allPhaseConfig[phNum];
                        return <option key={String(phNum)} value={String(phNum)}>{cfg ? cfg.label : phNum}</option>;
                      })}
                      <option value="end">Before Mileage (end)</option>
                    </select>
                  </div>
                </div>
                {confirmAddPhase ? (
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#888" }}>Add "{newPhaseLabel}"?</span>
                    <button onClick={function() {
                      var newId = 1000 + Date.now() % 10000;
                      var bg = newPhaseColor + "22";
                      var newP = { id: newId, label: newPhaseLabel, desc: newPhaseDesc, color: newPhaseColor, bg: bg, position: newPhasePosition };
                      var updated = customPhases.concat([newP]);
                      setCustomPhases(updated);
                      try { localStorage.setItem("ft_customphases", JSON.stringify(updated)); } catch(e) {}
                      setNewPhaseLabel(""); setNewPhaseDesc(""); setNewPhaseColor("#9C27B0"); setNewPhasePosition("end");
                      setConfirmAddPhase(false);
                    }} style={{ padding: "6px 14px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>YES</button>
                    <button onClick={function() { setConfirmAddPhase(false); }}
                      style={{ padding: "6px 10px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                  </div>
                ) : (
                  <button onClick={function() { if (newPhaseLabel.trim() && newPhaseDesc.trim()) setConfirmAddPhase(true); }}
                    disabled={!newPhaseLabel.trim() || !newPhaseDesc.trim()}
                    style={{ padding: "8px 0", background: newPhaseLabel.trim() && newPhaseDesc.trim() ? "#1A0800" : "transparent", border: "1px solid "+(newPhaseLabel.trim() && newPhaseDesc.trim() ? "#E65100" : "#333"), color: newPhaseLabel.trim() && newPhaseDesc.trim() ? "#E65100" : "#444", fontSize: 10, borderRadius: 2, cursor: newPhaseLabel.trim() && newPhaseDesc.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", letterSpacing: 2, width: "100%" }}>
                    ADD PHASE
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : activeSection === "asap" ? (
          <div>
            {(function() {
              var asapItems = activeItems.filter(function(i) { return i.asap; });
              if (asapItems.length === 0) {
                return <div style={{ padding: "32px 16px", textAlign: "center", color: "#444", fontSize: 12, letterSpacing: 1 }}>ALL ASAP ITEMS RESOLVED</div>;
              }
              return (
                <div>
                  <div style={{ padding: "10px 16px", background: "#1A0000", borderBottom: "1px solid #FF5252", fontSize: 10, color: "#FF5252", letterSpacing: 2 }}>URGENT — NEEDS ATTENTION</div>
                  {asapItems.map(function(item, idx) { return renderItem(item, idx); })}
                </div>
              );
            })()}
          </div>
        ) : activeSection === "pending" ? (
          <div>
            {(function() {
              var pendingItems = activeItems.filter(function(i) { return i.inGarage && !i.sub; });
              var svcPending = oilInGarage || filterInGarage;
              if (pendingItems.length === 0 && !svcPending) {
                return <div style={{ padding: "32px 16px", textAlign: "center", color: "#444", fontSize: 12, letterSpacing: 1 }}>NO ITEMS IN GARAGE</div>;
              }
              return (
                <div>
                  {pendingItems.map(function(item, idx) { return renderItem(item, idx); })}
                  {oilInGarage && renderServiceItem(true)}
                  {filterInGarage && renderServiceItem(false)}
                </div>
              );
            })()}
          </div>
        ) : activeSection === "history" ? (
          <div>
            <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1A1A1A" }}>
              <span style={{ fontSize: 9, color: "#546E7A", letterSpacing: 2 }}>{history.length} ENTRIES</span>
              <button onClick={function() { setShowHistoryExport(true); }}
                style={{ padding: "5px 14px", background: "transparent", border: "1px solid #546E7A", color: "#546E7A", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>
                EXPORT
              </button>
            </div>

            {showHistoryExport && (
              <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 16px", overflowY: "auto" }}>
                <div style={{ background: "#111", border: "1px solid #546E7A", borderRadius: 4, padding: 16, width: "100%", maxWidth: 600 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, color: "#546E7A", letterSpacing: 3 }}>HISTORY EXPORT</span>
                    <button onClick={function() { setShowHistoryExport(false); }}
                      style={{ padding: "4px 10px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>CLOSE</button>
                  </div>
                  <textarea readOnly
                    value={history.slice().sort(function(a, b) {
                      var am = parseInt(String(a.mileage).replace(/,/g,""), 10) || 0;
                      var bm = parseInt(String(b.mileage).replace(/,/g,""), 10) || 0;
                      return bm - am;
                    }).map(function(e) {
                      return e.date + " | " + e.mileage + "mi | " + e.desc;
                    }).join("\n")}
                    style={{ width: "100%", height: 400, padding: "10px", background: "#0A0A0A", border: "1px solid #333", color: "#CCC", fontSize: 11, borderRadius: 2, fontFamily: "inherit", resize: "none", boxSizing: "border-box", lineHeight: 1.8 }}
                  />
                  <div style={{ fontSize: 9, color: "#444", marginTop: 8, letterSpacing: 1 }}>TAP AND HOLD TO SELECT ALL TEXT, THEN COPY</div>
                </div>
              </div>
            )}

            {history.slice().sort(function(a, b) {
              var am = parseInt(String(a.mileage).replace(/,/g,""), 10) || 0;
              var bm = parseInt(String(b.mileage).replace(/,/g,""), 10) || 0;
              return bm - am;
            }).map(function(entry, idx) {
              var isEditingThis = editMode && editHistoryId === entry.id;
              if (isEditingThis) {
                return (
                  <div key={entry.id} style={{ background: "#0F0F0F", borderBottom: "1px solid #546E7A", padding: "12px 16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input type="text" value={editHistoryData.desc || ""} onChange={function(e) { setEditHistoryData(Object.assign({}, editHistoryData, { desc: e.target.value })); }}
                        style={{ padding: "6px 8px", background: "#0A0A0A", border: "1px solid #546E7A", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit" }} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <input type="text" value={editHistoryData.date || ""} onChange={function(e) { setEditHistoryData(Object.assign({}, editHistoryData, { date: e.target.value })); }}
                          placeholder="MM/YY" style={{ padding: "5px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
                        <input type="text" value={editHistoryData.mileage || ""} onChange={function(e) { setEditHistoryData(Object.assign({}, editHistoryData, { mileage: e.target.value })); }}
                          placeholder="Mileage" style={{ padding: "5px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 11, borderRadius: 2, fontFamily: "inherit" }} />
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={function() {
                          var newHist = history.map(function(h) { return h.id === entry.id ? Object.assign({}, h, editHistoryData) : h; });
                          setHistory(newHist);
                          try { localStorage.setItem("ft_history", JSON.stringify(newHist)); } catch(e) {}
                          setEditHistoryId(null); setEditHistoryData({});
                        }} style={{ padding: "5px 14px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>SAVE</button>
                        <button onClick={function() { setEditHistoryId(null); setEditHistoryData({}); }}
                          style={{ padding: "5px 10px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={entry.id}
                  onClick={editMode ? function() { setEditHistoryId(entry.id); setEditHistoryData({ desc: entry.desc, date: entry.date, mileage: entry.mileage }); } : undefined}
                  style={{ display: "flex", alignItems: "center", padding: "10px 16px", background: editMode ? "#0A0A12" : idx%2===0?"#0D0D0D":"#0A0A0A", borderBottom: "1px solid "+(editMode?"#1A1A2A":"#141414"), gap: 10, cursor: editMode?"pointer":"default" }}>
                  <div style={{ width: 3, height: 32, borderRadius: 2, background: "#546E7A", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "#DDD", lineHeight: 1.3 }}>{entry.desc}</div>
                    <div style={{ fontSize: 9, color: "#546E7A", marginTop: 3, letterSpacing: 1 }}>{entry.date} | {entry.mileage}mi</div>
                  </div>
                  {editMode ? (
                    confirmDeleteId === entry.id ? (
                      <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                        <button onClick={function(e) { e.stopPropagation(); deleteHistoryItem(entry.id); }}
                          style={{ padding: "4px 8px", background: "#7F0000", border: "1px solid #FF5252", color: "#FF5252", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>DELETE</button>
                        <button onClick={function(e) { e.stopPropagation(); setConfirmDeleteId(null); }}
                          style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                      </div>
                    ) : (
                      <button onClick={function(e) { e.stopPropagation(); setConfirmDeleteId(entry.id); }}
                        style={{ padding: "4px 8px", background: "#1A0000", border: "1px solid #FF5252", color: "#FF5252", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>DEL</button>
                    )
                  ) : (
                    <div style={{ fontSize: 11, color: "#444", flexShrink: 0 }}>{entry.mileage}</div>
                  )}
                </div>
              );
            })}
            <div style={{ margin: "16px 16px 0", background: "#111", border: "1px solid #2A2A2A", borderRadius: 4, padding: 16 }}>
              <div style={{ fontSize: 10, color: "#546E7A", letterSpacing: 3, marginBottom: 12 }}>ADD HISTORY ENTRY</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>DESCRIPTION</div>
                  <input type="text" value={newHistDesc} onChange={function(e) { setNewHistDesc(e.target.value); }}
                    placeholder="e.g. New Bosch Throttle Body" style={{ width: "100%", padding: "7px 10px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>DATE (MM/YY)</div>
                    <input type="text" value={newHistDate} onChange={function(e) { setNewHistDate(e.target.value); }}
                      placeholder="e.g. 03/26" style={{ width: "100%", padding: "7px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: 1, marginBottom: 4 }}>MILEAGE</div>
                    <input type="text" value={newHistMileage} onChange={function(e) { setNewHistMileage(e.target.value); }}
                      placeholder="e.g. 149,900" style={{ width: "100%", padding: "7px 8px", background: "#0A0A0A", border: "1px solid #333", color: "#FFF", fontSize: 12, borderRadius: 2, fontFamily: "inherit", boxSizing: "border-box" }} />
                  </div>
                </div>
                {newHistDesc.trim() && newHistDate.trim() && newHistMileage.trim() && (
                  confirmAddHist ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#888" }}>Add entry?</span>
                      <button onClick={function() {
                        var mileageNum = parseInt(String(newHistMileage).replace(/,/g,""), 10);
                        var newEntry = { id: "h_"+Date.now(), desc: newHistDesc.trim(), date: newHistDate.trim(), mileage: isNaN(mileageNum) ? newHistMileage.trim() : mileageNum.toLocaleString() };
                        var newHist = history.concat([newEntry]);
                        setHistory(newHist);
                        try { localStorage.setItem("ft_history", JSON.stringify(newHist)); } catch(e) {}
                        setNewHistDesc(""); setNewHistDate(""); setNewHistMileage(""); setConfirmAddHist(false);
                      }} style={{ padding: "6px 14px", background: "#1B5E20", border: "1px solid #2E7D32", color: "#4CAF50", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>YES</button>
                      <button onClick={function() { setConfirmAddHist(false); }}
                        style={{ padding: "6px 10px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>X</button>
                    </div>
                  ) : (
                    <button onClick={function() { setConfirmAddHist(true); }}
                      style={{ padding: "8px 0", background: "#0A0F14", border: "1px solid #546E7A", color: "#546E7A", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 2, width: "100%" }}>
                      ADD ENTRY
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ) : activeSection === "all" ? (
          <div>
            {(function() {
              var prePhasesNums = [1, 2, 3, 4];
              var postPhaseNums = [6, 7].concat(customPhases.map(function(cp) { return cp.id; }));
              var mileagePhase = [99];
              var phasesToShow = activePhase !== null ? [activePhase] : allPhaseOrder;

              function renderPhaseGroup(phNums, groupLabel, groupColor) {
                var filtered = phNums.filter(function(p) { return phasesToShow.indexOf(p) !== -1; });
                if (filtered.length === 0) return null;
                var secKeys = ["reliability","performance","aesthetics"];
                var groupHasItems = filtered.some(function(phNum) {
                  return secKeys.some(function(sec) {
                    var arr = sec==="reliability" ? reliability : sec==="performance" ? performance : aesthetics;
                    return arr.some(function(i) { return i.phase === phNum && !i.done; });
                  }) || phNum === 99;
                });
                if (!groupHasItems) return null;
                return (
                  <div key={groupLabel}>
                    {activePhase === null && (
                      <div style={{ padding: "10px 16px 6px", fontSize: 10, letterSpacing: 3, color: groupColor, background: "#060606", borderTop: "3px solid "+groupColor, marginTop: 12, fontWeight: "bold" }}>
                        {groupLabel}
                      </div>
                    )}
                    {filtered.map(function(phNum) {
                      var cfg = allPhaseConfig[phNum];
                      if (!cfg) return null;
                      var phaseHasItems = secKeys.some(function(sec) {
                        var arr = sec==="reliability" ? reliability : sec==="performance" ? performance : aesthetics;
                        return arr.some(function(i) { return i.phase === phNum && !i.done; });
                      }) || phNum === 99;
                      if (!phaseHasItems) return null;
                      return (
                        <div key={String(phNum)}>
                          <div style={{ padding: "6px 16px 4px 16px", fontSize: 9, letterSpacing: 2, color: cfg.color, background: "#090909", borderLeft: "3px solid "+cfg.color, marginLeft: 0, marginTop: 4 }}>
                            {getDesc(phNum).toUpperCase()}
                          </div>
                          {secKeys.map(function(sec) {
                            var arr = sec==="reliability" ? reliability : sec==="performance" ? performance : aesthetics;
                            var items = arr.filter(function(i) { return i.phase === phNum && !i.done; });
                            var meta = SECTION_META[sec];
                            if (items.length === 0 && !(sec==="reliability" && phNum===99)) return null;
                            return (
                              <div key={sec}>
                                <div style={{ padding: "2px 16px 2px 24px", fontSize: 8, letterSpacing: 2, color: meta.color, borderLeft: "2px solid "+meta.color, marginLeft: 12, background: "#0A0A0A" }}>
                                  {meta.label}
                                </div>
                                {items.map(function(item, idx) { return renderItem(item, idx); })}
                                {sec==="reliability" && phNum===99 && (
                                  <div>{renderServiceItem(true)}{renderServiceItem(false)}</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              }

              return [
                renderPhaseGroup(prePhasesNums, "PRE-MAP", "#E65100"),
                renderPhaseGroup(postPhaseNums, "POST-MAP", "#546E7A"),
                renderPhaseGroup(mileagePhase, "MILEAGE", "#F57F17"),
              ];
            })()}
            <div style={{ padding: "16px 16px 0" }}>
              <button onClick={function() { setShowAllExport(true); }}
                style={{ padding: "8px 0", background: "transparent", border: "1px solid #E65100", color: "#E65100", fontSize: 10, borderRadius: 2, cursor: "pointer", fontFamily: "inherit", letterSpacing: 2, width: "100%" }}>
                EXPORT ALL ITEMS
              </button>
            </div>

            {showAllExport && (
              <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 16px", overflowY: "auto" }}>
                <div style={{ background: "#111", border: "1px solid #E65100", borderRadius: 4, padding: 16, width: "100%", maxWidth: 600 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, color: "#E65100", letterSpacing: 3 }}>ALL ITEMS EXPORT</span>
                    <button onClick={function() { setShowAllExport(false); }}
                      style={{ padding: "4px 10px", background: "#1A0000", border: "1px solid #333", color: "#666", fontSize: 9, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>CLOSE</button>
                  </div>
                  <textarea readOnly
                    value={(function() {
                      var prePhasesNums = [1, 2, 3, 4];
                      var postPhaseNums = [6, 7].concat(customPhases.map(function(cp) { return cp.id; }));
                      var lines = [];

                      function exportGroup(phNums, groupLabel) {
                        var secKeys = ["reliability","performance","aesthetics"];
                        var groupLines = [];
                        phNums.forEach(function(phNum) {
                          var cfg = allPhaseConfig[phNum];
                          if (!cfg) return;
                          var phaseLines = [];
                          secKeys.forEach(function(sec) {
                            var arr = sec==="reliability" ? reliability : sec==="performance" ? performance : aesthetics;
                            var items = arr.filter(function(i) { return i.phase === phNum && !i.done && !i.sub; });
                            items.forEach(function(item) {
                              var line = "  " + item.name;
                              if (item.cost) line += " - £" + item.cost;
                              if (item.status) line += " [" + item.status + "]";
                              phaseLines.push(line);
                            });
                          });
                          if (phaseLines.length > 0) {
                            groupLines.push("--- " + getDesc(phNum).toUpperCase() + " ---");
                            phaseLines.forEach(function(l) { groupLines.push(l); });
                          }
                        });
                        if (groupLines.length > 0) {
                          lines.push("=== " + groupLabel + " ===");
                          groupLines.forEach(function(l) { lines.push(l); });
                          lines.push("");
                        }
                      }

                      exportGroup(prePhasesNums, "PRE-MAP");
                      exportGroup(postPhaseNums, "POST-MAP");

                      // Mileage
                      var milItems = reliability.filter(function(i) { return i.phase === 99 && !i.done && !i.sub; });
                      if (milItems.length > 0 || true) {
                        lines.push("=== MILEAGE ===");
                        lines.push("  " + oilName + " - £" + oilCost + " [Oil Change]");
                        lines.push("  " + filterName + " - £" + filterCost + " [Filter]");
                        milItems.forEach(function(item) {
                          var line = "  " + item.name;
                          if (item.cost) line += " - £" + item.cost;
                          if (item.dueMileage) line += " [Due @ " + item.dueMileage + "mi]";
                          lines.push(line);
                        });
                      }

                      return lines.join("\n");
                    })()}
                    style={{ width: "100%", height: 420, padding: "10px", background: "#0A0A0A", border: "1px solid #333", color: "#CCC", fontSize: 11, borderRadius: 2, fontFamily: "inherit", resize: "none", boxSizing: "border-box", lineHeight: 1.8 }}
                  />
                  <div style={{ fontSize: 9, color: "#444", marginTop: 8, letterSpacing: 1 }}>TAP AND HOLD TO SELECT ALL TEXT, THEN COPY</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {sectionKeys.map(function(section) {
              var items = getItems(section);
              var hasServiceItems = section==="reliability" && (activePhase===null || activePhase===99);
              if (items.length === 0 && !hasServiceItems) return null;
              return (
                <div key={section}>
                  {items.filter(function(i) { return !i.done; }).map(function(item, idx) { return renderItem(item, idx); })}
                  {section==="reliability" && (activePhase===null || activePhase===99) && (
                    <div>{renderServiceItem(true)}{renderServiceItem(false)}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ margin: 16, border: "1px solid #1A1A1A" }}>
        <div style={{ background: "#111", padding: "10px 14px", fontSize: 10, letterSpacing: 3, color: "#E65100", borderBottom: "1px solid #1A1A1A" }}>PHASE SPEND REMAINING</div>
        {allPhaseOrder.map(function(phNum) {
          var cfg = allPhaseConfig[phNum];
          var amt = phaseTotals[phNum] || 0;
          if (amt === 0) return null;
          return (
            <div key={String(phNum)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: "1px solid #141414" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 3, height: 16, background: cfg.color, borderRadius: 1 }} />
<span style={{ fontSize: 10, color: cfg.color }}>{getDesc(phNum)}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: "bold", color: cfg.color }}>{"£"+amt.toLocaleString()}</span>
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", background: "#0D0D0D", borderTop: "1px solid #E65100" }}>
          <span style={{ fontSize: 11, color: "#E65100", letterSpacing: 2 }}>GRAND TOTAL REMAINING</span>
          <span style={{ fontSize: 16, fontWeight: "bold", color: "#FFD700" }}>{"£"+grand.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 9, color: "#333", letterSpacing: 2, paddingBottom: 8 }}>
        HXJB | {currentMileage.toLocaleString()}MI | ZETEC S
      </div>
    </div>
  );
}
