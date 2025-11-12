# Deployment Guide - Manus Video AI Studio

**Complete step-by-step guide for deploying your video analysis system to production**

---

## 🎯 Deployment Options

You have three main deployment options:

1. **Google Cloud Run** (Recommended) - Serverless, auto-scaling, cost-effective
2. **Vercel** - Fast, easy, great for frontend-heavy apps
3. **Netlify** - Simple, reliable, good for static sites with serverless functions

---

## 🚀 Option 1: Google Cloud Run (Recommended)

### Why Google Cloud Run?

- **Native Integration**: Best integration with Gemini API and Vertex AI
- **Auto-scaling**: Scales to zero when not in use, scales up automatically
- **Cost-effective**: Pay only for what you use
- **Fast**: Low latency for API calls to Google services

### Prerequisites

```bash
# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize gcloud
gcloud init

# Set your project
gcloud config set project YOUR_PROJECT_ID
```

### Step 1: Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 8080

CMD ["npm", "run", "preview", "--", "--port", "8080", "--host", "0.0.0.0"]
```

### Step 2: Create .dockerignore

```
node_modules
dist
.git
.env
*.log
```

### Step 3: Build and Deploy

```bash
# Build the container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/manusvideo

# Deploy to Cloud Run
gcloud run deploy manusvideo \
  --image gcr.io/YOUR_PROJECT_ID/manusvideo \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars VITE_GEMINI_API_KEY=your_api_key_here \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --max-instances 10
```

### Step 4: Configure Custom Domain (Optional)

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service manusvideo \
  --domain video.yourdomain.com \
  --region us-central1
```

### Cost Estimate

| Usage | Monthly Cost |
|:---|:---|
| 1,000 analyses | ~$10-15 |
| 10,000 analyses | ~$50-75 |
| 100,000 analyses | ~$300-500 |

---

## 🚀 Option 2: Vercel

### Why Vercel?

- **Zero Configuration**: Deploy with one command
- **Fast CDN**: Global edge network
- **Automatic HTTPS**: SSL certificates included
- **Great DX**: Excellent developer experience

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Configure vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_GEMINI_API_KEY": "@gemini_api_key"
  },
  "functions": {
    "api/**/*.ts": {
      "memory": 3008,
      "maxDuration": 300
    }
  }
}
```

### Step 3: Deploy

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add VITE_GEMINI_API_KEY production
```

### Step 4: Configure Custom Domain

```bash
# Add custom domain
vercel domains add video.yourdomain.com
```

### Cost Estimate

| Plan | Price | Limits |
|:---|:---|:---|
| Hobby | Free | 100 GB bandwidth, 100 GB-hrs compute |
| Pro | $20/month | 1 TB bandwidth, 1000 GB-hrs compute |
| Enterprise | Custom | Unlimited |

---

## 🚀 Option 3: Netlify

### Why Netlify?

- **Simple Setup**: Easy configuration
- **Serverless Functions**: Built-in API endpoints
- **Forms & Identity**: Additional features included
- **Good Free Tier**: Generous limits

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Configure netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

### Step 3: Deploy

```bash
# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod

# Set environment variables
netlify env:set VITE_GEMINI_API_KEY your_api_key_here
```

### Cost Estimate

| Plan | Price | Limits |
|:---|:---|:---|
| Starter | Free | 100 GB bandwidth, 300 build minutes |
| Pro | $19/month | 1 TB bandwidth, 25,000 build minutes |
| Business | $99/month | 4 TB bandwidth, unlimited builds |

---

## 🔒 Security Best Practices

### 1. Environment Variables

**Never** commit API keys to Git. Use environment variables:

```bash
# .env (DO NOT COMMIT)
VITE_GEMINI_API_KEY=your_key_here
VITE_VERTEX_PROJECT_ID=your_project_id
VITE_GCS_BUCKET_NAME=your_bucket_name
```

### 2. API Key Rotation

Rotate your API keys regularly:

```bash
# Generate new Gemini API key
# Visit: https://makersuite.google.com/app/apikey

# Update environment variables
gcloud run services update manusvideo \
  --update-env-vars VITE_GEMINI_API_KEY=new_key_here
```

### 3. Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
// src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
```

### 4. CORS Configuration

Configure CORS properly:

```typescript
// src/middleware/cors.ts
import cors from 'cors';

export const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
```

---

## 📊 Monitoring & Analytics

### 1. Google Cloud Monitoring

```bash
# Enable Cloud Monitoring
gcloud services enable monitoring.googleapis.com

# Create uptime check
gcloud monitoring uptime-checks create \
  --display-name="Manus Video Health Check" \
  --resource-type=uptime-url \
  --monitored-resource=url=https://your-app-url.com/health
```

### 2. Error Tracking (Sentry)

```bash
npm install @sentry/react @sentry/vite-plugin
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 3. Analytics (Google Analytics 4)

```typescript
// src/utils/analytics.ts
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize(process.env.VITE_GA_MEASUREMENT_ID!);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          VITE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          
      - name: Deploy to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v1
        with:
          service: manusvideo
          image: gcr.io/${{ secrets.GCP_PROJECT_ID }}/manusvideo
          region: us-central1
          credentials: ${{ secrets.GCP_SA_KEY }}
```

---

## 🧪 Testing Before Deployment

### 1. Local Testing

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
```

### 2. Load Testing

```bash
# Install k6
brew install k6  # macOS
# or
sudo apt-get install k6  # Ubuntu

# Create load test script
cat > load-test.js << 'EOF'
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '3m', target: 50 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://your-app-url.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
EOF

# Run load test
k6 run load-test.js
```

### 3. Security Scanning

```bash
# Install npm audit
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

---

## 📈 Performance Optimization

### 1. Enable Compression

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
});
```

### 2. Code Splitting

```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

const VideoAnalyzer = lazy(() => import('./components/VideoAnalyzer'));
const VideoGenerator = lazy(() => import('./components/VideoGenerator'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoAnalyzer />
      <VideoGenerator />
    </Suspense>
  );
}
```

### 3. Image Optimization

```bash
# Install image optimization plugin
npm install vite-plugin-imagemin --save-dev
```

```typescript
// vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
  ],
});
```

---

## 🐛 Troubleshooting

### Common Deployment Issues

#### 1. Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### 2. Environment Variables Not Working

```bash
# Verify environment variables
gcloud run services describe manusvideo --region us-central1 --format="value(spec.template.spec.containers[0].env)"

# Update if needed
gcloud run services update manusvideo \
  --update-env-vars VITE_GEMINI_API_KEY=your_key_here
```

#### 3. Out of Memory

```bash
# Increase memory limit
gcloud run services update manusvideo \
  --memory 4Gi \
  --region us-central1
```

#### 4. Timeout Issues

```bash
# Increase timeout
gcloud run services update manusvideo \
  --timeout 600 \
  --region us-central1
```

---

## 📞 Support & Resources

### Documentation

- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)

### Community

- [GitHub Issues](https://github.com/milosriki/manusvideo/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/gemini-api)

---

## ✅ Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables are set correctly
- [ ] API keys are rotated and secured
- [ ] CORS is configured properly
- [ ] Rate limiting is implemented
- [ ] Error tracking is set up (Sentry)
- [ ] Analytics is configured (Google Analytics)
- [ ] Monitoring is enabled (Cloud Monitoring)
- [ ] Load testing is completed
- [ ] Security scanning is done
- [ ] Performance optimization is applied
- [ ] CI/CD pipeline is configured
- [ ] Custom domain is mapped (if applicable)
- [ ] SSL certificate is active
- [ ] Backup strategy is in place

---

**Your video analysis system is now ready for production! 🎉**
