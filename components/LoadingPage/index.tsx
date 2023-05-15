import { Loader2 } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="mr-2 h-12 w-12 animate-spin" />
    </div>
  );
}
