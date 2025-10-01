import Image from "next/image";
import { Droplets, Wind } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { WeatherData } from "@/lib/types";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>
          Current Weather in {data.name}, {data.country}
        </CardTitle>
        <CardDescription className="capitalize">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <p className="text-7xl font-bold">{data.temp}</p>
            <span className="mt-1 text-2xl font-medium">°C</span>
          </div>
          <Image
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
            width={100}
            height={100}
            className="drop-shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Droplets className="w-5 h-5 text-primary" />
            <div>
              <p className="text-muted-foreground">Humidity</p>
              <p className="font-semibold">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Wind className="w-5 h-5 text-primary" />
            <div>
              <p className="text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{data.wind_speed} m/s</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
