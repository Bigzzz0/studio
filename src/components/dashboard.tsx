"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Search, Wind } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { getWeatherDataByCity } from "@/app/actions";
import type { WeatherAndAqiData } from "@/lib/types";
import { WeatherCard } from "./weather-card";
import { AqiCard } from "./aqi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const FormSchema = z.object({
  city: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
});

export function Dashboard() {
  const [data, setData] = useState<WeatherAndAqiData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    setIsLoading(true);
    setData(null);
    const result = await getWeatherDataByCity(formData.city);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else {
      setData(result.data);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Search for a City</CardTitle>
          <CardDescription>
            Get real-time weather and air quality data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row items-start gap-2"
            >
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g., Bangkok, London, Tokyo"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {data ? (
        <div className="grid md:grid-cols-2 gap-8">
          <WeatherCard data={data.weather} />
          <AqiCard data={data.aqi} />
        </div>
      ) : (
        !isLoading && (
          <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed">
            <Wind className="w-16 h-16 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">Welcome!</CardTitle>
            <CardDescription>
              Enter a city name above to get started.
            </CardDescription>
          </Card>
        )
      )}
    </div>
  );
}
