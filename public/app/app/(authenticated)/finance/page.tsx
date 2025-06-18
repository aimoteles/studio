import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, FileText, CreditCard, Landmark } from 'lucide-react';

export default function FinancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline text-foreground">Financial Automation</h1>
        <p className="text-muted-foreground">Streamlined accounting and payment gateway integrations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <Landmark className="text-primary h-5 w-5" /> Accounting Module
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Automated bookkeeping, financial reporting, and tax preparation features are under development.
            </p>
            <div className="mt-4 h-40 bg-muted/30 rounded-md flex items-center justify-center" data-ai-hint="accounting software interface">
              <p className="text-muted-foreground text-sm">Accounting Dashboard Preview</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <CreditCard className="text-accent h-5 w-5" /> Payment Gateways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Seamless integration with popular payment gateways for secure online and offline transactions.
            </p>
            <div className="mt-4 h-40 bg-muted/30 rounded-md flex items-center justify-center" data-ai-hint="payment icons logos">
              <p className="text-muted-foreground text-sm">Payment Integration Status</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <FileText className="text-blue-400 h-5 w-5" /> Expense Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
             Automated expense categorization and reporting to monitor operational costs. This module is planned.
            </p>
            <div className="mt-4 h-40 bg-muted/30 rounded-md flex items-center justify-center" data-ai-hint="expense report chart">
              <p className="text-muted-foreground text-sm">Expense Analytics Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Financial Overview</CardTitle>
          <CardDescription>Key financial metrics for La Luna Donde Mamá.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Detailed financial analytics and reports will be available here.</p>
            <p className="text-xs text-muted-foreground/70 mt-1" data-ai-hint="financial graphs dashboard">
              Placeholder for interactive financial charts and summaries.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
