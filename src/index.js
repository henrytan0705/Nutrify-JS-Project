var chart = null;
var gauge1 = null;
var gauge2 = null;
var gauge3 = null;
var gauge4 = null;
var gauge5 = null;
var gauge6 = null;
var gauge7 = null;

document.addEventListener("DOMContentLoaded", () => {
    let submitButton = document.getElementsByClassName("form-button")[0];

    let inputArea = document.getElementById("formValue");
    inputArea.addEventListener("keydown", event => {
        if (event.keyCode === 13) {
            submitButton.click();
        }
    })
})

document.addEventListener("submit", (e) => {
    if (chart !== null) chart.destroy();

    e.preventDefault();
    let formValue = document.getElementById("formValue").value;
    let foodList = document.getElementById("food");
    // let gauges = document.getElementById("gauges");

    while (foodList.firstChild) {
        foodList.removeChild(foodList.firstChild);
    }

    let foodData = {
        "query": formValue,
        "timezone":"US/Eastern"
    };

    function postData(url = '', data = {}) {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "x-app-id": "c6356694",
                "x-app-key": "07260f8e8e52a443f2cb118d81efe6d4",
                "x-remote-user-id": 0
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data),
        })
            .then(response => response.json());
    }

    let typesOfFood;

    postData('https://trackapi.nutritionix.com/v2/natural/nutrients', foodData)
        .then(data => {
            if (!!document.getElementsByClassName("error-message")[0]) {
                let error = document.getElementsByClassName("error-message")[0];
                // error.remove();
                error.textContent = "";
            }

            document.getElementById("item-list").classList.remove("hide-text");

            typesOfFood = Object.values(data.foods).map(i => i.food_name);

            let totalCalories = 0; 
            let nutritionTypes = ["Protein", "Carbohydrates", "Fats", "Sodium", "Cholesterol", "Sugar"];
            let nutritionalData = {
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                totalSodium: 0,
                totalCholesterol: 0,
                totalSugar: 0
            }

            for (let i = 0; i < data.foods.length; i++) {
                totalCalories += data.foods[i].nf_calories;
                nutritionalData.totalCholesterol += data.foods[i].nf_cholesterol;
                nutritionalData.totalProtein += data.foods[i].nf_protein;
                nutritionalData.totalFat += data.foods[i].nf_total_fat;
                nutritionalData.totalSodium += data.foods[i].nf_sodium;
                nutritionalData.totalCarbs += data.foods[i].nf_total_carbohydrate;
                nutritionalData.totalSugar += data.foods[i].nf_sugars;
            }

            let ctx = document.getElementById("nutrition");
            chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: nutritionTypes,
                    datasets: [{
                        label: 'Nutritional Breakdown',
                        data: Object.values(nutritionalData),
                        backgroundColor: [
                            '#082342',
                            '#f3d0b0',
                            '#e2705a',
                            '#242323',
                            '#6ca339',
                            '#cde6fd'
                        ],
                        borderColor: [
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                        ],
                        borderWidth: 0,
                        hoverBorderColor: [
                            '#000000',
                            '#000000',
                            '#000000',
                            '#000000',
                            '#000000',
                            '#000000',
                            '#000000',
                        ],
                        hoverBorderWidth: 2
                    }]
                },

            });
       

            for (let i = 0; i < typesOfFood.length; i++) {
                let food = document.createElement("h1");
                food.appendChild(document.createTextNode(`- ${typesOfFood[i]}`));
                food.classList.add("food-item")
                foodList.appendChild(food);
            }         

            if (typesOfFood.length > 5) {
               document.getElementById("list-section").style.overflowY = "scroll";
            } else {
                document.getElementById("list-section").style.overflowY = "none";
            }

            let caloriesDisplay = document.getElementById("calories-display");
            caloriesDisplay.textContent = `Calories (${parseFloat(totalCalories).toFixed(2)})`;

            let proteinDisplay = document.getElementById("protein-display");
            proteinDisplay.textContent = `Protein (${parseFloat(nutritionalData.totalProtein).toFixed(2)}g)`;

            let carbsDisplay = document.getElementById("carb-display");
            carbsDisplay.textContent = `Carbs (${parseFloat(nutritionalData.totalCarbs).toFixed(2)}g)`;

            let fatDisplay = document.getElementById("fat-display");
            fatDisplay.textContent = `Fat (${parseFloat(nutritionalData.totalFat).toFixed(2)}g)`;

            let sodiumDisplay = document.getElementById("sodium-display");
            sodiumDisplay.textContent = `Sodium (${parseFloat(nutritionalData.totalSodium).toFixed(2)}g)`;

            let cholDisplay = document.getElementById("chol-display");
            cholDisplay.textContent = `Cholesterol (${parseFloat(nutritionalData.totalCholesterol).toFixed(2)}g)`;

            let sugarDisplay = document.getElementById("sugar-display");
            sugarDisplay.textContent = `Sugar (${parseFloat(nutritionalData.totalSugar).toFixed(2)}g)`;

            let config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "#00237c";
            config1.textColor = "black";
            config1.waveTextColor = "white";
            config1.waveColor = "#00237c";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;
            
            let config2 = liquidFillGaugeDefaultSettings();
            config2.circleColor = "#082342";
            config2.textColor = "black";
            config2.waveTextColor = "white";
            config2.waveColor = "#082342";
            config2.circleThickness = 0.2;
            config2.textVertPosition = 0.2;
            config2.waveAnimateTime = 1000;

            let config3 = liquidFillGaugeDefaultSettings();
            config3.circleColor = "#f3d0b0";
            config3.textColor = "black";
            config3.waveTextColor = "gray";
            config3.waveColor = "#f3d0b0";
            config3.circleThickness = 0.2;
            config3.textVertPosition = 0.2;
            config3.waveAnimateTime = 1000;

            let config4 = liquidFillGaugeDefaultSettings();
            config4.circleColor = "#e2705a";
            config4.textColor = "black";
            config4.waveTextColor = "pink";
            config4.waveColor = "#e2705a";
            config4.circleThickness = 0.2;
            config4.textVertPosition = 0.2;
            config4.waveAnimateTime = 1000;

            let config5 = liquidFillGaugeDefaultSettings();
            config5.circleColor = "#242323";
            config5.textColor = "black";
            config5.waveTextColor = "white";
            config5.waveColor = "#242323";
            config5.circleThickness = 0.2;
            config5.textVertPosition = 0.2;
            config5.waveAnimateTime = 1000;

            let config6 = liquidFillGaugeDefaultSettings();
            config6.circleColor = "#6ca339";
            config6.textColor = "green";
            config6.waveTextColor = "black";
            config6.waveColor = "#6ca339";
            config6.circleThickness = 0.2;
            config6.textVertPosition = 0.2;
            config6.waveAnimateTime = 1000;

            let config7 = liquidFillGaugeDefaultSettings();
            config7.circleColor = "#cde6fd";
            config7.textColor = "black";
            config7.waveTextColor = "blue";
            config7.waveColor = "#cde6fd";
            config7.circleThickness = 0.2;
            config7.textVertPosition = 0.2;
            config7.waveAnimateTime = 1000;
            

            // var config2 = liquidFillGaugeDefaultSettings();

            //update gauge upon new submits
            if (!!gauge1) {

                gauge1.update((totalCalories/2000) * 100)
                gauge2.update((nutritionalData.totalProtein / 50)  * 100)
                gauge3.update((nutritionalData.totalCarbs / 300) * 100)
                gauge4.update((nutritionalData.totalFat / 65) * 100)
                gauge5.update((nutritionalData.totalSodium / 2400) * 100)
                gauge6.update((nutritionalData.totalCholesterol / 300) * 100)
                gauge7.update((nutritionalData.totalSugar / 50) * 100)
            } else {
                gauge1 = loadLiquidFillGauge("calories", (totalCalories / 2000) * 100, config1);
                gauge2 = loadLiquidFillGauge("protein", (nutritionalData.totalProtein / 50) * 100, config2);
                gauge3 = loadLiquidFillGauge("carbs", (nutritionalData.totalCarbs / 300) * 100, config3);
                gauge4 = loadLiquidFillGauge("fats", (nutritionalData.totalFat / 65) * 100, config4);
                gauge5 = loadLiquidFillGauge("sodium", (nutritionalData.totalSodium / 2400) * 100, config5);
                gauge6 = loadLiquidFillGauge("cholesterol", (nutritionalData.totalCholesterol / 300) * 100, config6);
                gauge7 = loadLiquidFillGauge("sugar", (nutritionalData.totalSugar / 50) * 100, config7);
            }
            
            
        })
        .catch(error => {
            // let donut = document.getElementById("nutrition");
            // donut.remove();

            let caloriesDisplay = document.getElementById("calories-display");
            caloriesDisplay.textContent = "";

            let proteinDisplay = document.getElementById("protein-display");
            proteinDisplay.textContent = "";

            let carbsDisplay = document.getElementById("carb-display");
            carbsDisplay.textContent = "";

            let fatDisplay = document.getElementById("fat-display");
            fatDisplay.textContent = "";

            let sodiumDisplay = document.getElementById("sodium-display");
            sodiumDisplay.textContent = "";

            let cholDisplay = document.getElementById("chol-display");
            cholDisplay.textContent = "";

            let sugarDisplay = document.getElementById("sugar-display");
            sugarDisplay.textContent = "";

            let gauges = document.querySelectorAll("svg");

            for (let i = 0; i < gauges.length; i++) {
                while (gauges[i].firstChild) {
                    gauges[i].removeChild(gauges[i].firstChild);
                }
            }

            gauge1 = null;
            gauge2 = null;
            gauge3 = null;
            gauge4 = null;
            gauge5 = null;
            gauge6 = null;
            gauge7 = null

            // let message = document.createElement("h1");
            // message.classList.add("error");
            let input = document.getElementById("formValue").value;
            let message = document.getElementsByClassName("error-message")[0];
            // message.textContent = `No results found in input: "${input}"`;
            // message.textContent = "No available nutrional data, please try again.";
            message.textContent = "No available nutrional data within input, please try again.";
            // message.appendChild(document.createTextNode(`No results found in input: "${input}"`));
            
            // let display = document.getElementsByClassName("nutrition-chart-wrapper")[0];
            // display.appendChild(message);

            document.getElementById("item-list").classList.add("hide-text");
            document.getElementById("list-section").style.overflowY = "none";
        })
  
})
