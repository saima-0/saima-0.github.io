import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = 850;
const height = 600;

const svg = d3
  .select("#visContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("border", "1px solid black")
  .style("background", "#f9f9f9");

let circles = [];

svg.on("click", function(event) {
  if (circles.length >= 10) return;

  const [x, y] = d3.pointer(event);

  circles.push({ x, y });

  svg
    .selectAll("circle")
    .data(circles)
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 20)
    .attr("fill", "steelblue");
});
