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

document.addEventListener("submit", function (e) {
    if (chart !== null) chart.destroy();

    e.preventDefault();
    var formValue = document.getElementById("formValue").value;
    var foodList = document.getElementById("food");

    while (foodList.firstChild) {
        foodList.removeChild(foodList.firstChild);
    }

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
        };

        for (var i = 0; i < data.foods.length; i++) {
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
        }

        var gauge1 = loadLiquidFillGauge("calories", totalCalories / 2000 * 100);
        var config1 = liquidFillGaugeDefaultSettings();
        // debugger
        config1.circleColor = "#FF7777";
        config1.textColor = "#FF4444";
        config1.waveTextColor = "#FFAAAA";
        config1.waveColor = "#FFDDDD";
        config1.circleThickness = 0.2;
        config1.textVertPosition = 0.2;
        config1.waveAnimateTime = 1000;
        var gauge2 = loadLiquidFillGauge("protein", 28, config1);
        // var config2 = liquidFillGaugeDefaultSettings();
    }).catch(function (error) {
        return console.log(error);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNoYXJ0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRlc3Ryb3kiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1WYWx1ZSIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJmb29kTGlzdCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImZvb2REYXRhIiwicG9zdERhdGEiLCJ1cmwiLCJkYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwidHlwZXNPZkZvb2QiLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb29kcyIsIm1hcCIsImkiLCJmb29kX25hbWUiLCJ0b3RhbENhbG9yaWVzIiwibnV0cml0aW9uVHlwZXMiLCJudXRyaXRpb25hbERhdGEiLCJ0b3RhbFByb3RlaW4iLCJ0b3RhbENhcmJzIiwidG90YWxGYXQiLCJ0b3RhbFNvZGl1bSIsInRvdGFsQ2hvbGVzdGVyb2wiLCJ0b3RhbFN1Z2FyIiwibGVuZ3RoIiwibmZfY2Fsb3JpZXMiLCJuZl9jaG9sZXN0ZXJvbCIsIm5mX3Byb3RlaW4iLCJuZl90b3RhbF9mYXQiLCJuZl9zb2RpdW0iLCJuZl90b3RhbF9jYXJib2h5ZHJhdGUiLCJuZl9zdWdhcnMiLCJjdHgiLCJDaGFydCIsInR5cGUiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsImhvdmVyQm9yZGVyQ29sb3IiLCJob3ZlckJvcmRlcldpZHRoIiwiZm9vZCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiY2xhc3NMaXN0IiwiYWRkIiwiZ2F1Z2UxIiwibG9hZExpcXVpZEZpbGxHYXVnZSIsImNvbmZpZzEiLCJsaXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MiLCJjaXJjbGVDb2xvciIsInRleHRDb2xvciIsIndhdmVUZXh0Q29sb3IiLCJ3YXZlQ29sb3IiLCJjaXJjbGVUaGlja25lc3MiLCJ0ZXh0VmVydFBvc2l0aW9uIiwid2F2ZUFuaW1hdGVUaW1lIiwiZ2F1Z2UyIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJQSxRQUFRLElBQVo7O0FBRUFDLFNBQVNDLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLFVBQUNDLENBQUQsRUFBTztBQUN2QyxRQUFJSCxVQUFVLElBQWQsRUFBb0JBLE1BQU1JLE9BQU47O0FBRXBCRCxNQUFFRSxjQUFGO0FBQ0EsUUFBSUMsWUFBWUws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MUI7QUFDQSxZQUFJQyxTQUFTVixvQkFBb0IsU0FBcEIsRUFBK0IsRUFBL0IsRUFBbUNDLE9BQW5DLENBQWI7QUFDQTtBQUNILEtBdkZMLEVBd0ZLVSxLQXhGTCxDQXdGVyxpQkFBUztBQUNiLGVBQU9DLFFBQVFDLEdBQVIsQ0FBWUMsS0FBWixDQUFQO0FBQ0YsS0ExRkw7QUErRkgsQ0FwSUQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciBjaGFydCA9IG51bGw7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBpZiAoY2hhcnQgIT09IG51bGwpIGNoYXJ0LmRlc3Ryb3koKTtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgZm9ybVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtVmFsdWVcIikudmFsdWU7XG4gICAgbGV0IGZvb2RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb29kXCIpO1xuXG4gICAgd2hpbGUgKGZvb2RMaXN0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZm9vZExpc3QucmVtb3ZlQ2hpbGQoZm9vZExpc3QuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgbGV0IGZvb2REYXRhID0ge1xuICAgICAgICBcInF1ZXJ5XCI6IGZvcm1WYWx1ZSxcbiAgICAgICAgXCJ0aW1lem9uZVwiOlwiVVMvRWFzdGVyblwiXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBvc3REYXRhKHVybCA9ICcnLCBkYXRhID0ge30pIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICBjYWNoZTogJ25vLWNhY2hlJyxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgXCJ4LWFwcC1pZFwiOiBcImM2MzU2Njk0XCIsXG4gICAgICAgICAgICAgICAgXCJ4LWFwcC1rZXlcIjogXCIwNzI2MGY4ZThlNTJhNDQzZjJjYjExOGQ4MWVmZTZkNFwiLFxuICAgICAgICAgICAgICAgIFwieC1yZW1vdGUtdXNlci1pZFwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnLFxuICAgICAgICAgICAgcmVmZXJyZXI6ICduby1yZWZlcnJlcicsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfVxuXG4gICAgbGV0IHR5cGVzT2ZGb29kO1xuXG4gICAgcG9zdERhdGEoJ2h0dHBzOi8vdHJhY2thcGkubnV0cml0aW9uaXguY29tL3YyL25hdHVyYWwvbnV0cmllbnRzJywgZm9vZERhdGEpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdHlwZXNPZkZvb2QgPSBPYmplY3QudmFsdWVzKGRhdGEuZm9vZHMpLm1hcChpID0+IGkuZm9vZF9uYW1lKTtcbiAgICAgICAgICAgIGxldCB0b3RhbENhbG9yaWVzID0gMDsgXG4gICAgICAgICAgICBsZXQgbnV0cml0aW9uVHlwZXMgPSBbXCJQcm90ZWluXCIsIFwiQ2FyYm9oeWRyYXRlc1wiLCBcIkZhdHNcIiwgXCJTb2RpdW1cIiwgXCJDaG9sZXN0ZXJvbFwiLCBcIlN1Z2FyXCJdO1xuICAgICAgICAgICAgbGV0IG51dHJpdGlvbmFsRGF0YSA9IHtcbiAgICAgICAgICAgICAgICB0b3RhbFByb3RlaW46IDAsXG4gICAgICAgICAgICAgICAgdG90YWxDYXJiczogMCxcbiAgICAgICAgICAgICAgICB0b3RhbEZhdDogMCxcbiAgICAgICAgICAgICAgICB0b3RhbFNvZGl1bTogMCxcbiAgICAgICAgICAgICAgICB0b3RhbENob2xlc3Rlcm9sOiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsU3VnYXI6IDBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZvb2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdG90YWxDYWxvcmllcyArPSBkYXRhLmZvb2RzW2ldLm5mX2NhbG9yaWVzO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbENob2xlc3Rlcm9sICs9IGRhdGEuZm9vZHNbaV0ubmZfY2hvbGVzdGVyb2w7XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsUHJvdGVpbiArPSBkYXRhLmZvb2RzW2ldLm5mX3Byb3RlaW47XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsRmF0ICs9IGRhdGEuZm9vZHNbaV0ubmZfdG90YWxfZmF0O1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbFNvZGl1bSArPSBkYXRhLmZvb2RzW2ldLm5mX3NvZGl1bTtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxDYXJicyArPSBkYXRhLmZvb2RzW2ldLm5mX3RvdGFsX2NhcmJvaHlkcmF0ZTtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxTdWdhciArPSBkYXRhLmZvb2RzW2ldLm5mX3N1Z2FycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnV0cml0aW9uXCIpO1xuICAgICAgICAgICAgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2RvdWdobnV0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogbnV0cml0aW9uVHlwZXMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdOdXRyaXRpb25hbCBCcmVha2Rvd24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogT2JqZWN0LnZhbHVlcyhudXRyaXRpb25hbERhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMjU1LDAsMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDEwMCw1MCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMCwxMDAsMTAwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMTUwLDAsMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDAsNTAsMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDAsMCwyMDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgxMDAsMTAwLDEwMCwuNyknXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBob3ZlckJvcmRlckNvbG9yOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyQm9yZGVyV2lkdGg6IDJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBsZXQgZm9vZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvb2RcIik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXNPZkZvb2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICAgICAgICBmb29kLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke3R5cGVzT2ZGb29kW2ldfWApKTtcbiAgICAgICAgICAgICAgICBmb29kLmNsYXNzTGlzdC5hZGQoXCJmb29kLWl0ZW1cIilcbiAgICAgICAgICAgICAgICBmb29kTGlzdC5hcHBlbmRDaGlsZChmb29kKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGxldCBnYXVnZTEgPSBsb2FkTGlxdWlkRmlsbEdhdWdlKFwiY2Fsb3JpZXNcIiwgKHRvdGFsQ2Fsb3JpZXMvIDIwMDApICogMTAwKVxuICAgICAgICAgICAgbGV0IGNvbmZpZzEgPSBsaXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MoKTtcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgICBjb25maWcxLmNpcmNsZUNvbG9yID0gXCIjRkY3Nzc3XCI7XG4gICAgICAgICAgICBjb25maWcxLnRleHRDb2xvciA9IFwiI0ZGNDQ0NFwiO1xuICAgICAgICAgICAgY29uZmlnMS53YXZlVGV4dENvbG9yID0gXCIjRkZBQUFBXCI7XG4gICAgICAgICAgICBjb25maWcxLndhdmVDb2xvciA9IFwiI0ZGRERERFwiO1xuICAgICAgICAgICAgY29uZmlnMS5jaXJjbGVUaGlja25lc3MgPSAwLjI7XG4gICAgICAgICAgICBjb25maWcxLnRleHRWZXJ0UG9zaXRpb24gPSAwLjI7XG4gICAgICAgICAgICBjb25maWcxLndhdmVBbmltYXRlVGltZSA9IDEwMDA7XG4gICAgICAgICAgICBsZXQgZ2F1Z2UyID0gbG9hZExpcXVpZEZpbGxHYXVnZShcInByb3RlaW5cIiwgMjgsIGNvbmZpZzEpO1xuICAgICAgICAgICAgLy8gdmFyIGNvbmZpZzIgPSBsaXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgICAgIFxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=