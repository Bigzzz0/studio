import { Dashboard } from "@/components/dashboard";
import { Sun } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 font-body">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/20 rounded-full">
            <Sun className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            BreatheEasy Dashboard
          </h1>
        </header>
        <Dashboard />
      </div>
    </main>
  );
}
