import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

interface AdvisorCardProps {
  advice: string | null;
  isLoading: boolean;
}

export function AdvisorCard({ advice, isLoading }: AdvisorCardProps) {
  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <div className="p-3 bg-primary/20 rounded-full border border-primary/30">
            <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
            <CardTitle className="text-primary">AI-Powered Advice</CardTitle>
            <CardDescription className="text-foreground/80">Personalized recommendations based on current conditions.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating advice...</span>
          </div>
        ) : (
          <p className="text-lg font-medium text-foreground">
            {advice || "No advice available."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
