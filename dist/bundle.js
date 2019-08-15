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

    // let body = {
    //     "query": "for breakfast i ate 2 eggs, bacon, and french toast",
    //     "timezone": "US/Eastern"
    // };

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

        // debugger

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
            // console.log(food);
            foodList.appendChild(food);
        }
    }).catch(function (error) {
        // debugger
        return console.log(error);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNoYXJ0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybVZhbHVlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImZvb2RMaXN0IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZm9vZERhdGEiLCJwb3N0RGF0YSIsInVybCIsImRhdGEiLCJmZXRjaCIsIm1ldGhvZCIsIm1vZGUiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJ0eXBlc09mRm9vZCIsIk9iamVjdCIsInZhbHVlcyIsImZvb2RzIiwibWFwIiwiaSIsImZvb2RfbmFtZSIsInRvdGFsQ2Fsb3JpZXMiLCJudXRyaXRpb25UeXBlcyIsIm51dHJpdGlvbmFsRGF0YSIsInRvdGFsUHJvdGVpbiIsInRvdGFsQ2FyYnMiLCJ0b3RhbEZhdCIsInRvdGFsU29kaXVtIiwidG90YWxDaG9sZXN0ZXJvbCIsInRvdGFsU3VnYXIiLCJsZW5ndGgiLCJuZl9jYWxvcmllcyIsIm5mX2Nob2xlc3Rlcm9sIiwibmZfcHJvdGVpbiIsIm5mX3RvdGFsX2ZhdCIsIm5mX3NvZGl1bSIsIm5mX3RvdGFsX2NhcmJvaHlkcmF0ZSIsIm5mX3N1Z2FycyIsImN0eCIsIkNoYXJ0IiwidHlwZSIsImxhYmVscyIsImRhdGFzZXRzIiwibGFiZWwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwiaG92ZXJCb3JkZXJDb2xvciIsImhvdmVyQm9yZGVyV2lkdGgiLCJmb29kIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJjYXRjaCIs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LFNBRmMsRUFHZCxTQUhjLEVBSWQsU0FKYyxFQUtkLFNBTGMsRUFNZCxTQU5jLEVBT2QsU0FQYyxDQXRCWDtBQStCUEMsc0NBQWtCO0FBL0JYLGlCQUFEO0FBRlI7O0FBRmEsU0FBZixDQUFSOztBQXlDSjs7QUFFSSxhQUFLLElBQUk3QixLQUFJLENBQWIsRUFBZ0JBLEtBQUlMLFlBQVlnQixNQUFoQyxFQUF3Q1gsSUFBeEMsRUFBNkM7QUFDekMsZ0JBQUk4QixPQUFPL0QsU0FBU2dFLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBRCxpQkFBS0UsV0FBTCxDQUFpQmpFLFNBQVNrRSxjQUFULE1BQTJCdEMsWUFBWUssRUFBWixDQUEzQixDQUFqQjtBQUNBO0FBQ0ExQixxQkFBUzBELFdBQVQsQ0FBcUJGLElBQXJCO0FBQ0g7QUFFSixLQTlFTCxFQStFS0ksS0EvRUwsQ0ErRVcsaUJBQVM7QUFDWjtBQUNELGVBQU9DLFFBQVFDLEdBQVIsQ0FBWUMsS0FBWixDQUFQO0FBQ0YsS0FsRkw7QUFtRkgsQ0E1SEQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGltcG9ydCAnLi4vYXNzZXRzL3N0eWxlc2hlZXRzL2Nzc19yZXNldC5jc3MnO1xuLy8gaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzaGVldHMvYXBwbGljYXRpb24uY3NzJztcbnZhciBjaGFydCA9IG51bGw7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBjaGFydCA9IG51bGw7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBmb3JtVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1WYWx1ZVwiKS52YWx1ZTtcbiAgICBsZXQgZm9vZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvb2RcIik7XG5cbiAgICB3aGlsZSAoZm9vZExpc3QuZmlyc3RDaGlsZCkge1xuICAgICAgICBmb29kTGlzdC5yZW1vdmVDaGlsZChmb29kTGlzdC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBsZXQgZm9vZERhdGEgPSB7XG4gICAgICAgIFwicXVlcnlcIjogZm9ybVZhbHVlLFxuICAgICAgICBcInRpbWV6b25lXCI6XCJVUy9FYXN0ZXJuXCJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcG9zdERhdGEodXJsID0gJycsIGRhdGEgPSB7fSkge1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICBcIngtYXBwLWlkXCI6IFwiYzYzNTY2OTRcIixcbiAgICAgICAgICAgICAgICBcIngtYXBwLWtleVwiOiBcIjA3MjYwZjhlOGU1MmE0NDNmMmNiMTE4ZDgxZWZlNmQ0XCIsXG4gICAgICAgICAgICAgICAgXCJ4LXJlbW90ZS11c2VyLWlkXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXG4gICAgICAgICAgICByZWZlcnJlcjogJ25vLXJlZmVycmVyJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG5cbiAgICAvLyBsZXQgYm9keSA9IHtcbiAgICAvLyAgICAgXCJxdWVyeVwiOiBcImZvciBicmVha2Zhc3QgaSBhdGUgMiBlZ2dzLCBiYWNvbiwgYW5kIGZyZW5jaCB0b2FzdFwiLFxuICAgIC8vICAgICBcInRpbWV6b25lXCI6IFwiVVMvRWFzdGVyblwiXG4gICAgLy8gfTtcblxuICAgIGxldCB0eXBlc09mRm9vZDtcblxuICAgIHBvc3REYXRhKCdodHRwczovL3RyYWNrYXBpLm51dHJpdGlvbml4LmNvbS92Mi9uYXR1cmFsL251dHJpZW50cycsIGZvb2REYXRhKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHR5cGVzT2ZGb29kID0gT2JqZWN0LnZhbHVlcyhkYXRhLmZvb2RzKS5tYXAoaSA9PiBpLmZvb2RfbmFtZSk7XG4gICAgICAgICAgICBsZXQgdG90YWxDYWxvcmllcyA9IDA7IFxuICAgICAgICAgICAgbGV0IG51dHJpdGlvblR5cGVzID0gW1wiUHJvdGVpblwiLCBcIkNhcmJvaHlkcmF0ZXNcIiwgXCJGYXRzXCIsIFwiU29kaXVtXCIsIFwiQ2hvbGVzdGVyb2xcIiwgXCJTdWdhclwiXTtcblxuICAgICAgICAgICAgbGV0IG51dHJpdGlvbmFsRGF0YSA9IHtcbiAgICAgICAgICAgICAgICB0b3RhbFByb3RlaW46IDAsXG4gICAgICAgICAgICAgICAgdG90YWxDYXJiczogMCxcbiAgICAgICAgICAgICAgICB0b3RhbEZhdDogMCxcbiAgICAgICAgICAgICAgICB0b3RhbFNvZGl1bTogMCxcbiAgICAgICAgICAgICAgICB0b3RhbENob2xlc3Rlcm9sOiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsU3VnYXI6IDBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZvb2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdG90YWxDYWxvcmllcyArPSBkYXRhLmZvb2RzW2ldLm5mX2NhbG9yaWVzO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbENob2xlc3Rlcm9sICs9IGRhdGEuZm9vZHNbaV0ubmZfY2hvbGVzdGVyb2w7XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsUHJvdGVpbiArPSBkYXRhLmZvb2RzW2ldLm5mX3Byb3RlaW47XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsRmF0ICs9IGRhdGEuZm9vZHNbaV0ubmZfdG90YWxfZmF0O1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbFNvZGl1bSArPSBkYXRhLmZvb2RzW2ldLm5mX3NvZGl1bTtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxDYXJicyArPSBkYXRhLmZvb2RzW2ldLm5mX3RvdGFsX2NhcmJvaHlkcmF0ZTtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxTdWdhciArPSBkYXRhLmZvb2RzW2ldLm5mX3N1Z2FycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVidWdnZXJcblxuICAgICAgICAgICAgbGV0IGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnV0cml0aW9uXCIpO1xuICAgICAgICAgICAgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2RvdWdobnV0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogbnV0cml0aW9uVHlwZXMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdOdXRyaXRpb25hbCBCcmVha2Rvd24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogT2JqZWN0LnZhbHVlcyhudXRyaXRpb25hbERhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMjU1LDAsMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDEwMCw1MCwwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMCwxMDAsMTAwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMTUwLDAsMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDAsNTAsMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDAsMCwyMDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgxMDAsMTAwLDEwMCwuNyknXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBob3ZlckJvcmRlckNvbG9yOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyQm9yZGVyV2lkdGg6IDJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBsZXQgZm9vZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvb2RcIik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXNPZkZvb2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICAgICAgICBmb29kLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke3R5cGVzT2ZGb29kW2ldfWApKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhmb29kKTtcbiAgICAgICAgICAgICAgICBmb29kTGlzdC5hcHBlbmRDaGlsZChmb29kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSkgICAgXG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==