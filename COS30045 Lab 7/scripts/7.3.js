    function init() {
        var w = 600;
        var h = 300;

        // Dataset
        var dataset = [
            {apples: 5, oranges: 10, grapes: 22},

            {apples: 4, oranges: 12, grapes: 28},

            {apples: 2, oranges: 19, grapes: 32},

            {apples: 7, oranges: 23, grapes: 35},

            {apples: 23, oranges: 17, grapes: 43},
        ];

        // Stack Set up
        var stack= d3.stack()
                    .keys(["apples", "oranges", "grapes"]);
                
        // Genrate the Series
        var series = stack(dataset);

        // xScale
        var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, w])
        .padding(0.1);

        // yScale
        var yScale = d3.scaleLinear() // Corrected function call
            .domain([0, d3.max(dataset, function(d) {
                return d.apples + d.oranges + d.grapes; // Total height for y scale
            })])
            .range([h, 0]);

        //Color
        var color = d3.scaleOrdinal(d3.schemeCategory10)

        // SVG 
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
        
        // Groups set up 
        var groups = svg.selectAll("g")
                        .data(series)
                        .enter()
                        .append("g")
                        .style("fill", function(d, i) {
                            return color(i); // apply color to each group
                        });
                        //.attr("transform", function(d, i) {
                          //  return "translate(" + xScale(i) + ",0)"; // position the groups according to the xScale
                        //});

        // Rects
        var rects = groups.selectAll("rect")
                        .data(function(d) {return d;})
                        .enter()
                        .append("rect")
                        .attr("x", function(d, i) {
                            return xScale(i);
                        })

                        .attr("y", function(d, i) {
                            return yScale(d[1]);
                        })

                        .attr("height",function(d) {
                            return yScale(d[0] - yScale(d[1]));
                        })

                        .attr("width", xScale.bandwidth());
    }

    window.onload = init;
