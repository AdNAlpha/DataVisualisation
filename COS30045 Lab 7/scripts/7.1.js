function init() {
  var w = 600;
  var h = 300;
  var padding = 60;

  var dataset;

  // Load CSV
  d3.csv("Unemployment_78-95.csv", function(d) {
      return {
          date: new Date(+d.year, +d.month - 1), // Adjust month to 0-based index
          number: +d.number
      };
  }).then(function(data) {
      dataset = data;
      linechart(dataset);
  });

  // Create SVG
  var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  // Linechart function
  function linechart(dataset) {
      // Scales
      var xScale = d3.scaleTime()
          .domain([d3.min(dataset, function(d) {
              return d.date;
          }), d3.max(dataset, function(d) {
              return d.date;
          })])
          .range([padding, w - padding]);

      var yScale = d3.scaleLinear()
          .domain([0, d3.max(dataset, function(d) {
              return d.number;
          })])
          .range([h - padding, padding]);

      // Line generator
      var line = d3.line()
          .x(function(d) {
              return xScale(d.date);
          })
          .y(function(d) {
              return yScale(d.number);
          });

      // Append line path
      svg.append("path")
          .datum(dataset)
          .attr("class", "line")
          .attr("d", line);

      // Axes
      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale);

      svg.append("g")
          .attr("transform", "translate(0, " + (h - padding) + ")")
          .call(xAxis);

      svg.append("g")
          .attr("transform", "translate(" + padding + ", 0)")
          .call(yAxis);

      // Line marking "Half a million unemployed"
      svg.append("line")
          .attr("class", "line halfMilMark")
          .attr("x1", padding)
          .attr("y1", yScale(500000)) // Start Y position
          .attr("x2", w - padding) // End X position
          .attr("y2", yScale(500000)) // End Y position
          .style("stroke", "red")
          .style("stroke-dasharray", "4 4");

      // Text label
      svg.append("text")
          .attr("class", "halfMilLabel")
          .attr("x", padding + 10)
          .attr("y", yScale(500000) - 7)
          .text("Half a million unemployed")
          .style("fill", "red");
  }
}

window.onload = init;
