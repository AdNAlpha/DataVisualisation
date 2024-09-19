function init() {

    var w = 800;
    var h = 300;
    var padding = 40;

    var dataset = [
        [2, 8],
        [3, 5],
        [5, 17],
        [6, 6],
        [6, 12],
        [7, 20],
        [8, 22],
        [10, 11],
        [5, 12],
        [6, 16]
    ];

    var xScale = d3.scaleLinear()
        .domain([d3.min(dataset, function(d) {
                return d[0];
            }) - 2,
            d3.max(dataset, function(d) {
                return d[0];
            }) + 2
        ])
        .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(dataset, function(d) {
                return d[1];
            }) - 5,
            d3.max(dataset, function(d) {
                return d[1];
            }) + 5
        ])
        .range([h - padding, padding]);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Axes
    var xAxis = d3.axisBottom()
        .ticks(5)
        .scale(xScale);

    var yAxis = d3.axisLeft()
        .ticks(5)
        .scale(yScale);

    axes(svg, xAxis, yAxis, w, h, padding); // Pass w and h into axes function

    // Circles for data points
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", 6)
        .attr("fill", "slategrey");

    // Text labels for data points
    svg.selectAll("text.data-label")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "data-label")
        .text(function(d) {
            return d[0] + "," + d[1];
        })
        .attr("x", function(d) {
            return xScale(d[0]);
        })
        .attr("y", function(d) {
            return yScale(d[1]) - 10; // Position slightly above the circles
        })
        .attr("font-size", "13px");
}

// Axis lines and labels
function axes(svg, xAxis, yAxis, w, h, padding) {
    svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

}

window.onload = init;
