"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = void 0;
const weatherService_js_1 = require("../services/weatherService.js");
const express_validator_1 = require("express-validator");
/**
 * Gets the weather data for a city
 * @param req the request object
 * @param res the response object
 */
const getWeatherData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if there are any validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    // Log them and send a 400 status code if validation errors exist
    if (!errors.isEmpty()) {
        console.error("Validation error", errors.mapped());
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // Use a try catch block to catch any errors
    try {
        // Get the city param from the request
        const { city } = req.params;
        console.log(city);
        // Create a variable with a type of WeatherData
        let finalWeatherData;
        // Use an if statement to check which city was passed in
        if (city === "london") {
            finalWeatherData = (0, weatherService_js_1.generateLondonWeatherData)();
        }
        else if (city === "dublin") {
            finalWeatherData = (0, weatherService_js_1.generateDublinWeatherData)();
        }
        else {
            // If the city is not London or Dublin, throw an error
            res.status(404).send("City not found");
            return;
        }
        // Return the weather data as JSON
        res.status(200).json(finalWeatherData);
    }
    catch (error) {
        // Log the error and send a 500 status code if an error occurs
        console.error(error);
        res.status(500).send("Error in fetching weather data");
    }
});
exports.getWeatherData = getWeatherData;
