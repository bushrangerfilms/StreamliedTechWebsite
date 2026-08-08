import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";

export default function NotFound() {
  // The host rewrites every unmatched path to index.html with a 200, so this
  // is the only place a soft 404 can be kept out of the index.
  useSeo({
    title: "Page not found | Streamlined Tech",
    description: "That page does not exist.",
    canonical: "/",
    noindex: true,
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            That page does not exist, or it has moved.{" "}
            <Link href="/" className="underline hover:text-gray-900">
              Head back to the homepage.
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
