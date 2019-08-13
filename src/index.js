// import '../assets/stylesheets/css_reset.css';
// import '../assets/stylesheets/application.css';

document.addEventListener("click", (e) => {
    e.preventDefault();

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
    let foodData;
    
    postData('https://api.edamam.com/api/nutrition-details?app_id=2933ad3c&app_key=2b27a8fdec1d51e05cca6a634d8e9204', {
        "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
        // "prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
        // "yield": "About 15 servings",
        // "yield": "About 1 serving",
        "ingr": [
            "1 fresh ham, about 1 pound",
            // "7 cloves garlic, minced",
            // "1 tablespoon caraway seeds, crushed",
            "4 teaspoons salt",
            // "Freshly ground pepper to taste",
            // "1 teaspoon olive oil",
            // "1 medium onion, peeled and chopped",
            // "3 cups sourdough rye bread, cut into 1/2-inch cubes",
            // "1 1/4 cups coarsely chopped pitted prunes",
            // "1 1/4 cups coarsely chopped dried apricots",
            // "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
            // "2 teaspoons chopped fresh rosemary",
            // "1 egg, lightly beaten",
            // "1 cup chicken broth, homemade or low-sodium canned"
        ]
    })
        .then(data => {
            debugger
            return console.log(JSON.stringify(data))
        })
        .catch(error => {
            debugger
           return console.error(error())
        })
})