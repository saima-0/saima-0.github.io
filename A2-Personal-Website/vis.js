
function createSVG(w, h) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.style.display = "block";
    return svg;
  }
  
  function rect(svg, x, y, w, h, fill, rx = 0, stroke = "none") {
    const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    r.setAttribute("x", x);
    r.setAttribute("y", y);
    r.setAttribute("width", w);
    r.setAttribute("height", h);
    r.setAttribute("fill", fill);
    r.setAttribute("stroke", stroke);
    if (rx) r.setAttribute("rx", rx);
    svg.appendChild(r);
    return r;
  }
  
  function circle(svg, cx, cy, r, fill, stroke = "none") {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", cx);
    c.setAttribute("cy", cy);
    c.setAttribute("r", r);
    c.setAttribute("fill", fill);
    c.setAttribute("stroke", stroke);
    svg.appendChild(c);
    return c;
  }
  
  function text(svg, x, y, str, size = 12, weight = "500", fill = "#222", anchor = "start") {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    t.setAttribute("font-size", size);
    t.setAttribute("font-weight", weight);
    t.setAttribute("font-family", "Arial, sans-serif");
    t.setAttribute("fill", fill);
    t.setAttribute("text-anchor", anchor);
    t.textContent = str;
    svg.appendChild(t);
    return t;
  }
  
  // ---------- Visualization 1: Bar Chart (hours watched per day) ----------
  function drawOfficeBarChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    // Saima's data (hours watched each day)
    const data = [
      { day: "Mon", hours: 0 },
      { day: "Tue", hours: 2 },
      { day: "Wed", hours: 4 },
      { day: "Thu", hours: 2 },
      { day: "Fri", hours: 0 },
      { day: "Sat", hours: 0 },
      { day: "Sun", hours: 2 },
    ];
  
    const W = 900, H = 380;
    const pad = { top: 55, right: 30, bottom: 60, left: 60 };
    const svg = createSVG(W, H);
  
    // card background
    rect(svg, 0, 0, W, H, "#ffffff", 14, "rgba(0,0,0,0.10)");
  
    text(svg, pad.left, 35, "The Office watched (hours) this week", 18, "700");
    text(svg, pad.left, 58, "Bar height = hours watched (Mon–Sun)", 13, "500", "#555");
  
    const maxVal = Math.max(...data.map(d => d.hours), 1);
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
  
    // axes
    rect(svg, pad.left, pad.top + chartH, chartW, 2, "rgba(0,0,0,0.25)");
    rect(svg, pad.left, pad.top, 2, chartH, "rgba(0,0,0,0.25)");
  
    // y ticks (0..max)
    for (let i = 0; i <= maxVal; i++) {
      const y = pad.top + chartH - (i / maxVal) * chartH;
      rect(svg, pad.left - 6, y - 1, 6, 2, "rgba(0,0,0,0.25)");
      text(svg, pad.left - 12, y + 4, String(i), 12, "500", "#333", "end");
    }
  
    const barGap = 16;
    const barW = (chartW - barGap * (data.length - 1)) / data.length;
  
    data.forEach((d, i) => {
      const barH = (d.hours / maxVal) * chartH;
      const x = pad.left + i * (barW + barGap);
      const y = pad.top + chartH - barH;
  
      const bar = rect(svg, x, y, barW, barH, "#f7c98b", 6, "rgba(0,0,0,0.12)");
      bar.setAttribute("stroke-width", "1");
  
      // day label
      text(svg, x + barW / 2, pad.top + chartH + 28, d.day, 12, "600", "#222", "middle");
  
      // value label
      text(svg, x + barW / 2, y - 8, String(d.hours), 12, "700", "#222", "middle");
  
      // subtle hover
      bar.addEventListener("mouseenter", () => bar.setAttribute("fill", "#f3b25a"));
      bar.addEventListener("mouseleave", () => bar.setAttribute("fill", "#f7c98b"));
    });
  
    // y-axis title
    const yTitle = text(svg, 18, pad.top + chartH / 2, "Hours", 13, "700", "#333");
    yTitle.setAttribute("transform", `rotate(-90 18 ${pad.top + chartH / 2})`);
  
    container.innerHTML = "";
    container.appendChild(svg);
  }
  
  // ---------- SVG Art 2: Morning skyline + round moon ----------
  function drawSkyline(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    const W = 900, H = 360;
    const svg = createSVG(W, H);
  
    // Sky (morning light blue)
    rect(svg, 0, 0, W, H, "#cfe8ff", 14);
  
    // Round moon (soft pale)
    circle(svg, 120, 90, 28, "#f3f6ff", "rgba(0,0,0,0.08)");
  
    // Ground
    rect(svg, 0, H - 55, W, 55, "#2f3a4a");
  
    // Buildings
    const buildings = [
      { x: 40,  w: 120, h: 180 },
      { x: 190, w: 90,  h: 230 },
      { x: 310, w: 140, h: 210 },
      { x: 480, w: 110, h: 250 },
      { x: 620, w: 160, h: 190 },
      { x: 800, w: 70,  h: 220 },
    ];
  
    buildings.forEach((b, idx) => {
      const y = H - 55 - b.h;
      const buildingColor = idx % 2 === 0 ? "#1f2a3a" : "#273449";
      rect(svg, b.x, y, b.w, b.h, buildingColor, 4);
  
      // windows (small squares)
      const winSize = 12;
      const gap = 10;
      const margin = 14;
  
      for (let wx = b.x + margin; wx < b.x + b.w - margin - winSize; wx += winSize + gap) {
        for (let wy = y + margin; wy < y + b.h - margin - winSize; wy += winSize + gap) {
          const on = Math.random() > 0.55; // fewer lights in morning
          rect(svg, wx, wy, winSize, winSize, on ? "#ffe7a6" : "rgba(255,255,255,0.18)", 2);
        }
      }
    });
  
    // Border
    rect(svg, 0, 0, W, H, "none", 14, "rgba(0,0,0,0.10)");
  
    // Small text
    text(svg, W - 20, H - 20, "• SVG Skyline", 12, "600", "rgba(0,0,0,0.55)", "end");
  
    container.innerHTML = "";
    container.appendChild(svg);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    drawOfficeBarChart("bar-chart");
    drawSkyline("skyline");
  });
  
  