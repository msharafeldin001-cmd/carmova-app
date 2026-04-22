# Rydio Product Spec

## Goal
Launch a practical ride-hailing MVP with a low platform fee of **10%** to attract drivers early.

## MVP features
### Rider
- Register/login
- Set pickup and destination
- Fare estimate
- Request ride
- View current trip
- View past rides

### Driver
- Register/login
- Set online/offline status
- View available ride requests
- Accept a ride
- Complete ride
- View earnings

### Admin
- View drivers, riders, and trips
- View pricing model
- Set base fare, per-mile rate, and commission
- Monitor trip states

## Revenue model
- Platform keeps **10%** commission from each completed trip.
- Optional future revenue: booking fee, premium ride classes, subscriptions, airport surcharge.

## Suggested production integrations
- Maps: Google Maps Platform
- Payments: Stripe Connect
- Auth: Clerk/Auth0/Firebase Auth
- Notifications: Twilio + Firebase Cloud Messaging
- Hosting: Vercel + Railway or AWS
