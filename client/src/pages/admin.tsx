import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Eye, FileText, TrendingUp, Calendar } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

interface Analytics {
  totalViews: number;
  recentViews: {
    id: string;
    page: string;
    referrer: string | null;
    userAgent: string | null;
    timestamp: string;
  }[];
  pageBreakdown: { page: string; count: number }[];
  last7Days: { date: string; count: number }[];
}

export default function Admin() {
  useSeo({
    title: "Admin | Streamlined Tech",
    description: "Internal analytics.",
    canonical: "/dev",
    noindex: true,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("admin-token");
    if (token) {
      setIsAuthenticated(true);
      fetchAnalytics(token);
    }
  }, []);

  const fetchAnalytics = async (token: string) => {
    try {
      const response = await fetch("/api/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        sessionStorage.removeItem("admin-token");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Failed to fetch analytics");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("admin-token", data.token);
        setIsAuthenticated(true);
        fetchAnalytics(data.token);
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-token");
    setIsAuthenticated(false);
    setAnalytics(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-admin-password"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading} data-testid="button-admin-login">
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Link href="/" className="block text-center text-sm text-muted-foreground hover:underline">
                Back to Home
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Button variant="outline" onClick={handleLogout} data-testid="button-admin-logout">
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Analytics Dashboard</h1>

        {analytics ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Page Views</CardTitle>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-total-views">{analytics.totalViews}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pages Tracked</CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{analytics.pageBreakdown.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Views Today</CardTitle>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {analytics.last7Days[analytics.last7Days.length - 1]?.count || 0}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Last 7 Days
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics.last7Days.map((day) => (
                      <div key={day.date} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{day.date}</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-2 bg-primary rounded" 
                            style={{ width: `${Math.max(4, (day.count / Math.max(...analytics.last7Days.map(d => d.count), 1)) * 100)}px` }}
                          />
                          <span className="text-sm font-medium w-8 text-right">{day.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Page Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics.pageBreakdown.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No page views yet</p>
                    ) : (
                      analytics.pageBreakdown.map((item) => (
                        <div key={item.page} className="flex justify-between items-center">
                          <span className="text-sm truncate max-w-[200px]">{item.page}</span>
                          <span className="text-sm font-medium">{item.count} views</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Page</th>
                        <th className="text-left py-2 font-medium">Referrer</th>
                        <th className="text-left py-2 font-medium">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.recentViews.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-muted-foreground">
                            No page views recorded yet
                          </td>
                        </tr>
                      ) : (
                        analytics.recentViews.slice(0, 20).map((view) => (
                          <tr key={view.id} className="border-b">
                            <td className="py-2">{view.page}</td>
                            <td className="py-2 text-muted-foreground">{view.referrer || "-"}</td>
                            <td className="py-2 text-muted-foreground">
                              {new Date(view.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        )}
      </main>
    </div>
  );
}
