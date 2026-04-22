# Carmova 

Carmova is a ride-hailing platform for booking, driver management, and trip tracking.

## Brand
- Product: **Carmova**
- Working domain: **https://carmova.uk**
- Platform commission: **10%**

## Apps
- `apps/api` - Express API with mock data and commission logic
- `apps/rider` - Rider booking frontend
- `apps/driver` - Driver trip frontend
- `apps/admin` - Admin dashboard frontend

## What this starter includes
- Rider flow: quote, request ride, trip history
- Driver flow: online status, incoming trips, accept trip, earnings view
- Admin flow: trips, drivers, pricing, platform commission
- Environment placeholders for domain setup and deployment
- Nginx config example for `carmova.uk`, `api.carmova.uk`, and `admin.carmova.uk`

## Limits
This package does not register the domain, deploy the apps, or process real card payments automatically. You will still need to:
1. Register `carmova.uk` at your chosen registrar.
2. Point DNS records to your server or hosting providers.
3. Add a real maps provider, and payment processor.

## Quick start
```bash
npm install
npm run dev
```

## Domain plan
- `carmova.uk` -> rider app
- `driver.carmova.uk` -> driver app
- `admin.carmova.uk` -> admin dashboard
- `api.carmova.uk` -> backend API

## Commission model
The platform fee is set to `10%` in the API pricing service.

## Suggested next steps
1. Register the domain.
2. Put this monorepo on GitHub.
3. Deploy apps on Vercel/Netlify and API on Railway/Render/AWS.
4. Replace mock auth and payments with production services.
