import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { createWeatherService, WEATHER_CONFIG, type WeatherData } from '@/utils/weatherService';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

// Popular cities for suggestions
const POPULAR_CITIES = [
  'Olongapo City',
  'Manila',
  'Quezon City',
  'Makati',
  'Cebu City',
  'Davao City',
  'New York',
  'Los Angeles',
  'London',
  'Tokyo',
  'Sydney',
  'Paris',
  'Mumbai',
  'Dubai',
  'Singapore',
  'Subic, Zambales',
  'Castillejos, Zambales',
  'San Marcelino, Zambales',
  'San Antonio, Zambales',
  'San Narciso, Zambales'
];

export default function NotificationsScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string>('Olongapo City');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const weatherService = createWeatherService();

  const fetchWeather = async (city: string = cityName) => {
    if (!WEATHER_CONFIG.WEATHER_API_KEY) {
      setError('Please add your WeatherAPI.com API key in utils/weatherService.ts');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getCurrentWeatherByCity(city);
      if (data) {
        setWeatherData(data);
      } else {
        setError('Unable to fetch weather data. Please check your API key and try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching weather data.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = () => {
    if (cityName.trim()) {
      fetchWeather(cityName.trim());
      setShowSuggestions(false);
    } else {
      Alert.alert('Error', 'Please enter a city name');
    }
  };

  const handleCityInput = (text: string) => {
    setCityName(text);
    if (text.length > 0) {
      const filtered = POPULAR_CITIES.filter(city =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: string) => {
    setCityName(city);
    setShowSuggestions(false);
    fetchWeather(city);
  };

  const getWeatherIcon = (conditionText: string) => {
    const text = conditionText.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) return 'sun.max.fill';
    if (text.includes('rain') || text.includes('drizzle')) return 'cloud.rain.fill';
    if (text.includes('storm') || text.includes('thunder')) return 'cloud.bolt.fill';
    if (text.includes('snow')) return 'cloud.snow.fill';
    if (text.includes('cloud') || text.includes('overcast')) return 'cloud.fill';
    return 'cloud.sun.fill';
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Weather
      </ThemedText>

      {/* Search Bar */}
      <ThemedView style={styles.searchWrapper}>
        <ThemedView style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter city name..."
            placeholderTextColor="#999"
            value={cityName}
            onChangeText={handleCityInput}
            onSubmitEditing={handleSearch}
            onFocus={() => cityName.length > 0 && setShowSuggestions(true)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
            <IconSymbol name="magnifyingglass" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </ThemedView>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredCities.length > 0 && (
          <ThemedView style={styles.suggestionsContainer}>
            <ScrollView 
              style={styles.suggestionsList}
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
            >
              {filteredCities.map((city, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => selectCity(city)}
                >
                  <IconSymbol name="location.fill" size={18} color="#666" />
                  <Text style={styles.suggestionText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ThemedView>
        )}
      </ThemedView>

      {loading && !weatherData && (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
          <ThemedText style={styles.loadingText}>Loading weather data...</ThemedText>
        </ThemedView>
      )}

      {error && (
        <ThemedView style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle.fill" size={48} color="#FF6B6B" />
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchWeather()}>
            <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      {weatherData && !error && (
        <ScrollView style={styles.weatherContainer} showsVerticalScrollIndicator={false}>
          {/* Main Weather Card */}
          <ThemedView style={styles.mainCard}>
            <ThemedView style={styles.locationContainer}>
              <ThemedView style={styles.locationIconContainer}>
                <IconSymbol name="location.fill" size={20} color="#FF0000" />
              </ThemedView>
              <ThemedText style={styles.locationText}>
                {weatherData.location.name}, {weatherData.location.country}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.temperatureContainer}>
              <ThemedText type="title" style={styles.temperature}>
                {Math.round(weatherData.current.temp_c)}°
              </ThemedText>
              <ThemedView style={styles.weatherIconContainer}>
                <IconSymbol 
                  name={getWeatherIcon(weatherData.current.condition.text)} 
                  size={80} 
                  color="#FF0000" 
                />
              </ThemedView>
            </ThemedView>

            <ThemedText style={styles.conditionText}>
              {weatherData.current.condition.text}
            </ThemedText>
            <ThemedText style={styles.feelsLikeText}>
              Feels like {Math.round(weatherData.current.feelslike_c)}°
            </ThemedText>
          </ThemedView>

          {/* Weather Details Grid */}
          <ThemedView style={styles.detailsGrid}>
            <ThemedView style={styles.detailCard}>
              <IconSymbol name="drop.fill" size={32} color="#4A90E2" />
              <ThemedText style={styles.detailValue}>{weatherData.current.humidity}%</ThemedText>
              <ThemedText style={styles.detailLabel}>Humidity</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailCard}>
              <IconSymbol name="wind" size={32} color="#50C878" />
              <ThemedText style={styles.detailValue}>{Math.round(weatherData.current.wind_kph)} km/h</ThemedText>
              <ThemedText style={styles.detailLabel}>Wind Speed</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailCard}>
              <IconSymbol name="gauge" size={32} color="#FF8C42" />
              <ThemedText style={styles.detailValue}>{weatherData.current.pressure_mb} mb</ThemedText>
              <ThemedText style={styles.detailLabel}>Pressure</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailCard}>
              <IconSymbol name="sun.max.fill" size={32} color="#FFD700" />
              <ThemedText style={styles.detailValue}>{weatherData.current.uv}</ThemedText>
              <ThemedText style={styles.detailLabel}>UV Index</ThemedText>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  searchWrapper: {
    marginBottom: 20,
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFE4E6',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: '#FF0000',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  weatherContainer: {
    flex: 1,
  },
  mainCard: {
    backgroundColor: '#FFE4E6',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4E6',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIconContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  temperature: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FF0000',
    marginRight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 22,
  },
  weatherIconContainer: {
    backgroundColor: 'transparent',
    borderRadius: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  feelsLikeText: {
    fontSize: 16,
    color: '#666666',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  detailValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFE4E6',
    borderRadius: 15,
    maxHeight: 250,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#FFB6C1',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  suggestionsList: {
    maxHeight: 250,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFB6C1',
  },
  suggestionText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
  },
});
