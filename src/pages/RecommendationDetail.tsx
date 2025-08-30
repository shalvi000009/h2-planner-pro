import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const RecommendationDetail = () => {
  const { state } = useLocation() as { state?: { rec?: any } };
  const { id } = useParams();
  const navigate = useNavigate();
  const rec = state?.rec;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {!rec ? (
          <Card className="p-6">
            <h1 className="text-xl font-semibold mb-2">No data available</h1>
            <p className="text-muted-foreground">Open this page via Recommendations list.</p>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{rec.location}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="default">{String(rec.score).toUpperCase()} POTENTIAL</Badge>
                <span className="text-sm text-muted-foreground">{rec.type}</span>
                <span className="text-sm text-muted-foreground">Score: <span className="font-semibold">{rec.scoreValue}</span></span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 lg:col-span-2">
                <h2 className="text-lg font-semibold mb-3">Key Advantages</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {rec.reasons?.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <h2 className="text-lg font-semibold mt-6 mb-3">Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">CO₂ Avoided</div>
                    <div className="text-sm font-semibold">{rec.metrics?.co2Avoided}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Investment</div>
                    <div className="text-sm font-semibold">{rec.metrics?.investment}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Jobs Created</div>
                    <div className="text-sm font-semibold">{rec.metrics?.jobsCreated}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Payback Period</div>
                    <div className="text-sm font-semibold">{rec.metrics?.paybackPeriod}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-3">Actions</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const latNum = Number(rec?.coordinates?.lat);
                      const lngNum = Number(rec?.coordinates?.lng);
                      if (Number.isFinite(latNum) && Number.isFinite(lngNum)) {
                        const params = new URLSearchParams({
                          lat: String(latNum),
                          lng: String(lngNum),
                          label: rec?.location ? String(rec.location) : "",
                        });
                        navigate(`/map?${params.toString()}`);
                      }
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2" /> View on Map
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RecommendationDetail;