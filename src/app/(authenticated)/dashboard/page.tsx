import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CalendarCheck, ShieldAlert, TrendingUp, Moon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description?: string;
  colorClass?: string;
}

function MetricCard({ title, value, icon: Icon, description, colorClass = 'text-primary' }: MetricCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Oversee the vitals for La Luna Donde Mamá.
          </p>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-card">
          <Moon className="h-5 w-5 text-accent"/>
          <span className="text-sm font-medium text-accent">La Luna Donde Mamá</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Reservations" value="1,234" icon={CalendarCheck} description="+20.1% from last month" colorClass="text-primary"/>
        <MetricCard title="Revenue Today" value="$5,678" icon={DollarSign} description="+15% from yesterday" colorClass="text-green-400" />
        <MetricCard title="Occupancy Rate" value="85%" icon={Users} description="Current occupancy" colorClass="text-blue-400" />
        <MetricCard title="Active Alerts" value="3" icon={ShieldAlert} description="Needs attention" colorClass="text-red-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-foreground">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Revenue chart coming soon.</p>
              <p className="text-xs text-muted-foreground/70" data-ai-hint="revenue graph">Placeholder for financial analytics graph.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
             {/* Placeholder for activity feed */}
            <div className="text-center">
              < ShieldAlert className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Activity feed coming soon.</p>
              <p className="text-xs text-muted-foreground/70" data-ai-hint="activity list">Placeholder for recent system events.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
