import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, Download } from 'lucide-react';

const mockReservations = [
  { id: 'RES001', guestName: 'Alice Wonderland', checkIn: '2024-08-15', checkOut: '2024-08-17', roomType: 'Suite', status: 'Confirmed', total: '$250.00' },
  { id: 'RES002', guestName: 'Bob The Builder', checkIn: '2024-08-16', checkOut: '2024-08-18', roomType: 'Deluxe', status: 'Pending', total: '$180.00' },
  { id: 'RES003', guestName: 'Charlie Brown', checkIn: '2024-08-18', checkOut: '2024-08-20', roomType: 'Standard', status: 'Checked-In', total: '$120.00' },
  { id: 'RES004', guestName: 'Diana Prince', checkIn: '2024-08-20', checkOut: '2024-08-22', roomType: 'Suite', status: 'Confirmed', total: '$280.00' },
  { id: 'RES005', guestName: 'Edward Scissorhands', checkIn: '2024-08-22', checkOut: '2024-08-25', roomType: 'Deluxe', status: 'Cancelled', total: '$210.00' },
];

type ReservationStatus = 'Confirmed' | 'Pending' | 'Checked-In' | 'Checked-Out' | 'Cancelled';


const statusColors: Record<ReservationStatus, string> = {
  Confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Checked-In': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Checked-Out': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};


export default function ReservationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline text-foreground">Reservations</h1>
        <p className="text-muted-foreground">Manage bookings, availability, and customer communication.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-headline">Current Bookings</CardTitle>
            <CardDescription>Overview of all reservations for La Luna Donde Mamá.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> New Reservation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{reservation.guestName}</TableCell>
                  <TableCell>{reservation.checkIn}</TableCell>
                  <TableCell>{reservation.checkOut}</TableCell>
                  <TableCell>{reservation.roomType}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${statusColors[reservation.status as ReservationStatus]}`}>
                      {reservation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{reservation.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground" data-ai-hint="calendar view">Future enhancement: Interactive calendar view for bookings.</p>
        </div>
    </div>
  );
}
