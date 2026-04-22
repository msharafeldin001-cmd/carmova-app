import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.example' });

const app = express();
const port = process.env.PORT || 4000;
const commissionRate = Number(process.env.COMMISSION_RATE || 0.10);

app.use(cors());
app.use(express.json());

const state = {
  riders: [{ id: 'r1', name: 'Demo Rider', email: 'rider@getrydio.com' }],
  drivers: [
    { id: 'd1', name: 'Amir Khan', car: 'Toyota Prius', plate: 'RYD-101', online: true, earnings: 0 },
    { id: 'd2', name: 'Sarah Ali', car: 'Skoda Octavia', plate: 'RYD-202', online: false, earnings: 0 }
  ],
  trips: []
};

function calculateFare(distanceMiles, durationMinutes) {
  const baseFare = 2.5;
  const perMile = 1.25;
  const perMinute = 0.18;
  const subtotal = baseFare + distanceMiles * perMile + durationMinutes * perMinute;
  const platformFee = Number((subtotal * commissionRate).toFixed(2));
  const driverNet = Number((subtotal - platformFee).toFixed(2));
  return {
    baseFare,
    perMile,
    perMinute,
    subtotal: Number(subtotal.toFixed(2)),
    platformFee,
    driverNet,
    commissionRate
  };
}

app.get('/', (_, res) => {
  res.json({ ok: true, app: 'Rydio API', commissionRate });
});

app.get('/pricing/quote', (req, res) => {
  const distanceMiles = Number(req.query.distance || 4.2);
  const durationMinutes = Number(req.query.duration || 14);
  res.json(calculateFare(distanceMiles, durationMinutes));
});

app.get('/drivers', (_, res) => {
  res.json(state.drivers);
});

app.patch('/drivers/:id/status', (req, res) => {
  const driver = state.drivers.find((d) => d.id === req.params.id);
  if (!driver) return res.status(404).json({ error: 'Driver not found' });
  driver.online = !!req.body.online;
  res.json(driver);
});

app.get('/trips', (_, res) => res.json(state.trips));

app.post('/trips/request', (req, res) => {
  const { riderId = 'r1', pickup, destination, distanceMiles = 4.2, durationMinutes = 14 } = req.body;
  const quote = calculateFare(Number(distanceMiles), Number(durationMinutes));
  const availableDriver = state.drivers.find((d) => d.online);
  const trip = {
    id: `t${Date.now()}`,
    riderId,
    driverId: availableDriver?.id || null,
    pickup,
    destination,
    status: availableDriver ? 'driver_assigned' : 'searching',
    quote,
    createdAt: new Date().toISOString()
  };
  state.trips.unshift(trip);
  res.status(201).json(trip);
});

app.post('/trips/:id/accept', (req, res) => {
  const trip = state.trips.find((t) => t.id === req.params.id);
  const { driverId } = req.body;
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  trip.driverId = driverId;
  trip.status = 'driver_arriving';
  res.json(trip);
});

app.post('/trips/:id/complete', (req, res) => {
  const trip = state.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  trip.status = 'completed';
  const driver = state.drivers.find((d) => d.id === trip.driverId);
  if (driver) driver.earnings = Number((driver.earnings + trip.quote.driverNet).toFixed(2));
  res.json(trip);
});

app.listen(port, () => {
  console.log(`Rydio API running on http://localhost:${port}`);
});
