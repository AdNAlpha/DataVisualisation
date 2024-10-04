function init() {
    
    var margin = {top:20, right:20, bottom:20, left:40};
        var w = 500 - margin.left - margin.right;
        var h = 250 - margin.top - margin.bottom;
        var maxValue = 25; // Set maxValue for random number generation
        var barPadding = 3;

        // dataset for the bars
        var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

        // xScale for the bars
        var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .range([0, w])
            .paddingInner(0.05);

        // yScale for the bars
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([h, 0]);

        // SVG container
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("fill", "rgb(106, 90, 205)");


        // Function to draw the bars
        function drawBars(data) {
            // Bind the data to the rectangles
            var bars = svg.selectAll("rect")
                .data(data);

            // Create new bars
            bars.enter()
                .append("rect")
                .attr("x", function(d, i) { return xScale(i); })
                .attr("y", function(d) { return yScale(d); })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) { return h - yScale(d); });

            // Update existing bars
            bars
            .transition() 
                    .delay(function(d, i) {
                        return i / dataset.length * 100; // delay 
                    })
                    .duration(1000) // duration of the transition 
                    .ease(d3.easeCubicInOut) // ease transition
                .attr("y", function(d) {
                    return yScale(d);
                })
                .attr("height", function(d) {
                    return h - yScale(d);
                });

            // Remove old bars
            bars.exit().remove();

            // Draw labels
            var labels = svg.selectAll("text")
                .data(data);

            // Create new labels
            labels.enter()
                .append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return xScale(i) + xScale.bandwidth() / 2; }) // Center the text in the bars
                .attr("y", function(d) { return yScale(d) - 4; }) // Position above the bar
                .attr("fill", "Black")
                .attr("text-anchor", "middle"); // Center the text

            // Update existing labels
            labels
                .transition() 
                    .delay(function(d, i) {
                        return i / dataset.length * 100; // delay 
                    })
                .duration(1000) // duration of the transition 
                .ease(d3.easeCubicInOut) // ease transition
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return xScale(i) + xScale.bandwidth() / 2; })
                .attr("y", function(d) { return yScale(d) - 4; });

            // Remove old labels
            labels.exit().remove();
        }
       
        // Initial drawing of the bars
        drawBars(dataset);

        // Click event for the update button
        d3.select("#updateButton")
            .on("click", function() {
                // Generate new random dataset
                var numValues = dataset.length;
                dataset = []; // Reset the dataset

                for (var i = 0; i < numValues; i++) {
                    var newNumber = Math.floor(Math.random() * maxValue);
                    dataset.push(newNumber);
                }

                // Update the scales
                yScale.domain([0, d3.max(dataset)]);

                // Redraw the bars with the new dataset
                drawBars(dataset);
            });
}

window.onload = init;
