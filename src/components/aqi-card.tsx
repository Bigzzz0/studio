import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AqiData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Smile, Meh, Frown, Angry, CloudFog } from "lucide-react";

interface AqiCardProps {
  data: AqiData;
}

const aqiLevels = [
  { level: 1, label: "Good", colorClass: "bg-good", icon: Smile },
  { level: 2, label: "Fair", colorClass: "bg-fair", icon: Meh },
  { level: 3, label: "Moderate", colorClass: "bg-accent", icon: Frown },
  { level: 4, label: "Poor", colorClass: "bg-poor", icon: Angry },
  { level: 5, label: "Very Poor", colorClass: "bg-very-poor", icon: CloudFog },
];

export function AqiCard({ data }: AqiCardProps) {
  const aqiInfo = aqiLevels.find((l) => l.level === data.aqi) || aqiLevels[2];
  const Icon = aqiInfo.icon;
  const iconColorClass = aqiInfo.colorClass.replace("bg-", "text-");

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Air Quality Index (AQI)</CardTitle>
        <CardDescription>Current air pollution level.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={cn("flex items-center justify-between p-4 rounded-lg", aqiInfo.colorClass, "text-primary-foreground")}>
          <div className="space-y-1">
            <Badge variant="secondary" className="bg-white/30 text-white">{aqiInfo.label}</Badge>
            <p className="text-6xl font-bold">{data.aqi}</p>
            <p className="text-sm opacity-80">AQI Value</p>
          </div>
          <Icon className="w-20 h-20 opacity-80 text-white" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Pollutant Concentrations (μg/m³)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            <div className="p-2 bg-muted/50 rounded-md">
              <p className="text-muted-foreground">PM2.5</p>
              <p className="font-semibold">{data.components.pm2_5.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <p className="text-muted-foreground">PM10</p>
              <p className="font-semibold">{data.components.pm10.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <p className="text-muted-foreground">O₃</p>
              <p className="font-semibold">{data.components.o3.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <p className="text-muted-foreground">NO₂</p>
              <p className="font-semibold">{data.components.no2.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <p className="text-muted-foreground">SO₂</p>
              <p className="font-semibold">{data.components.so2.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <p className="text-muted-foreground">CO</p>
              <p className="font-semibold">{data.components.co.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
