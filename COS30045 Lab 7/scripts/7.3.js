function init() {
    var w = 300;
    var h = 200;
    var margin = {top: 20, right: 30, bottom: 40, left: 30};    
    
    // Dataset
    var dataset = [
        {apples: 5, oranges: 10, grapes: 22},
        {apples: 4, oranges: 12, grapes: 28},
        {apples: 2, oranges: 19, grapes: 32},
        {apples: 7, oranges: 23, grapes: 35},
        {apples: 23, oranges: 17, grapes: 43},
    ];

    var keys = ["grapes", "oranges", "apples"];

    // series
    var series = d3.stack()
        .keys(keys)
        (dataset);

    //SVG Body
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w + margin.left + margin.right) // Adjust width for legend space
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // xScale
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, w])
        .padding(0.1);

    // yScale
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.apples + d.oranges + d.grapes;
        })])
        .range([h, 0]);

    // Color
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(["#2ca02c", "#ff7f0e", "#1f77b4"]); // grapes(green), oranges(orange), apples(blue)

    // Groups SetUp
    var groups = svg.selectAll("g.layer")
        .data(series)
        .enter()
        .append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) {
            return color(d.key);  // Use key for proper color mapping
        });

    // Rect SetUp
    groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
        .attr("width", xScale.bandwidth());

    // Adding Legend
    var legend = svg.selectAll(".legend")
        .data(keys)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(" + (w + 20) + "," + (i * 20) + ")";  // Positioning legend items
        });

    // Colored rectangles in legend
    legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d) { return color(d); });

    // Text labels in legend
    legend.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .text(function(d) { return d; })
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
}

window.onload = init;
