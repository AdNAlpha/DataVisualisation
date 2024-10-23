function init() {
    var w = 700;
    var h = 350;
    var padding = { top: 40, right: 40, bottom: 60, left: 60 };
    var dataset;

    // Load the CSV
    d3.csv("Unemployment_78-95.csv", function (d) {
        return {
            date: new Date(+d.year, +d.month - 1), 
            number: +d.number // Corrected 'num' to 'number'
        };
    }).then(function (data) {
        dataset = data;
        console.log(dataset); // Check the dataset in the console for correct parsing
        console.table(dataset, ["date", "number"]);
        linechart(dataset);
    });

    // Chart SVG
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    function linechart(dataset) {
        // xScale
        var xScale = d3.scaleTime()
            .domain([d3.min(dataset, function(d) { return d.date; }), 
                     d3.max(dataset, function(d) { return d.date; })])
            .range([padding.left, w - padding.right]);

        // yScale
        var yScale = d3.scaleLinear()
            .domain([0, 1000000]) // Set Y scale domain from 0 to 1,000,000
            .range([h - padding.bottom, padding.top]);

        // Area generator
        var area = d3.area()
            .x(function(d) { return xScale(d.date); })
            .y0(yScale(0)) // Set baseline to the yScale(0)
            .y1(function(d) { return yScale(d.number); });

        // Append the area path
        svg.append("path")
            .datum(dataset) // Bind the dataset
            .attr("class", "area")
            .attr("d", area) // Use the area generator
            .attr("fill", "slategrey"); // Fill the area with steelblue

        // Axes
        var xAxis = d3.axisBottom(xScale)
            .ticks(d3.timeYear.every(2)); // Show ticks for each year

        var yAxis = d3.axisLeft(yScale)
            .ticks(10) // Adjust the number of ticks if needed
            .tickFormat(d3.format(",d")); // Format ticks with commas

        svg.append("g")
            .attr("transform", "translate(0," + (h - padding.bottom) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + padding.left + ", 0)")
            .call(yAxis);

        // Line for half a million unemployed
        svg.append("line")
            .attr("class", "line halfMilMark")
            .attr("x1", padding.left)
            .attr("y1", yScale(500000)) // Set to 500,000 on Y scale
            .attr("x2", w - padding.right)
            .attr("y2", yScale(500000)) // Set to 500,000 on Y scale
            .attr("stroke", "red")
            .attr("stroke-dasharray", "5,5"); // Add dashed line style

        // Text for "Half a million unemployed"
        svg.append("text")
            .attr("class", "halfMilText")
            .attr("x", padding.left + 10) // Position text near the left
            .attr("y", yScale(500000) - 5) // Place it just above the line
            .attr("fill", "red")
            .attr("text-anchor", "start")
            .text("Half a million unemployed");
    }
}

window.onload = init;
