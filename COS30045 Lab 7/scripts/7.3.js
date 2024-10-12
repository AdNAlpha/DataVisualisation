function init() {
    var w = 300;
    var h = 200;
    var margin = {top: 20, right: 30, bottom: 40, left: 30};    
    
    var dataset = [
        {apples: 5, oranges: 10, grapes: 22},
        {apples: 4, oranges: 12, grapes: 28},
        {apples: 2, oranges: 19, grapes: 32},
        {apples: 7, oranges: 23, grapes: 35},
        {apples: 23, oranges: 17, grapes: 43},
    ];

    var keys = ["apples", "oranges", "grapes"];

    var series = d3.stack()
        .keys(keys)
        (dataset);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, w])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.apples + d.oranges + d.grapes; })])
        .range([h, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var groups = svg.selectAll("g.layer")
        .data(series)
        .enter()
        .append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) {
            return color(i);
        });

    groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
        .attr("width", xScale.bandwidth());


}

window.onload = init;
