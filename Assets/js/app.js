////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Tyler Tompa
2018, December, 19
UNCC Data Analytics Boot Camp, Homework, Unit 16- D3
*/
////////////////////////////////////////////////////////////////////////////////////////////////////

// Step 1: Set up our chart
var svg_width = 960;
var svg_height = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svg_width - margin.left - margin.right;
var height = svg_height - margin.top - margin.bottom;

/*
Step 2:
Create an SVF wrapper,
append an SVG group that will hold our chart,
shift the latter by left and top margins
*/

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svg_width)
  .attr("height", svg_height);

d3.csv("../../Data/data.csv", function() {
    console.log("Found the csv file.");

}
)