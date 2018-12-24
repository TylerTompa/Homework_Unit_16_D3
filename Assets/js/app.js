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
    left: 100
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
  .select("#scatter")
  .append("svg")
  .attr("width", svg_width)
  .attr("height", svg_height);

var chart_group = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// IGNORE THIS.  I MIGHT COME BACK AND TRY THIS WAY AGAIN AT A LATER POINT. ////////////////////////////////////////////////////////////////////////////////////////////////////

// Step 3: Import data from csv file

// d3.csv("../../Data/data.csv", function(error, state_data) {
//     if (error) throw error;
//     console.log("Found the csv file.");

// // Step 4: Parse and format data

// state_data.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.povertyMoe = +data.povertyMoe;
//     data.age = +data.age;
//     data.ageMoe = +data.ageMoe;
//     data.income = +data.incomeMoe;
//     data.noHealthInsurance = +data.noHealthInsurance;
//     data.obesity = +data.obesity;
//     data.smokes = +data.smokes;
//   });

// }
// )

////////////////////////////////////////////////////////////////////////////////////////////////////

// Step 3: Import data from csv file
d3.csv("../../Data/data.csv").then(
  function(state_data) {

  // Step 4: Parse and format the data
  state_data.forEach(
    function(data) {
      data.poverty = +data.poverty;
      // data.povertyMoe = +data.povertyMoe;
      // data.age = +data.age;
      // data.ageMoe = +data.ageMoe;
      // data.income = +data.incomeMoe;
      data.noHealthInsurance = +data.noHealthInsurance;
      // data.obesity = +data.obesity;
      // data.smokes = +data.smokes;
  });

  // Step 5: Create scale functions
  var x_linear_scale = d3.scaleLinear()
    .domain([8, d3.max(state_data, d => d.poverty)])
    .range([0, width]);
 
  var y_linear_scale = d3.scaleLinear()
    .domain([0, d3.max(state_data, d => d.noHealthInsurance)])
    .range([height, 0]);

  // Step 6: Create axis functions
  var bottom_axis = d3.axisBottom(x_linear_scale);
  var left_axis = d3.axisLeft(y_linear_scale);
  
  // Step 7: Create and append data circles for each state
  var circles_group = chart_group.selectAll("circle")
  .data(state_data)
  .enter()
  .append("circle")
  // .attr('class',function(d){return d.abbr})
  // .append("text")
  .attr("cx", d=> x_linear_scale(d.poverty))
  .attr("cy", d => y_linear_scale(d.noHealthInsurance))
  .attr("r", "15")
  .attr("fill", "skyblue")
  .attr("opacity", "0.4")
  // .attr("outline", "0.2")
   
  // Step 8: Before we append the state abbreviations into the circles, we define text offsets, which will move the text to the center of the circle.
  var text_x_offset = -10;
  var text_y_offset = 5;

  // Step 9: Append state abbreviation into each circle
  chart_group.selectAll("text")
  // .textYOffset = 5;
  .data(state_data)
  .enter()
  .append("text")
  .attr("x", d => x_linear_scale(d.poverty) + text_x_offset)
  .attr("y", d => y_linear_scale(d.noHealthInsurance) + text_y_offset)
  .text(
      function(d) 
      {return d.abbr}
      )
  
  // Step 10: Append axes to chart
  chart_group.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottom_axis);

  chart_group.append("g")
    .call(left_axis);

  // IGNORE THIS SECTION.  I MIGHT COME BACK TO IT AT A LATER POINT. ////////////////////////////////////////////////////////////////////////////////////////////////////


    // // Step 9: Initialize tool Tip
    // var tool_tip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([0, 0])
    //   .html(function(d) {
    //     return (`In poverty: ${d.poverty}<br>No insurance: ${d.noHealthInsurance}`)
    //   });

    // // Step 10: Create tool tip in chart
    // chart_group.call(tool_tip);

    // // Step 11: Create event listener to display and hide tooltip
    // circles_group.on("click", function(data) {
    //   tool_tip.show(data, this);
    // })

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Step 11: Create axis labels
    chart_group.append("text")
    .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Percent living in poverty")

    chart_group.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", -( 100 + (height/2)))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Percent with no health insurance")
  }
)