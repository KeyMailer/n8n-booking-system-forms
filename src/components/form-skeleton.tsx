import { Skeleton } from "./ui/skeleton"; // SHADCN COMPONENT

export default function FormSkeleton() {
  return (
    <div className="mx-auto min-h-screen p-5 max-w-5xl">
      <Skeleton className="h-4 w-24 mb-6 bg-zinc-200 dark:bg-zinc-800" />

      <div className="flex gap-6">
        <div className="flex-1 max-w-2xl">
          <Skeleton className="h-10 w-full mb-2 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-6 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-8 w-64 mb-1 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-48 mb-6 bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-12 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-32 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-28 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-28 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-28 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-36 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-24 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-20 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-4 w-28 mb-2 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-10 w-full mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-14 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <Skeleton className="h-24 w-full mb-1 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex justify-end mb-4">
            <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <Skeleton className="h-12 w-full mb-3 rounded-md bg-zinc-200 dark:bg-zinc-800" />

          <Skeleton className="h-10 w-full rounded-md bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="w-56 shrink-0 space-y-4">
          {/* Quick Note card */}
          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 p-4 space-y-2">
            <Skeleton className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-full bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-4/5 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 p-4 space-y-2">
            <Skeleton className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-full bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800" />
            <div className="pt-1 space-y-2">
              {["Featured", "Featured Demo", "Promoted", "Standard"].map(
                (_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800" />
                    <Skeleton className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                ),
              )}
            </div>
            <Skeleton className="h-3 w-full mt-2 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 p-4 space-y-2">
            <Skeleton className="h-4 w-36 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-full bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800" />
            <div className="pt-1 space-y-2">
              {["Featured", "Featured Demo", "Promoted", "Standard"].map(
                (_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800" />
                    <Skeleton className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                ),
              )}
            </div>
            <Skeleton className="h-3 w-full mt-2 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
