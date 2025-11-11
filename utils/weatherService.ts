// Weather Service for WeatherAPI.com integration

// Weather data interfaces
export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  pressure_mb: number;
  uv: number;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
}

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'http://api.weatherapi.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Get current weather by city name
   */
  async getCurrentWeatherByCity(cityName: string): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/current.json?key=${this.apiKey}&q=${encodeURIComponent(cityName)}&aqi=no`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Weather API Error:', error);
      return null;
    }
  }

  /**
   * Get current weather by latitude and longitude
   */
  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Weather API Error:', error);
      return null;
    }
  }

  /**
   * Get forecast for a specific city
   */
  async getForecast(cityName: string, days: number = 3): Promise<any | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(cityName)}&days=${days}&aqi=no&alerts=no`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Weather API Error:', error);
      return null;
    }
  }
}

// CONFIGURATION
export const WEATHER_CONFIG = {
  WEATHER_API_KEY: '7c198efd54804771868162203252710', // Put your WeatherAPI.com key here
  DEFAULT_CITY: 'Olongapo City', // Default city if location not available
};

// FACTORY FUNCTION
export function createWeatherService(): WeatherService {
  return new WeatherService(WEATHER_CONFIG.WEATHER_API_KEY);
}

