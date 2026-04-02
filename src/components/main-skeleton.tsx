import { Skeleton } from "./ui/skeleton"; // SHADCN COMPONENT
export default function MainSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 max-w-7xl mx-auto px-5">
      <Skeleton className="h-16 w-full mb-2 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <Skeleton className="h-16 w-full mb-6 rounded-md bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
