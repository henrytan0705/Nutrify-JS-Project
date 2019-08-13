// import '../assets/stylesheets/css_reset.css';
// import '../assets/stylesheets/application.css';
var chart = null;

document.addEventListener("submit", (e) => {
    e.preventDefault();

    let formValue = document.getElementById("formValue").value;
    
    let parsedData = {
        "title": "",
        "ingr":[formValue]
    };

    function postData(url = '', data = {}) {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data),
        })
            .then(response => response.json());
    }

    postData('https://api.edamam.com/api/nutrition-details?app_id=2933ad3c&app_key=2b27a8fdec1d51e05cca6a634d8e9204', parsedData)
        .then(data => {
            // debugger
            let nutritionTypes = Object.values(data.totalNutrients).map(i => i.label)
            let nutritionQuantity = Object.values(data.totalNutrients).map(i => i.quantity);
            if (chart !== null) chart.destroy();

            let ctx = document.getElementById("polarChart");
            chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: nutritionTypes,
                    datasets: [{
                        label: 'Nutritional Breakdown',
                        data: nutritionQuantity,
                        backgroundColor: [
                            'rgba(255,0,0,.7)',
                            'rgba(100,50,0,.7)',
                            'rgba(0,100,100,.7)',
                            'rgba(150,0,0,.7)',
                            'rgba(0,50,0,.7)',
                            'rgba(0,0,200,.7)',
                            'rgba(255,0,0,.7)',
                            'rgba(100,50,0,.7)',
                            'rgba(0,100,100,.7)',
                            'rgba(150,0,0,.7)',
                            'rgba(0,50,0,.7)',
                            'rgba(0,0,200,.7)',
                            'rgba(255,0,0,.7)',
                            'rgba(100,50,0,.7)',
                            'rgba(0,100,100,.7)',
                            'rgba(150,0,0,.7)',
                            'rgba(0,50,0,.7)',
                            'rgba(0,0,200,.7)',
                            'rgba(255,0,0,.7)',
                            'rgba(100,50,0,.7)',
                            'rgba(0,100,100,.7)',
                            'rgba(150,0,0,.7)',
                            'rgba(0,50,0,.7)',
                            'rgba(0,0,200,.7)',
                        ],
                        borderColor: [
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000',
                            '#000'
                     
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
                            '#000000',
                            '#000000',
                            '#000000',
                            '#000000',
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
            debugger
           return console.error(error())
        })



    // debugger

    
    
})