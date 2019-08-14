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


// import '../assets/stylesheets/css_reset.css';
// import '../assets/stylesheets/application.css';
var chart = null;

document.addEventListener("submit", function (e) {
    chart = null;
    e.preventDefault();
    var formValue = document.getElementById("formValue").value;

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

    // let body = {
    //     "query": "for breakfast i ate 2 eggs, bacon, and french toast",
    //     "timezone": "US/Eastern"
    // };

    postData('https://trackapi.nutritionix.com/v2/natural/nutrients', foodData).then(function (data) {
        var typesOfFood = Object.values(data.foods).map(function (i) {
            return i.food_name;
        });

        var nutritionalData = {
            // totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            totalSodium: 0,
            totalCholesterol: 0,
            totalSugar: 0
        };

        var nutritionTypes = ["Protein", "Carbohydrates", "Fats", "Sodium", "Cholesterol", "Sugar"];

        for (var i = 0; i < data.foods.length; i++) {
            // nutritionalData.totalCalories += data.foods[i].nf_calories;
            nutritionalData.totalCholesterol += data.foods[i].nf_cholesterol;
            nutritionalData.totalProtein += data.foods[i].nf_protein;
            nutritionalData.totalFat += data.foods[i].nf_total_fat;
            nutritionalData.totalSodium += data.foods[i].nf_sodium;
            nutritionalData.totalCarbs += data.foods[i].nf_total_carbohydrate;
            nutritionalData.totalSugar += data.foods[i].nf_sugars;
        }

        debugger;

        var ctx = document.getElementById("polarChart");
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
    }).catch(function (error) {
        // debugger
        return console.log(error);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNoYXJ0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybVZhbHVlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImZvb2REYXRhIiwicG9zdERhdGEiLCJ1cmwiLCJkYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwidHlwZXNPZkZvb2QiLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb29kcyIsIm1hcCIsImkiLCJmb29kX25hbWUiLCJudXRyaXRpb25hbERhdGEiLCJ0b3RhbFByb3RlaW4iLCJ0b3RhbENhcmJzIiwidG90YWxGYXQiLCJ0b3RhbFNvZGl1bSIsInRvdGFsQ2hvbGVzdGVyb2wiLCJ0b3RhbFN1Z2FyIiwibnV0cml0aW9uVHlwZXMiLCJsZW5ndGgiLCJuZl9jaG9sZXN0ZXJvbCIsIm5mX3Byb3RlaW4iLCJuZl90b3RhbF9mYXQiLCJuZl9zb2RpdW0iLCJuZl90b3RhbF9jYXJib2h5ZHJhdGUiLCJuZl9zdWdhcnMiLCJjdHgiLCJDaGFydCIsInR5cGUiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsImhvdmVyQm9yZGVyQ29sb3IiLCJob3ZlckJvcmRlcldpZHRoIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7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Wiw0QkFBZ0JFLFVBQWhCLElBQThCeEIsS0FBS2tCLEtBQUwsQ0FBV0UsQ0FBWCxFQUFjZSxxQkFBNUM7QUFDQWIsNEJBQWdCTSxVQUFoQixJQUE4QjVCLEtBQUtrQixLQUFMLENBQVdFLENBQVgsRUFBY2dCLFNBQTVDO0FBQ0g7O0FBRUQ7O0FBRUEsWUFBSUMsTUFBTS9DLFNBQVNLLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBVjtBQUNBTixnQkFBUSxJQUFJaUQsS0FBSixDQUFVRCxHQUFWLEVBQWU7QUFDbkJFLGtCQUFNLFVBRGE7QUFFbkJ2QyxrQkFBTTtBQUNGd0Msd0JBQVFYLGNBRE47QUFFRlksMEJBQVUsQ0FBQztBQUNQQywyQkFBTyx1QkFEQTtBQUVQMUMsMEJBQU1nQixPQUFPQyxNQUFQLENBQWNLLGVBQWQsQ0FGQztBQUdQcUIscUNBQWlCLENBQ2Isa0JBRGEsRUFFYixtQkFGYSxFQUdiLG9CQUhhLEVBSWIsa0JBSmEsRUFLYixpQkFMYSxFQU1iLGtCQU5hLEVBT2Isc0JBUGEsQ0FIVjtBQVlQQyxpQ0FBYSxDQUNULE1BRFMsRUFFVCxNQUZTLEVBR1QsTUFIUyxFQUlULE1BSlMsRUFLVCxNQUxTLEVBTVQsTUFOUyxFQU9ULE1BUFMsQ0FaTjtBQXFCUEMsaUNBQWEsQ0FyQk47QUFzQlBDLHNDQUFrQixDQUNkLFNBRGMsRUFFZCxTQUZjLEVBR2QsU0FIYyxFQUlkLFNBSmMsRUFLZCxTQUxjLEVBTWQsU0FOYyxFQU9kLFNBUGMsQ0F0Qlg7QUErQlBDLHNDQUFrQjtBQS9CWCxpQkFBRDtBQUZSOztBQUZhLFNBQWYsQ0FBUjtBQXdDSCxLQXJFTCxFQXNFS0MsS0F0RUwsQ0FzRVcsaUJBQVM7QUFDWjtBQUNELGVBQU9DLFFBQVFDLEdBQVIsQ0FBWUMsS0FBWixDQUFQO0FBQ0YsS0F6RUw7QUEwRUgsQ0E1R0QsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGltcG9ydCAnLi4vYXNzZXRzL3N0eWxlc2hlZXRzL2Nzc19yZXNldC5jc3MnO1xuLy8gaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzaGVldHMvYXBwbGljYXRpb24uY3NzJztcbnZhciBjaGFydCA9IG51bGw7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBjaGFydCA9IG51bGw7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBmb3JtVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1WYWx1ZVwiKS52YWx1ZTtcblxuICAgIGxldCBmb29kRGF0YSA9IHtcbiAgICAgICAgXCJxdWVyeVwiOiBmb3JtVmFsdWUsXG4gICAgICAgIFwidGltZXpvbmVcIjpcIlVTL0Vhc3Rlcm5cIlxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwb3N0RGF0YSh1cmwgPSAnJywgZGF0YSA9IHt9KSB7XG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICAgICAgY2FjaGU6ICduby1jYWNoZScsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIFwieC1hcHAtaWRcIjogXCJjNjM1NjY5NFwiLFxuICAgICAgICAgICAgICAgIFwieC1hcHAta2V5XCI6IFwiMDcyNjBmOGU4ZTUyYTQ0M2YyY2IxMThkODFlZmU2ZDRcIixcbiAgICAgICAgICAgICAgICBcIngtcmVtb3RlLXVzZXItaWRcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZGlyZWN0OiAnZm9sbG93JyxcbiAgICAgICAgICAgIHJlZmVycmVyOiAnbm8tcmVmZXJyZXInLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cblxuICAgIC8vIGxldCBib2R5ID0ge1xuICAgIC8vICAgICBcInF1ZXJ5XCI6IFwiZm9yIGJyZWFrZmFzdCBpIGF0ZSAyIGVnZ3MsIGJhY29uLCBhbmQgZnJlbmNoIHRvYXN0XCIsXG4gICAgLy8gICAgIFwidGltZXpvbmVcIjogXCJVUy9FYXN0ZXJuXCJcbiAgICAvLyB9O1xuXG4gICAgcG9zdERhdGEoJ2h0dHBzOi8vdHJhY2thcGkubnV0cml0aW9uaXguY29tL3YyL25hdHVyYWwvbnV0cmllbnRzJywgZm9vZERhdGEpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmFyIHR5cGVzT2ZGb29kID0gT2JqZWN0LnZhbHVlcyhkYXRhLmZvb2RzKS5tYXAoaSA9PiBpLmZvb2RfbmFtZSk7XG5cbiAgICAgICAgICAgIGxldCBudXRyaXRpb25hbERhdGEgPSB7XG4gICAgICAgICAgICAgICAgLy8gdG90YWxDYWxvcmllczogMCxcbiAgICAgICAgICAgICAgICB0b3RhbFByb3RlaW46IDAsXG4gICAgICAgICAgICAgICAgdG90YWxDYXJiczogMCxcbiAgICAgICAgICAgICAgICB0b3RhbEZhdDogMCxcbiAgICAgICAgICAgICAgICB0b3RhbFNvZGl1bTogMCxcbiAgICAgICAgICAgICAgICB0b3RhbENob2xlc3Rlcm9sOiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsU3VnYXI6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG51dHJpdGlvblR5cGVzID0gW1wiUHJvdGVpblwiLCBcIkNhcmJvaHlkcmF0ZXNcIiwgXCJGYXRzXCIsIFwiU29kaXVtXCIsIFwiQ2hvbGVzdGVyb2xcIiwgXCJTdWdhclwiXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZvb2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gbnV0cml0aW9uYWxEYXRhLnRvdGFsQ2Fsb3JpZXMgKz0gZGF0YS5mb29kc1tpXS5uZl9jYWxvcmllcztcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxDaG9sZXN0ZXJvbCArPSBkYXRhLmZvb2RzW2ldLm5mX2Nob2xlc3Rlcm9sO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbFByb3RlaW4gKz0gZGF0YS5mb29kc1tpXS5uZl9wcm90ZWluO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbEZhdCArPSBkYXRhLmZvb2RzW2ldLm5mX3RvdGFsX2ZhdDtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxTb2RpdW0gKz0gZGF0YS5mb29kc1tpXS5uZl9zb2RpdW07XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsQ2FyYnMgKz0gZGF0YS5mb29kc1tpXS5uZl90b3RhbF9jYXJib2h5ZHJhdGU7XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsU3VnYXIgKz0gZGF0YS5mb29kc1tpXS5uZl9zdWdhcnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgICAgIGxldCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvbGFyQ2hhcnRcIik7XG4gICAgICAgICAgICBjaGFydCA9IG5ldyBDaGFydChjdHgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZG91Z2hudXQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBudXRyaXRpb25UeXBlcyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ051dHJpdGlvbmFsIEJyZWFrZG93bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBPYmplY3QudmFsdWVzKG51dHJpdGlvbmFsRGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgyNTUsMCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMTAwLDUwLDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgwLDEwMCwxMDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgxNTAsMCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMCw1MCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMCwwLDIwMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDEwMCwxMDAsMTAwLC43KSdcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyQm9yZGVyQ29sb3I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJCb3JkZXJXaWR0aDogMlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSkgICAgXG59KSJdLCJzb3VyY2VSb290IjoiIn0=