// import '../assets/stylesheets/css_reset.css';
// import '../assets/stylesheets/application.css';
var chart = null;

document.addEventListener("submit", (e) => {
    chart = null;
    e.preventDefault();
    let formValue = document.getElementById("formValue").value;

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

    // let body = {
    //     "query": "for breakfast i ate 2 eggs, bacon, and french toast",
    //     "timezone": "US/Eastern"
    // };

    postData('https://trackapi.nutritionix.com/v2/natural/nutrients', foodData)
        .then(data => {
            var typesOfFood = Object.values(data.foods).map(i => i.food_name);

            let nutritionalData = {
                // totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                totalSodium: 0,
                totalCholesterol: 0,
                totalSugar: 0
            }
            
            let nutritionTypes = ["Protein", "Carbohydrates", "Fats", "Sodium", "Cholesterol", "Sugar"];

            for (let i = 0; i < data.foods.length; i++) {
                // nutritionalData.totalCalories += data.foods[i].nf_calories;
                nutritionalData.totalCholesterol += data.foods[i].nf_cholesterol;
                nutritionalData.totalProtein += data.foods[i].nf_protein;
                nutritionalData.totalFat += data.foods[i].nf_total_fat;
                nutritionalData.totalSodium += data.foods[i].nf_sodium;
                nutritionalData.totalCarbs += data.foods[i].nf_total_carbohydrate;
                nutritionalData.totalSugar += data.foods[i].nf_sugars;
            }

            debugger

            let ctx = document.getElementById("polarChart");
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
        })
        .catch(error => {
            // debugger
           return console.log(error);
        })    
})
