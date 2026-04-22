# How to connect getrydio.com to this project

## 1) Register the domain
Use your preferred registrar and buy `getrydio.com` if available.

## 2) Create DNS records
- `@` -> rider frontend hosting target
- `www` -> rider frontend hosting target
- `driver` -> driver frontend hosting target
- `admin` -> admin frontend hosting target
- `api` -> API hosting target

## 3) Deploy apps
Suggested mapping:
- Rider app -> Vercel project `rydio-rider`
- Driver app -> Vercel project `rydio-driver`
- Admin app -> Vercel project `rydio-admin`
- API -> Railway/Render/AWS service `rydio-api`

## 4) Update environment variables
Set these in production:
- PUBLIC_DOMAIN=getrydio.com
- RIDER_APP_URL=https://getrydio.com
- DRIVER_APP_URL=https://driver.getrydio.com
- ADMIN_APP_URL=https://admin.getrydio.com
- API_URL=https://api.getrydio.com
- COMMISSION_RATE=0.10

## 5) SSL
Turn on HTTPS certificates in your hosting provider or Nginx using Let's Encrypt.
