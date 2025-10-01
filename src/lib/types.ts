export interface WeatherData {
  temp: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  name: string;
  country: string;
}

export interface AqiData {
  aqi: number;
  components: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
  };
}

export type WeatherAndAqiData = {
  weather: WeatherData;
  aqi: AqiData;
};

// Raw API response types
export interface WeatherApiResponse {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

export interface AqiApiResponse {
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
    };
  }[];
}

export type GeoApiResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
}[];
