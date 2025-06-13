'use client';

import { useState, type FormEvent } from 'react';
import { generateAlerts, type GenerateAlertsInput, type GenerateAlertsOutput } from '@/ai/flows/generate-alerts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, Loader2, Activity } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

export default function OperationsPage() {
  const [securityData, setSecurityData] = useState('');
  const [alerts, setAlerts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!securityData.trim() || isLoading) return;

    setIsLoading(true);
    setAlerts([]);

    try {
      const input: GenerateAlertsInput = { securityData };
      const result: GenerateAlertsOutput = await generateAlerts(input);
      setAlerts(result.alerts);
      if (result.alerts.length === 0) {
        toast({ title: "MEGAAGENTE", description: "No critical alerts detected from the provided data." });
      } else {
        toast({ title: "MEGAAGENTE", description: `${result.alerts.length} alert(s) generated.`, variant: "destructive" });
      }
    } catch (error) {
      console.error('Error generating alerts:', error);
      setAlerts(['Failed to generate alerts. Please check the console for details.']);
      toast({ title: "Error", description: "Could not generate alerts.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline text-foreground">AI Operations Manager (MEGAAGENTE)</h1>
        <p className="text-muted-foreground">Monitoring, alerting, predictive analysis, and security for La Luna Donde Mamá.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Activity className="text-primary" /> Generate Security Alerts
            </CardTitle>
            <CardDescription>Input security logs or sensor data to detect anomalies.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Textarea
                value={securityData}
                onChange={(e) => setSecurityData(e.target.value)}
                placeholder="Paste security data here (e.g., logs, sensor readings)..."
                className="min-h-[200px] bg-input/50 focus:bg-input"
                disabled={isLoading}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !securityData.trim()} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Generate Alerts'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <ShieldCheck className="text-green-400" /> Generated Alerts
            </CardTitle>
            <CardDescription>Potential threats or anomalies identified by MEGAAGENTE.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[268px]">
            {isLoading && !alerts.length ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : alerts.length > 0 ? (
              <ul className="space-y-3">
                {alerts.map((alert, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-md border border-destructive/30 bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{alert}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-10">
                No alerts to display. Submit security data to generate alerts.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
