var chart = null;
// var gauge1 = null;

document.addEventListener("submit", (e) => {
    if (chart !== null) chart.destroy();

    // if (gauge1 !== null) {
    //     gauge1 = null;
    //     debugger
    //     // gauge1.destroy();
    // }

    e.preventDefault();
    let formValue = document.getElementById("formValue").value;
    let foodList = document.getElementById("food");
    // let gauges = document.getElementById("gauges");

    while (foodList.firstChild) {
        foodList.removeChild(foodList.firstChild);
    }
    // debugger

    // while (gauges.firstChild) {
    //     // debugger
    //     gauges.removeChild(gauges.firstChild);
    // }

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

            // debugger
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
                            'rgba(255,0,0,.7)',
                            'rgba(100,50,0,.7)',
                            'rgba(0,100,100,.7)',
                            'rgba(150,0,0,.7)',
                            'rgba(0,50,0,.7)',
                            'rgba(0,0,200,.7)',
                            'rgba(100,100,100,.7)'
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

        // let foodList = document.getElementById("food");

            for (let i = 0; i < typesOfFood.length; i++) {
                let food = document.createElement("h1");
                food.appendChild(document.createTextNode(`${typesOfFood[i]}`));
                food.classList.add("food-item")
                foodList.appendChild(food);

                // let gaugeA = document.createElement("svg");
                // gaugeA.setAttribute("id", `${typesOfFood[i]}`)
                // gauges.appendChild(gaugeA);
            }         

            // let gaugeA = document.createElement("svg");
            // gaugeA.setAttribute("id", "calories");
            // gaugeA.setAttribute("height", "250px");
            // gaugeA.setAttribute("width", "20%");
            // gauges.appendChild(gaugeA);

            // debugger

            let config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "lightblue";
            config1.textColor = "#FF4444";
            config1.waveTextColor = "#FFAAAA";
            config1.waveColor = "lightblue";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;

            let gauge1 = loadLiquidFillGauge("calories", (totalCalories / 2000) * 100, config1);
            // debugger
            
            // var config2 = liquidFillGaugeDefaultSettings();
        })
        .catch(error => {
           return console.log(error);
        })
  
})

