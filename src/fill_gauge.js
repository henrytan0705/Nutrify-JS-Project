/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 *
 * Liquid Fill Gauge v1.1
 */
function liquidFillGaugeDefaultSettings() {
    return {
        minValue: 0, // The gauge minimum value.
        maxValue: 100, // The gauge maximum value.
        circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
        circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
        circleColor: "#178BCA", // The color of the outer circle.
        waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
        waveCount: 3, // The number of full waves per width of the wave circle.
        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
        waveAnimateTime: 1000, // The amount of time in milliseconds for a full wave to enter the wave circle.
        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
        waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
        waveAnimate: true, // Controls if the wave scrolls or is static.
        waveColor: "#178BCA", // The color of the fill wave.
        waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
        textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
        textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
        valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
        displayPercent: true, // If true, a % symbol is displayed after the value.
        textColor: "#045681", // The color of the value text when the wave does not overlap it.
        waveTextColor: "#A4DBf8" // The color of the value text when the wave overlaps it.
    };
}

function loadLiquidFillGauge(id, value, config) {
    if (config === null) config = liquidFillGaugeDefaultSettings();

    let gauge = d3.select("'#", id); //create a d3 container for the gauge
    let radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height")) / 2); // calculate radius of gauge
    let xAxis = parseInt(gauge.style("width")) / 2 - radius; //distance from left side of container
    let yAxis = parseInt(gauge.style("height")) / 2 - radius; //distance from top of container
    let fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue; // percentage of gauge to fill

    let waveHeightScale = d3.scale.linear()
                                  .range([0, config.waveHeight, 0])    //scaling for wave height
                                  .domain([0, 50, 100])             // scaling for wave length

    let percentageTextSize = 40;       //size of perecentage text inside gauge
    let percentageStartingCount = 0;    // start percentage at 0 and count up as gauge is filled
    let percentageEndingCount = parseFloat(value).toFixed(2)      // end perecentage when gauge is filled according to value passed in
    let percentSignDisplay = "%";     // % display next to value inside gauge

    let outerCircleThickness = config.circleThickness * radius;  // thickness of outer circle
    let circleGap = config.circleFillGap * radius;    // gap size between outer and inner circle
    let fillInGapMargin = outerCircleThickness + circleGap;   // Margin size to fill in to create gap display
    let fillCircleRadius = radius - fillCircleMargin; // radius of circle that will be filled

    let waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);   //wave height
    let waveLength = fillcircleRadius * 2 / config.waveCount;     // adjust wave length according to number of waves
    let waveClipCount = 1 + config.waveCount;    //number of clips used to generate wave animation (higher -> faster)
    let waveWidth = waveLength * waveClipCount;   // width of wave

    let round = (num) => { Math.parseFloat(num).toFixed(2) };   // function to display percentage with 2 decimal places as gauge is filled

    let wave = [];  // wave parts container

    //wave parts creator for smooth transition 
    for (let i = 0; i <= 40 * waveClipCount; i++ ){
        wave.push({ 
            x: i / (40 * waveClipCount),
            y: i / 40
        })
    }

    // Drawing outer circle with scale
    let outerCircleX = d3.scale.linear().range([0, 2 * Math.PI]).domain([0,1]);
    let outerCircleY = d3.scale.linear().range([0, radius]).domain([0,radius]);

    // Controlling the size of clipping path with scale
    let waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
    let waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);

    

}