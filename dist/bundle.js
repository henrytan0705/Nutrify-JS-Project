/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var chart = null;
// var gauge1 = null;

document.addEventListener("submit", function (e) {
    if (chart !== null) chart.destroy();

    // if (gauge1 !== null) {
    //     gauge1 = null;
    //     // gauge1.destroy();
    // }

    e.preventDefault();
    var formValue = document.getElementById("formValue").value;
    var foodList = document.getElementById("food");
    // let gauges = document.getElementById("gauges");

    while (foodList.firstChild) {
        foodList.removeChild(foodList.firstChild);
    }

    // while (gauges.firstChild) {

    //     gauges.removeChild(gauges.firstChild);
    // }

    var foodData = {
        "query": formValue,
        "timezone": "US/Eastern"
    };

    function postData() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        });
    }

    var typesOfFood = void 0;

    postData('https://trackapi.nutritionix.com/v2/natural/nutrients', foodData).then(function (data) {
        typesOfFood = Object.values(data.foods).map(function (i) {
            return i.food_name;
        });
        var totalCalories = 0;
        var nutritionTypes = ["Protein", "Carbohydrates", "Fats", "Sodium", "Cholesterol", "Sugar"];
        var nutritionalData = {
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            totalSodium: 0,
            totalCholesterol: 0,
            totalSugar: 0

 
        };for (var i = 0; i < data.foods.length; i++) {
            totalCalories += data.foods[i].nf_calories;
            nutritionalData.totalCholesterol += data.foods[i].nf_cholesterol;
            nutritionalData.totalProtein += data.foods[i].nf_protein;
            nutritionalData.totalFat += data.foods[i].nf_total_fat;
            nutritionalData.totalSodium += data.foods[i].nf_sodium;
            nutritionalData.totalCarbs += data.foods[i].nf_total_carbohydrate;
            nutritionalData.totalSugar += data.foods[i].nf_sugars;
        }

        var ctx = document.getElementById("nutrition");
        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: nutritionTypes,
                datasets: [{
                    label: 'Nutritional Breakdown',
                    data: Object.values(nutritionalData),
                    backgroundColor: ['rgba(255,0,0,.7)', 'rgba(100,50,0,.7)', 'rgba(0,100,100,.7)', 'rgba(150,0,0,.7)', 'rgba(0,50,0,.7)', 'rgba(0,0,200,.7)', 'rgba(100,100,100,.7)'],
                    borderColor: ['#000', '#000', '#000', '#000', '#000', '#000', '#000'],
                    borderWidth: 0,
                    hoverBorderColor: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
                    hoverBorderWidth: 2
                }]
            }

        });

        // let foodList = document.getElementById("food");

        for (var _i = 0; _i < typesOfFood.length; _i++) {
            var food = document.createElement("h1");
            food.appendChild(document.createTextNode("" + typesOfFood[_i]));
            food.classList.add("food-item");
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


        var config1 = liquidFillGaugeDefaultSettings();
        config1.circleColor = "lightblue";
        config1.textColor = "#FF4444";
        config1.waveTextColor = "#FFAAAA";
        config1.waveColor = "lightblue";
        config1.circleThickness = 0.2;
        config1.textVertPosition = 0.2;
        config1.waveAnimateTime = 1000;

        var gauge1 = loadLiquidFillGauge("calories", totalCalories / 2000 * 100, config1);
        // var config2 = liquidFillGaugeDefaultSettings();
    }).catch(function (error) {
        return console.log(error);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNoYXJ0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRlc3Ryb3kiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1WYWx1ZSIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJmb29kTGlzdCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImZvb2REYXRhIiwicG9zdERhdGEiLCJ1cmwiLCJkYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwidHlwZXNPZkZvb2QiLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb29kcyIsIm1hcCIsImkiLCJmb29kX25hbWUiLCJ0b3RhbENhbG9yaWVzIiwibnV0cml0aW9uVHlwZXMiLCJudXRyaXRpb25hbERhdGEiLCJ0b3RhbFByb3RlaW4iLCJ0b3RhbENhcmJzIiwidG90YWxGYXQiLCJ0b3RhbFNvZGl1bSIsInRvdGFsQ2hvbGVzdGVyb2wiLCJ0b3RhbFN1Z2FyIiwibGVuZ3RoIiwibmZfY2Fsb3JpZXMiLCJuZl9jaG9sZXN0ZXJvbCIsIm5mX3Byb3RlaW4iLCJuZl90b3RhbF9mYXQiLCJuZl9zb2RpdW0iLCJuZl90b3RhbF9jYXJib2h5ZHJhdGUiLCJuZl9zdWdhcnMiLCJjdHgiLCJDaGFydCIsInR5cGUiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsImhvdmVyQm9yZGVyQ29sb3IiLCJob3ZlckJvcmRlcldpZHRoIiwiZm9vZCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uZmlnMSIsImxpcXVpZEZpbGxHYXVnZURlZmF1bHRTZXR0aW5ncyIsImNpcmNsZUNvbG9yIiwidGV4dENvbG9yIiwid2F2ZVRleHRDb2xvciIsIndhdmVDb2xvciIsImNpcmNsZVRoaWNrbmVzcyIsInRleHRWZXJ0UG9zaXRpb24iLCJ3YXZlQW5pbWF0ZVRpbWUiLCJnYXVnZTEiLCJsb2FkTGlxdWlkRmlsbEdhdWdlIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJQSxRQUFRLElBQVo7QUFDQTs7QUFFQUMsU0FBU0MsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3ZDLFFBQUlILFVBQVUsSUFBZCxFQUFvQkEsTUFBTUksT0FBTjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUQsTUFBRUUs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QixHQUEzQjtBQUNBUCxnQkFBUVEsZUFBUixHQUEwQixJQUExQjs7QUFFQSxZQUFJQyxTQUFTQyxvQkFBb0IsVUFBcEIsRUFBaUM1QyxnQkFBZ0IsSUFBakIsR0FBeUIsR0FBekQsRUFBOERrQyxPQUE5RCxDQUFiO0FBQ0E7O0FBRUE7QUFDSCxLQXJHTCxFQXNHS1csS0F0R0wsQ0FzR1csaUJBQVM7QUFDYixlQUFPQyxRQUFRQyxHQUFSLENBQVlDLEtBQVosQ0FBUDtBQUNGLEtBeEdMO0FBMEdILENBNUpELEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJ2YXIgY2hhcnQgPSBudWxsO1xuLy8gdmFyIGdhdWdlMSA9IG51bGw7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBpZiAoY2hhcnQgIT09IG51bGwpIGNoYXJ0LmRlc3Ryb3koKTtcblxuICAgIC8vIGlmIChnYXVnZTEgIT09IG51bGwpIHtcbiAgICAvLyAgICAgZ2F1Z2UxID0gbnVsbDtcbiAgICAvLyAgICAgZGVidWdnZXJcbiAgICAvLyAgICAgLy8gZ2F1Z2UxLmRlc3Ryb3koKTtcbiAgICAvLyB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IGZvcm1WYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybVZhbHVlXCIpLnZhbHVlO1xuICAgIGxldCBmb29kTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vZFwiKTtcbiAgICAvLyBsZXQgZ2F1Z2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYXVnZXNcIik7XG5cbiAgICB3aGlsZSAoZm9vZExpc3QuZmlyc3RDaGlsZCkge1xuICAgICAgICBmb29kTGlzdC5yZW1vdmVDaGlsZChmb29kTGlzdC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgLy8gZGVidWdnZXJcblxuICAgIC8vIHdoaWxlIChnYXVnZXMuZmlyc3RDaGlsZCkge1xuICAgIC8vICAgICAvLyBkZWJ1Z2dlclxuICAgIC8vICAgICBnYXVnZXMucmVtb3ZlQ2hpbGQoZ2F1Z2VzLmZpcnN0Q2hpbGQpO1xuICAgIC8vIH1cblxuICAgIGxldCBmb29kRGF0YSA9IHtcbiAgICAgICAgXCJxdWVyeVwiOiBmb3JtVmFsdWUsXG4gICAgICAgIFwidGltZXpvbmVcIjpcIlVTL0Vhc3Rlcm5cIlxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwb3N0RGF0YSh1cmwgPSAnJywgZGF0YSA9IHt9KSB7XG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICAgICAgY2FjaGU6ICduby1jYWNoZScsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIFwieC1hcHAtaWRcIjogXCJjNjM1NjY5NFwiLFxuICAgICAgICAgICAgICAgIFwieC1hcHAta2V5XCI6IFwiMDcyNjBmOGU4ZTUyYTQ0M2YyY2IxMThkODFlZmU2ZDRcIixcbiAgICAgICAgICAgICAgICBcIngtcmVtb3RlLXVzZXItaWRcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZGlyZWN0OiAnZm9sbG93JyxcbiAgICAgICAgICAgIHJlZmVycmVyOiAnbm8tcmVmZXJyZXInLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cblxuICAgIGxldCB0eXBlc09mRm9vZDtcblxuICAgIHBvc3REYXRhKCdodHRwczovL3RyYWNrYXBpLm51dHJpdGlvbml4LmNvbS92Mi9uYXR1cmFsL251dHJpZW50cycsIGZvb2REYXRhKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHR5cGVzT2ZGb29kID0gT2JqZWN0LnZhbHVlcyhkYXRhLmZvb2RzKS5tYXAoaSA9PiBpLmZvb2RfbmFtZSk7XG4gICAgICAgICAgICBsZXQgdG90YWxDYWxvcmllcyA9IDA7IFxuICAgICAgICAgICAgbGV0IG51dHJpdGlvblR5cGVzID0gW1wiUHJvdGVpblwiLCBcIkNhcmJvaHlkcmF0ZXNcIiwgXCJGYXRzXCIsIFwiU29kaXVtXCIsIFwiQ2hvbGVzdGVyb2xcIiwgXCJTdWdhclwiXTtcbiAgICAgICAgICAgIGxldCBudXRyaXRpb25hbERhdGEgPSB7XG4gICAgICAgICAgICAgICAgdG90YWxQcm90ZWluOiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsQ2FyYnM6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxGYXQ6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxTb2RpdW06IDAsXG4gICAgICAgICAgICAgICAgdG90YWxDaG9sZXN0ZXJvbDogMCxcbiAgICAgICAgICAgICAgICB0b3RhbFN1Z2FyOiAwXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZm9vZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0b3RhbENhbG9yaWVzICs9IGRhdGEuZm9vZHNbaV0ubmZfY2Fsb3JpZXM7XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsQ2hvbGVzdGVyb2wgKz0gZGF0YS5mb29kc1tpXS5uZl9jaG9sZXN0ZXJvbDtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxQcm90ZWluICs9IGRhdGEuZm9vZHNbaV0ubmZfcHJvdGVpbjtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxGYXQgKz0gZGF0YS5mb29kc1tpXS5uZl90b3RhbF9mYXQ7XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsU29kaXVtICs9IGRhdGEuZm9vZHNbaV0ubmZfc29kaXVtO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbENhcmJzICs9IGRhdGEuZm9vZHNbaV0ubmZfdG90YWxfY2FyYm9oeWRyYXRlO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbFN1Z2FyICs9IGRhdGEuZm9vZHNbaV0ubmZfc3VnYXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJudXRyaXRpb25cIik7XG4gICAgICAgICAgICBjaGFydCA9IG5ldyBDaGFydChjdHgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZG91Z2hudXQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBudXRyaXRpb25UeXBlcyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ051dHJpdGlvbmFsIEJyZWFrZG93bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBPYmplY3QudmFsdWVzKG51dHJpdGlvbmFsRGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgyNTUsMCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMTAwLDUwLDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgwLDEwMCwxMDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgxNTAsMCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMCw1MCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMCwwLDIwMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDEwMCwxMDAsMTAwLC43KSdcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyQm9yZGVyQ29sb3I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJCb3JkZXJXaWR0aDogMlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxldCBmb29kTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vZFwiKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlc09mRm9vZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBmb29kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAgICAgIGZvb2QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7dHlwZXNPZkZvb2RbaV19YCkpO1xuICAgICAgICAgICAgICAgIGZvb2QuY2xhc3NMaXN0LmFkZChcImZvb2QtaXRlbVwiKVxuICAgICAgICAgICAgICAgIGZvb2RMaXN0LmFwcGVuZENoaWxkKGZvb2QpO1xuXG4gICAgICAgICAgICAgICAgLy8gbGV0IGdhdWdlQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIik7XG4gICAgICAgICAgICAgICAgLy8gZ2F1Z2VBLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3R5cGVzT2ZGb29kW2ldfWApXG4gICAgICAgICAgICAgICAgLy8gZ2F1Z2VzLmFwcGVuZENoaWxkKGdhdWdlQSk7XG4gICAgICAgICAgICB9ICAgICAgICAgXG5cbiAgICAgICAgICAgIC8vIGxldCBnYXVnZUEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3ZnXCIpO1xuICAgICAgICAgICAgLy8gZ2F1Z2VBLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2Fsb3JpZXNcIik7XG4gICAgICAgICAgICAvLyBnYXVnZUEuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjUwcHhcIik7XG4gICAgICAgICAgICAvLyBnYXVnZUEuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIyMCVcIik7XG4gICAgICAgICAgICAvLyBnYXVnZXMuYXBwZW5kQ2hpbGQoZ2F1Z2VBKTtcblxuICAgICAgICAgICAgLy8gZGVidWdnZXJcblxuICAgICAgICAgICAgbGV0IGNvbmZpZzEgPSBsaXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MoKTtcbiAgICAgICAgICAgIGNvbmZpZzEuY2lyY2xlQ29sb3IgPSBcImxpZ2h0Ymx1ZVwiO1xuICAgICAgICAgICAgY29uZmlnMS50ZXh0Q29sb3IgPSBcIiNGRjQ0NDRcIjtcbiAgICAgICAgICAgIGNvbmZpZzEud2F2ZVRleHRDb2xvciA9IFwiI0ZGQUFBQVwiO1xuICAgICAgICAgICAgY29uZmlnMS53YXZlQ29sb3IgPSBcImxpZ2h0Ymx1ZVwiO1xuICAgICAgICAgICAgY29uZmlnMS5jaXJjbGVUaGlja25lc3MgPSAwLjI7XG4gICAgICAgICAgICBjb25maWcxLnRleHRWZXJ0UG9zaXRpb24gPSAwLjI7XG4gICAgICAgICAgICBjb25maWcxLndhdmVBbmltYXRlVGltZSA9IDEwMDA7XG5cbiAgICAgICAgICAgIGxldCBnYXVnZTEgPSBsb2FkTGlxdWlkRmlsbEdhdWdlKFwiY2Fsb3JpZXNcIiwgKHRvdGFsQ2Fsb3JpZXMgLyAyMDAwKSAqIDEwMCwgY29uZmlnMSk7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB2YXIgY29uZmlnMiA9IGxpcXVpZEZpbGxHYXVnZURlZmF1bHRTZXR0aW5ncygpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KVxuICBcbn0pXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=