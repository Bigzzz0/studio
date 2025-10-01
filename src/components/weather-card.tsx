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
    <Card className="transition-all duration-300 hover:shadow-lg border-border/60">
      <CardHeader>
        <CardTitle>
          Current Weather in {data.name}, {data.country}
        </CardTitle>
        <CardDescription className="capitalize text-base">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start">
            <p className="text-7xl font-bold text-primary">{data.temp}</p>
            <span className="mt-2 text-3xl font-medium text-primary/90">°C</span>
          </div>
          <Image
            src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
            alt={data.description}
            width={120}
            height={120}
            className="drop-shadow-lg -mr-4 -my-4"
            unoptimized
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
            <Droplets className="w-6 h-6 text-primary" />
            <div>
              <p className="text-muted-foreground">Humidity</p>
              <p className="font-semibold text-xl">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
            <Wind className="w-6 h-6 text-primary" />
            <div>
              <p className="text-muted-foreground">Wind Speed</p>
              <p className="font-semibold text-xl">{data.wind_speed} m/s</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
