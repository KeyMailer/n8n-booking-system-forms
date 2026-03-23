import { Spinner } from "./ui/spinner";
export default function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <Spinner className="size-5" />
    </div>
  );
}
