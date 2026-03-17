import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = 800;
const height = 500;
const maxCircles = 10;

let circles = [];

const svg = d3
  .select("#visContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("border", "1px solid black")
  .style("background", "#f9f9f9");

svg.on("click", function (event) {
  if (circles.length >= maxCircles) return;

  const [x, y] = d3.pointer(event);

  circles.push({ x, y });

  svg
    .selectAll("circle")
    .data(circles)
    .join(
      enter =>
        enter
          .append("circle")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", 0)
          .attr("fill", "steelblue")
          .transition()
          .duration(400)
          .attr("r", 20),
      update => update,
      exit => exit.remove()
    );
});
