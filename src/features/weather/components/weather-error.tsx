import { CircleAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

function WeatherError() {
  return (
    <Card className="h-full rounded-[2rem] border-white/50 bg-white/90 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <CardContent className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10">
          <CircleAlert className="size-6 text-destructive" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          No pudimos consultar el clima
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Verifica la ciudad y el país e inténtalo nuevamente.
        </p>
      </CardContent>
    </Card>
  );
}

export default WeatherError;
