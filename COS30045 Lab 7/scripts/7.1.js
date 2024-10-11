function init(){

var w =600;
var h= 300;
var padding = 60;

var dataset 
d3.csv("Unemployment_78-95.csv", function(d) {
  return {
    date: new Date(+d.year, +d.month-1),
    number: +d.number
  };
}) . then(function(data) {
    dataset = data;

    linechart(dataset);
})

//linechart function 
function linechart(dataset) {
  var xScale = d3.scaleTime()
}



}
window.onload = init;