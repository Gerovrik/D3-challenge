// Creating margins + height and width
var baseWidth= 720;
var baseHeight= 600;
var margin = {top:25, right: 25, bottom: 100, left: 75},
    width = baseWidth - margin.left - margin.right,
    height = baseHeight - margin.top - margin.bottom;

// adding object to page 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// importing data from CSV
d3.csv("assets/data/data.csv").then(function(data) {
    data.forEach(d => {
        d.age = +d.age;
        d.smokes = +d.smokes;
    });
    //Creating X axis, and y axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data.map(d => d.age)))
        .range([0, width])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.smokes))
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    //Creating points on graph, adding text and design.
    var points = svg.selectAll("g.point")
        .data(data)
        .enter()
        .append('g');

    points.append("circle")
        .attr("cx", d => x(d.age))
        .attr("cy", d => y(d.smokes))
        .attr("r", 8)
        .style("fill", "#FFFF00");
    
    points.append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.age))
        .attr("y", d => y(d.smokes))
        .attr("dx", -5)
        .attr("dy", 1.5)
        .style("font-size", "8px")
        .style('fill', 'green');

    //Creating x and y labels
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 43)
    .text("Age (Years)");

    svg.append("text")
    .attr("text-anchor", "center")
    .attr("transform", "rotate(-90)")
    .attr("x", (height / 2) * -1)
    .attr("dy", -43)
    .text("Smokes (%)");

});