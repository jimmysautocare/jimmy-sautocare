const fs = require('fs');

const html_original = `            <div class="service-card fade-up">
                <span class="service-num">01</span>
                <div class="service-icon-wrap">🛞</div>
                <h3>Brakes</h3>
                <p>Full inspections, pad replacements, rotor resurfacing and hydraulic repairs for total stopping
                    confidence.</p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">02</span>
                <div class="service-icon-wrap">🌿</div>
                <h3>Emissions</h3>
                <p>State-certified Illinois emissions testing and targeted repairs to keep you road-legal and compliant.
                </p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">03</span>
                <div class="service-icon-wrap">⚡</div>
                <h3>Electrical</h3>
                <p>Diagnosis and repair of wiring, batteries, alternators, starters and all onboard electronic systems.
                </p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">04</span>
                <div class="service-icon-wrap">🛢️</div>
                <h3>Oil Change</h3>
                <p>Conventional and full-synthetic oil changes with filter swap and multi-point fluid level inspection.
                </p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">05</span>
                <div class="service-icon-wrap">🔧</div>
                <h3>Suspension</h3>
                <p>Shocks, struts, control arms and precision wheel alignment for a smooth, safe and responsive ride.
                </p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">06</span>
                <div class="service-icon-wrap">🏁</div>
                <h3>Tires</h3>
                <p>Mounting, balancing, rotation and pressure checks — with access to top-brand tire inventory.</p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">07</span>
                <div class="service-icon-wrap">⚙️</div>
                <h3>Tune-Ups</h3>
                <p>Spark plugs, air filters, fuel system cleaning and full engine tune-ups for peak performance.</p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">08</span>
                <div class="service-icon-wrap">❄️</div>
                <h3>AC & Climate</h3>
                <p>Refrigerant recharge, compressor repair and full HVAC system diagnostics for year-round comfort.</p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">09</span>
                <div class="service-icon-wrap">🌡️</div>
                <h3>Cooling System</h3>
                <p>Radiator flush, thermostat replacement, hose inspection and coolant leak repair to prevent
                    overheating.</p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">10</span>
                <div class="service-icon-wrap">🔍</div>
                <h3>Engine Diagnostics</h3>
                <p>Advanced OBD-II computer scanning and mechanical inspection to pinpoint any check-engine issue fast.
                </p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">11</span>
                <div class="service-icon-wrap">🔩</div>
                <h3>Transmission</h3>
                <p>Fluid services, filter changes, solenoid repairs and full transmission diagnostics for smooth
                    shifting.</p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">12</span>
                <div class="service-icon-wrap">💧</div>
                <h3>Fluid Services</h3>
                <p>Complete flush and fill for brake, power steering, differential and transfer case fluids on schedule.
                </p>
            </div>

            <div class="service-card fade-up">
                <span class="service-num">13</span>
                <div class="service-icon-wrap">🔋</div>
                <h3>Battery & Charging</h3>
                <p>Battery load testing, replacement, terminal cleaning and full charging system health assessment.</p>
            </div>

            <div class="service-card accent-card fade-up">
                <span class="service-num">+</span>
                <div class="service-icon-wrap">✨</div>
                <h3>And Much More</h3>
                <p>Exhaust, belts, timing chains, fuel injection — call us and we'll handle whatever your vehicle needs.
                </p>
            </div>`;

const details = {
    "Brakes": ["Comprehensive Brake Inspection", "Brake Pad & Shoe Replacement", "Rotor Resurfacing or Replacement", "Brake Fluid Flush & Bleed"],
    "Emissions": ["State-Certified Emissions Testing", "O2 Sensor Replacement", "Catalytic Converter Repair", "Evaporative System Diagnostics"],
    "Electrical": ["Wiring Diagram Diagnostics", "Battery & Alternator Testing", "Starter Motor Replacement", "Fuse & Relay Troubleshooting"],
    "Oil Change": ["Synthetic & Conventional Oil", "High-Quality Filter Replacement", "Fluid Level Top-Offs", "Comprehensive Multi-Point Inspection"],
    "Suspension": ["Shock & Strut Replacement", "Control Arm & Bushing Repair", "Precision Wheel Alignment", "Steering Rack Diagnostics"],
    "Tires": ["Professional Tire Mounting", "Computerized Wheel Balancing", "Tire Rotation Services", "TPMS Sensor Replacement"],
    "Tune-Ups": ["Spark Plug & Wire Replacement", "Engine Air Filter Swap", "Fuel Injector Cleaning", "Ignition System Check"],
    "AC & Climate": ["AC Refrigerant Recharge", "Compressor & Condenser Repair", "Cabin Air Filter Replacement", "Heater Core Diagnostics"],
    "Cooling System": ["Complete Radiator Flush", "Thermostat Replacement", "Water Pump Service", "Coolant Leak Detection"],
    "Engine Diagnostics": ["OBD-II Computer Scanning", "Check Engine Light Analysis", "Performance Data Logging", "Compression Testing"],
    "Transmission": ["Transmission Fluid Exchange", "Filter & Gasket Replacement", "Solenoid & Sensor Repair", "Drivetrain Diagnostics"],
    "Fluid Services": ["Power Steering Flush", "Differential Fluid Service", "Transfer Case Maintenance", "Brake Fluid Exchange"],
    "Battery & Charging": ["Load & Capacity Testing", "New Battery Installation", "Terminal & Cable Cleaning", "Alternator Output Check"],
    "And Much More": ["Custom Exhaust Work", "Timing Belt/Chain Service", "Pre-Purchase Inspections", "Fleet Maintenance Programs"]
};

const pattern = /(\s*)<div class="(service-card[^"]*)">([\s\S]*?)<h3>(.*?)<\/h3>([\s\S]*?)<\/div>/g;

let new_html = html_original.replace(pattern, (match, indent, classes, before_h3, title, after_h3) => {
    title = title.trim();
    const back_items = details[title] || ["Expert Service", "Quality Parts", "Guaranteed Workmanship", "Transparent Pricing"];
    const lis = back_items.map(item => \`${indent}                    <li>\${item}</li>\`).join("\\n");
    
    const front = \`${indent}    <div class="service-card-inner">
\${indent}        <div class="service-card-front">\${before_h3}<h3>\${title}</h3>\${after_h3}
\${indent}            <div class="service-flip-hint">Click for Details ↻</div>
\${indent}        </div>
\${indent}        <div class="service-card-back">
\${indent}            <h3>\${title}</h3>
\${indent}            <ul>
\${lis}
\${indent}            </ul>
\${indent}        </div>
\${indent}    </div>\`;

    return \`\${indent}<div class="\${classes}" onclick="this.classList.toggle('flipped')">\n\${front}\n\${indent}</div>\`;
});

fs.writeFileSync("c:\\\\Users\\\\jenis\\\\Downloads\\\\MANDA\\\\scratch\\\\repl.txt", new_html, "utf-8");
console.log("Done");
