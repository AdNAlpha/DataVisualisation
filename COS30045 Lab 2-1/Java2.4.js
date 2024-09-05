function init(){
    // reading data from CSV
    d3.csv("Task_2.4_data.csv").then(function(data){
        console.log(data);
        wombatSightings = data;  
        
        barChart(wombatSightings);
    })

    var w = 500;
    var h = 250;
    var barPadding = 3;

    //D3 Block
    var svg =  d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    function barChart(wombatSightings)
    {
        svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d,i) {return i* (w/wombatSightings.length);}) // x coordinate
        .attr("y", function(d) { return h - (d.wombats*4)}) // y coordinate
        .attr("width", function (d) {return (w/wombatSightings.length - barPadding);}) // width of chart
        .attr("height", function (d) {return d.wombats*4;}) //height of chart
        .attr("fill", function (d) {return "rgb(135, 235, " + (d.wombats * 8) + ")";});  // color of  chart

        svg.selectAll("text")
        .data(wombatSightings)
        .enter()
        .append("text")
        .text(function(d) {return d.wombats;})
        .attr("fill", "black")
        .attr("x", function(d,i) {return i* (w/wombatSightings.length) + 4;})
        .attr("y",function(d) {return h - (d.wombats*4)+12})
        .attr("font-size", "14px")


    }

}
window.onload = init;