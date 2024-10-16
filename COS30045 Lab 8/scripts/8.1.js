function init() {
    var w = 600;
    var h = 300;

    // Set up The Body
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");


    //scale the map 
    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w/2, h/2])
                        .scale(2450);

    //Geo path 
    var path = d3.geoPath()
                .projection(projection);

    d3.json("LGA_VIC.json").then(function(json) {

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
    });

    
}
window.onload = init;
