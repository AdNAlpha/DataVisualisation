function init() {
    var w = 600;
    var h = 300;
    var padding = 60;


    var dataset, xScale, yScale, line, xAxis, yAxis, area;
    var formatTime = d3.timeFormat("XY")

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, d.month-1), 
            number: +d.number
        };

    }).then(function(data) {
        dataset = data;

        linechart(dataset)
    });

    console.table(dataset, ["date", "number"]);
    
    //Line chart 
    function linechart(dataset)
    {
        xScale = d3.scaleTime()
        .domain([
                d3.min(dataset, function(d) {return d.date;}),
                d3.max(dataset, function(d) {return d.date;})
        ])
        .range([padding, w]);
    }

    //X scale setup
    xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d) { return d.date; }),
            d3.max(dataset, function(d) { return d.date;})
        ])
        .range ([0, w]);

    // Y scale setup 
    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {return d.number;})
        ])
        .range ([h, 0]);

    // Axes 
     // Create axes
     var xAxis = d3.axisBottom(xScale);
     var yAxis = d3.axisLeft(yScale);
 
     svg.append("g")
         .attr("transform", "translate(0," + (h - padding) + ")")
         .call(xAxis);
 
     svg.append("g")
         .attr("transform", "translate(" + padding + ",0)")
         .call(yAxis);

    // Line set up 
   var line = d3.line()
        .x(function(d) {return xScale(d.date); })
        .y(function(d) {return yScale(d.number); })
        .attr("fill","none")
        .attr("stoke", "slategrey")
        .attr("stroke-width", 0.5);

    // SVG and Path setup 
    var svg =d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

            svg.append("path")
                .datum(dataset)
                .attr("Class","line")
                .attr("d", line)

    // Annotations 
    svg.append("line")
        .attr("class", "line halfMilMark")
        // start of line
        .attr("x1", padding)
        .attr("y1", yScale(500000))
        // end of line 
        .attr("x2",w)
        .attr("y2", yScale(500000))

    svg.append("text")
        .attr("class", "halfMilLabel")
        .attr("x", padding + 10)
        .attr("y", yScale(500000)-7)
        .text("Half a million unemployed");

    // Area
    area = d3.area()
        .x(function(d) {return xScale(d.date); })

        // base line for area shape
        .y0(function() { return yScale.range() [0]; })

        .y1(function(d) {return yScale(d.number); });
    
}
window.onload= init;