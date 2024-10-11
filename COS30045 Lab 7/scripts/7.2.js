function init() {
    var w = 600;
    var h = 300;
    var outerRadius = w /2;
    var innerRadius = 0;

    var dataset = [5, 10, 20, 45, 6, 25];

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("body")
                .append("svg")
                .attr("width" ,w)
                .attr ("height", h);

    var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

    var pie = d3.pie()

    var arcs = svg.selectAll("g.arc")
                .data(pie(dataset))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate("+ outerRadius + "," + outerRadius + ")");

    arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc);

    
}
window.onload = init;