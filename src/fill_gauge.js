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

    let gauge = d3.select("#" + id); //create a d3 container for the gauge
    let radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height"))) / 2; // calculate radius of gauge
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
    let fillCircleRadius = radius - fillInGapMargin; // radius of circle that will be filled

    let waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);   //wave height
    let waveLength = fillCircleRadius * 2 / config.waveCount;     // adjust wave length according to number of waves
    let waveClipCount = 1 + config.waveCount;    //number of clips used to generate wave animation (higher -> faster)
    let waveClipWidth = waveLength * waveClipCount;   // width of wave

    let round = (num) => { Math.round(num) };   // function to display percentage with 2 decimal places as gauge is filled

    //adjust function to display valid numbers in gauge
    if (parseFloat(percentageEndingCount) != parseFloat(round(percentageEndingCount))){
        round = (num) => parseFloat(num).toFixed(1);
    } 

    if (parseFloat(percentageEndingCount) != parseFloat(round(percentageEndingCount))){
        round = (num) => parseFloat(num).toFixed(2);
    } 

    let data = [];  // wave parts container

    //wave parts creator for smooth transition 
    for (let i = 0; i <= 40 * waveClipCount; i++ ){
        data.push({ 
            x: i / (40 * waveClipCount),
            y: i / 40
        })
    }

    // Drawing outer circle with scale
    let outerCircleX = d3.scale.linear()
                               .range([0, 2 * Math.PI])
                               .domain([0,1]);

    let outerCircleY = d3.scale.linear()
                                .range([0, radius])
                                .domain([0,radius]);

    // Controlling the size of clipping path with scale
    let waveScaleX = d3.scale.linear()
                             .range([0, waveClipWidth])
                             .domain([0, 1]);

    let waveScaleY = d3.scale.linear()
                             .range([0, waveHeight])
                             .domain([0, 1]);


    // Positing of the clipping path with scale
    // Control how rise of liquid
    let waveRiseScale = d3.scale.linear()
                                .range([(fillInGapMargin + fillCircleRadius * 2 + waveHeight), (fillInGapMargin - waveHeight) ])
                                .domain([0,1])
    

    // Making the wave animate by one full wave cycle and then restart its position
    let waveAnimateScale = d3.scale.linear()
                                    .range([0 , waveClipWidth - fillCircleRadius * 2])
                                    .domain([0,1])
    
    // positing of percentage in gauge                                     
    let raisePercentageScale = d3.scale.linear()
                                       .range([fillInGapMargin + fillCircleRadius * 2, fillInGapMargin + percentageTextSize ])
                                       .domain([0,1])
                            
    // center gauge inside svg
    let gaugeGroup = gauge.append("g")
                          .attr('transform', 'translate(' + xAxis + ',' + yAxis + ')');

    // Outer Circle drawing
    let gaugeArc = d3.svg.arc()
        .startAngle(outerCircleX(0))
        .endAngle(outerCircleX(1))
        .outerRadius(outerCircleY(radius))
        .innerRadius(outerCircleY(radius - outerCircleThickness));

    gaugeGroup.append("path")
        .attr("d", gaugeArc)
        .style("fill", config.circleColor)       //filling color
        .attr("transform", "translate(" + radius + "," + radius + ")");

    let textNotInLiquid = gaugeGroup.append("text")
        .text(round(percentageStartingCount) + percentSignDisplay)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", percentageTextSize, "px")
        .style("fill", config.textColor)
        .attr("transform", "translate(" + radius + "," + raisePercentageScale(config.textVertPosition) + ")")

    let waveClipArea = d3.svg.area()
        .x( (d) => waveScaleX(d.x))
        .y0( (d) => waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1- config.waveCount) + d.y * 2 * Math.PI)))
        .y1( (d) => fillCircleRadius * 2 + waveHeight)

    let waveGroup = gaugeGroup.append("defs")
        .append("clipPath")
        .attr("id", "clipWave" + id)

    // bind data to svg
    let wave = waveGroup.append("path")
        .datum(data)
        .attr("d", waveClipArea)

    //Create fill circle and attach wave
    let fillCircleGroup = gaugeGroup.append("g")
        .attr("clip-path", "url(#clipWave" + id + ")")

    //Position fill circle 
    fillCircleGroup.append("circle")
        .attr("cx", radius)
        .attr("cy", radius)
        .attr("r", fillCircleRadius)
        .style("fill", config.waveColor);

    //Text not inside liquid/ behind front text

    // if (fillPercent >= 1) {
    //     config.waveTextColor = "red";
    // } 

    let textInLiquid = fillCircleGroup.append("text")
        .text(round(percentageStartingCount) + percentSignDisplay)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", percentageTextSize + "px")
        .style("fill", config.waveTextColor)
        .attr("transform", "translate(" + radius + "," + raisePercentageScale(config.textVertPosition) + ")")


    // Percentage animation 
    if (config.valueCountUp) {
        // must be function style for animation to work
        let text = function () { 
            let i = d3.interpolate(this.textContent, percentageEndingCount);
            // must be function style
            return function (t) { this.textContent = round(i(t)) + percentSignDisplay }
        };

        textNotInLiquid.transition()
            .duration(config.waveRiseTime)
            .tween("text", text);

        textInLiquid.transition()
            .duration(config.waveRiseTime)
            .tween("text", text);
    }

    


    let waveGroupXPosition = fillInGapMargin + fillCircleRadius * 2 - waveClipWidth;

    if (config.waveRise) {
        waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
            .transition()
            .duration(config.waveRiseTime)
            .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
            .each("start", function () {
                wave.attr('transform', 'translate(1,0)');
            }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
    } else {
        waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
    }

    if (config.waveAnimate) animateWave();

    function animateWave() {
        wave.transition()
            .duration(config.waveAnimateTime)
            .ease("linear")
            .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
            .each("end", function () {
                wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
                animateWave(config.waveAnimateTime);
            });
    }

    function GaugeUpdater() {
        this.update = function (num) {
            let finalPercent = parseFloat(num).toFixed(2);
            let roundPercent = function(num) { return Math.round(num) }

            if (parseFloat(finalPercent) != parseFloat(roundPercent(finalPercent))) {
                roundPercent = function (num) { return parseFloat(num).toFixed(1) };
            }

            if (parseFloat(finalPercent) != parseFloat(roundPercent(finalPercent))) {
                roundPercent = function (num) { return parseFloat(num).toFixed(2) };
            } 

            let text = function () {
                let i = d3.interpolate(this.textContent, parseFloat(num).toFixed(2));
                // must be function style
                return function (t) { this.textContent = roundPercent(i(t)) + percentSignDisplay }
            };

            textNotInLiquid.transition()
                .duration(config.waveRiseTime)
                .tween("text", text);

            textInLiquid.transition()
                .duration(config.waveRiseTime)
                .tween("text", text);
        

            let fillPercent = Math.max(config.minValue, Math.min(config.maxValue, num)) / config.maxValue;
            let waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
            let waveRiseScale = d3.scale.linear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                .range([(fillInGapMargin + fillCircleRadius * 2 + waveHeight), (fillInGapMargin - waveHeight)])
                .domain([0, 1]);
            let newHeight = waveRiseScale(fillPercent);
            let waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
            let waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);
            let newClipArea;

            if (config.waveHeightScaling) {
                newClipArea = d3.svg.area()
                    .x(function (d) { return waveScaleX(d.x); })
                    .y0(function (d) { return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI)); })
                    .y1(function (d) { return (fillCircleRadius * 2 + waveHeight); });
            } else {
                newClipArea = clipArea;
            }

            let newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
            wave.transition()
                .duration(0)
                .transition()
                .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - wave.attr('T'))) : (config.waveRiseTime))
                .ease('linear')
                .attr('d', newClipArea)
                .attr('transform', 'translate(' + newWavePosition + ',0)')
                .attr('T', '1')
                .each("end", function () {
                    if (config.waveAnimate) {
                        wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
                        animateWave(config.waveAnimateTime);
                    }
                });
            waveGroup.transition()
                .duration(config.waveRiseTime)
                .attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')')
        }
    }

    return new GaugeUpdater();


    
}