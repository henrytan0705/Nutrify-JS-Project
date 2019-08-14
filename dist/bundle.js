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

        // debugger

        var ctx = document.getElementById("polarChart");
        chart = new Chart(ctx, {
            type: 'bar',
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
        debugger;
        return console.log(error);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNoYXJ0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybVZhbHVlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImZvb2REYXRhIiwicG9zdERhdGEiLCJ1cmwiLCJkYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwidHlwZXNPZkZvb2QiLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb29kcyIsIm1hcCIsImkiLCJmb29kX25hbWUiLCJudXRyaXRpb25hbERhdGEiLCJ0b3RhbFByb3RlaW4iLCJ0b3RhbENhcmJzIiwidG90YWxGYXQiLCJ0b3RhbFNvZGl1bSIsInRvdGFsQ2hvbGVzdGVyb2wiLCJ0b3RhbFN1Z2FyIiwibnV0cml0aW9uVHlwZXMiLCJsZW5ndGgiLCJuZl9jaG9sZXN0ZXJvbCIsIm5mX3Byb3RlaW4iLCJuZl90b3RhbF9mYXQiLCJuZl9zb2RpdW0iLCJuZl90b3RhbF9jYXJib2h5ZHJhdGUiLCJuZl9zdWdhcnMiLCJjdHgiLCJDaGFydCIsInR5cGUiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsImhvdmVyQm9yZGVyQ29sb3IiLCJob3ZlckJvcmRlcldpZHRoIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7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SUFBOEJ4QixLQUFLa0IsS0FBTCxDQUFXRSxDQUFYLEVBQWNlLHFCQUE1QztBQUNBYiw0QkFBZ0JNLFVBQWhCLElBQThCNUIsS0FBS2tCLEtBQUwsQ0FBV0UsQ0FBWCxFQUFjZ0IsU0FBNUM7QUFDSDs7QUFFRDs7QUFFQSxZQUFJQyxNQUFNL0MsU0FBU0ssY0FBVCxDQUF3QixZQUF4QixDQUFWO0FBQ0FOLGdCQUFRLElBQUlpRCxLQUFKLENBQVVELEdBQVYsRUFBZTtBQUNuQkUsa0JBQU0sS0FEYTtBQUVuQnZDLGtCQUFNO0FBQ0Z3Qyx3QkFBUVgsY0FETjtBQUVGWSwwQkFBVSxDQUFDO0FBQ1BDLDJCQUFPLHVCQURBO0FBRVAxQywwQkFBTWdCLE9BQU9DLE1BQVAsQ0FBY0ssZUFBZCxDQUZDO0FBR1BxQixxQ0FBaUIsQ0FDYixrQkFEYSxFQUViLG1CQUZhLEVBR2Isb0JBSGEsRUFJYixrQkFKYSxFQUtiLGlCQUxhLEVBTWIsa0JBTmEsRUFPYixzQkFQYSxDQUhWO0FBWVBDLGlDQUFhLENBQ1QsTUFEUyxFQUVULE1BRlMsRUFHVCxNQUhTLEVBSVQsTUFKUyxFQUtULE1BTFMsRUFNVCxNQU5TLEVBT1QsTUFQUyxDQVpOO0FBcUJQQyxpQ0FBYSxDQXJCTjtBQXNCUEMsc0NBQWtCLENBQ2QsU0FEYyxFQUVkLFNBRmMsRUFHZCxTQUhjLEVBSWQsU0FKYyxFQUtkLFNBTGMsRUFNZCxTQU5jLEVBT2QsU0FQYyxDQXRCWDtBQStCUEMsc0NBQWtCO0FBL0JYLGlCQUFEO0FBRlI7O0FBRmEsU0FBZixDQUFSO0FBd0NILEtBckVMLEVBc0VLQyxLQXRFTCxDQXNFVyxpQkFBUztBQUNaO0FBQ0QsZUFBT0MsUUFBUUMsR0FBUixDQUFZQyxLQUFaLENBQVA7QUFDRixLQXpFTDtBQTBFSCxDQTNHRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gaW1wb3J0ICcuLi9hc3NldHMvc3R5bGVzaGVldHMvY3NzX3Jlc2V0LmNzcyc7XG4vLyBpbXBvcnQgJy4uL2Fzc2V0cy9zdHlsZXNoZWV0cy9hcHBsaWNhdGlvbi5jc3MnO1xudmFyIGNoYXJ0ID0gbnVsbDtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgZm9ybVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtVmFsdWVcIikudmFsdWU7XG5cbiAgICBsZXQgZm9vZERhdGEgPSB7XG4gICAgICAgIFwicXVlcnlcIjogZm9ybVZhbHVlLFxuICAgICAgICBcInRpbWV6b25lXCI6XCJVUy9FYXN0ZXJuXCJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcG9zdERhdGEodXJsID0gJycsIGRhdGEgPSB7fSkge1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICBcIngtYXBwLWlkXCI6IFwiYzYzNTY2OTRcIixcbiAgICAgICAgICAgICAgICBcIngtYXBwLWtleVwiOiBcIjA3MjYwZjhlOGU1MmE0NDNmMmNiMTE4ZDgxZWZlNmQ0XCIsXG4gICAgICAgICAgICAgICAgXCJ4LXJlbW90ZS11c2VyLWlkXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXG4gICAgICAgICAgICByZWZlcnJlcjogJ25vLXJlZmVycmVyJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG5cbiAgICAvLyBsZXQgYm9keSA9IHtcbiAgICAvLyAgICAgXCJxdWVyeVwiOiBcImZvciBicmVha2Zhc3QgaSBhdGUgMiBlZ2dzLCBiYWNvbiwgYW5kIGZyZW5jaCB0b2FzdFwiLFxuICAgIC8vICAgICBcInRpbWV6b25lXCI6IFwiVVMvRWFzdGVyblwiXG4gICAgLy8gfTtcblxuICAgIHBvc3REYXRhKCdodHRwczovL3RyYWNrYXBpLm51dHJpdGlvbml4LmNvbS92Mi9uYXR1cmFsL251dHJpZW50cycsIGZvb2REYXRhKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGxldCB0eXBlc09mRm9vZCA9IE9iamVjdC52YWx1ZXMoZGF0YS5mb29kcykubWFwKGkgPT4gaS5mb29kX25hbWUpO1xuXG4gICAgICAgICAgICBsZXQgbnV0cml0aW9uYWxEYXRhID0ge1xuICAgICAgICAgICAgICAgIC8vIHRvdGFsQ2Fsb3JpZXM6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxQcm90ZWluOiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsQ2FyYnM6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxGYXQ6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxTb2RpdW06IDAsXG4gICAgICAgICAgICAgICAgdG90YWxDaG9sZXN0ZXJvbDogMCxcbiAgICAgICAgICAgICAgICB0b3RhbFN1Z2FyOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBudXRyaXRpb25UeXBlcyA9IFtcIlByb3RlaW5cIiwgXCJDYXJib2h5ZHJhdGVzXCIsIFwiRmF0c1wiLCBcIlNvZGl1bVwiLCBcIkNob2xlc3Rlcm9sXCIsIFwiU3VnYXJcIl07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5mb29kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIG51dHJpdGlvbmFsRGF0YS50b3RhbENhbG9yaWVzICs9IGRhdGEuZm9vZHNbaV0ubmZfY2Fsb3JpZXM7XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsQ2hvbGVzdGVyb2wgKz0gZGF0YS5mb29kc1tpXS5uZl9jaG9sZXN0ZXJvbDtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxQcm90ZWluICs9IGRhdGEuZm9vZHNbaV0ubmZfcHJvdGVpbjtcbiAgICAgICAgICAgICAgICBudXRyaXRpb25hbERhdGEudG90YWxGYXQgKz0gZGF0YS5mb29kc1tpXS5uZl90b3RhbF9mYXQ7XG4gICAgICAgICAgICAgICAgbnV0cml0aW9uYWxEYXRhLnRvdGFsU29kaXVtICs9IGRhdGEuZm9vZHNbaV0ubmZfc29kaXVtO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbENhcmJzICs9IGRhdGEuZm9vZHNbaV0ubmZfdG90YWxfY2FyYm9oeWRyYXRlO1xuICAgICAgICAgICAgICAgIG51dHJpdGlvbmFsRGF0YS50b3RhbFN1Z2FyICs9IGRhdGEuZm9vZHNbaV0ubmZfc3VnYXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlclxuXG4gICAgICAgICAgICBsZXQgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb2xhckNoYXJ0XCIpO1xuICAgICAgICAgICAgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IG51dHJpdGlvblR5cGVzLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTnV0cml0aW9uYWwgQnJlYWtkb3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IE9iamVjdC52YWx1ZXMobnV0cml0aW9uYWxEYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDI1NSwwLDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgxMDAsNTAsMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDAsMTAwLDEwMCwuNyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDE1MCwwLDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgwLDUwLDAsLjcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSgwLDAsMjAwLC43KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMTAwLDEwMCwxMDAsLjcpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJCb3JkZXJDb2xvcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBob3ZlckJvcmRlcldpZHRoOiAyXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KSAgICBcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==