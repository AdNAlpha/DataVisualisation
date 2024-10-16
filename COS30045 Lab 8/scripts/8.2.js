function init() {
    var w = 600;
    var h = 300;

    // Load the CSV data and map color domain
    d3.csv("VIC_LGA_unemployment.csv").then(function(data) {
        
        // Load the Map 
        d3.json("https://raw.githubusercontent.com/AdNAlpha/DataVisualisation/refs/heads/main/COS30045%20Lab%208/LGA_VIC.json")
        .then(function(json) {

            // Loop through the CSV data
            for (var i = 0; i < data.length; i++) {
                // Get the LGA code and Unemployment rate from CSV
                var dataLGA = data[i].LGA; // LGA column 
                var dataUnemployed = parseFloat(data[i].unemployed);  // Unemployed column 

                // Find the Corresponding LGA in the Map file 
                for (var j = 0; j < json.features.length; j++) {
                    var jsonLGA = json.features[j].properties.LGA_name; // JSON property
                    if (dataLGA == jsonLGA) {
                        // Copy the unemployment data from CSV to Map
                        json.features[j].properties.unemployed = dataUnemployed;
                        // Stop looking 
                        break;
                    }
                }
            }

            // Set up The Body
            var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");

            // Scale the map 
            var projection = d3.geoMercator()
                .center([145, -36.5])
                .translate([w / 2, h / 2])
                .scale(2500);

            // Color Range
            var color = d3.scaleQuantize()
                .domain([0, d3.max(json.features, function(d) { return d.properties.unemployed; })]) // Define the domain based on the max unemployment value
                .range(d3.schemeBlues[9]); // 9 different shades of Blue 

            // Geo path 
            var path = d3.geoPath()
                .projection(projection);

            // Draw Map 
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d) {
                    return color(d.properties.unemployed); // Apply color based on unemployment data
                })
                .style("stroke", "darkgrey");

            // Load the Towns and Cities 
            d3.csv("VIC_city.csv").then(function(cityData) {
                svg.selectAll("circle")
                    .data(cityData)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) {
                        // Convert longitude to X coordinate
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("cy", function(d) {
                        // Convert latitude to Y coordinate
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("r", 4) // Size of the circles
                    .attr("fill", "red") // Color of the circles
                    .attr("stroke", "black")
                    .append("title") // Tooltip for the city names
                    .text(function(d) {
                        return d.place;
                    });
            });
        });
    });
}
window.onload = init;
