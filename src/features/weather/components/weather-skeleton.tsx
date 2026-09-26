import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function WeatherSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 py-0 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
      <CardHeader className="items-center gap-3 px-6 pt-6 pb-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-44" />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between px-5 pt-2 pb-5 sm:px-6">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="size-22 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-14 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-19 rounded-2xl" />
          <Skeleton className="h-19 rounded-2xl" />
          <Skeleton className="h-19 rounded-2xl" />
          <Skeleton className="h-19 rounded-2xl" />
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherSkeleton;
