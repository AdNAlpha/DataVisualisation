function init() {
    var w = 600;
    var h = 300;
    var outerRadius = w / 4; // Small pie chart
    var innerRadius = 65; // change to non zero to give Donut effect 


    var dataset = [5, 10, 20, 45, 6, 25];

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


    // Set up the arcs
    var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

    var pie = d3.pie();

    var arcs = svg.selectAll("g.arc")
                .data(pie(dataset))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")"); // Center the pie chart

    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc); // define the shape of the arc

    arcs.append("text")
        .attr("transform", function(d) {
            // It Pushes the text outwards by finding the middle of an irregular shape
            var centroid = arc.centroid(d);
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.value;
        });
}

window.onload = init;
