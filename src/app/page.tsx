import { Dashboard } from "@/components/dashboard";
import { CloudSun } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 font-body relative">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-accent to-secondary opacity-20 -z-10"></div>
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/20 rounded-full border-2 border-primary/30 shadow-lg">
            <CloudSun className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            BreatheEasy
          </h1>
        </header>
        <Dashboard />
      </div>
    </main>
  );
}
