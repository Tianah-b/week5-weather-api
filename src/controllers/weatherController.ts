import { Request, Response } from "express";
import {
  generateDublinWeatherData,
  generateLondonWeatherData,
} from "../services/weatherService.js";
import { validationResult } from "express-validator";

/**
 * Gets the weather data for a city
 * @param req the request object
 * @param res the response object
 */
export const getWeatherData = async (req: Request, res: Response) => {
  // Check if there are any validation errors
  const errors = validationResult(req);
  
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
    let finalWeatherData: WeatherData;

    // Use an if statement to check which city was passed in
    if (city === "london") {
      finalWeatherData = generateLondonWeatherData();
    } else if (city === "dublin") {
      finalWeatherData = generateDublinWeatherData();
    } else {
      // If the city is not London or Dublin, throw an error
      res.status(404).send("City not found");
      return;
    }
    
    // Return the weather data as JSON
    res.status(200).json(finalWeatherData);
  } catch (error) {
    // Log the error and send a 500 status code if an error occurs
    console.error(error);
    res.status(500).send("Error in fetching weather data");
  }
};
