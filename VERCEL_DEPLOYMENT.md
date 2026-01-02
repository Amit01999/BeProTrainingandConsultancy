# Vercel Deployment Guide
## BeProTrainingandConsultancy - Complete Setup for Serverless Deployment

This guide specifically addresses deploying your fullstack Express + React application to Vercel's serverless environment.

---

## Understanding Your Setup

### Current Architecture
- **Frontend**: React (Vite) → builds to `dist/public/`
- **Backend**: Express.js with MongoDB
- **Build Output**:
  - Client: `dist/public/` (static files)
  - Server: `api/index.ts` (serverless function)

### What Changed for Vercel

✅ **Created**: [`api/index.ts`](api/index.ts) - Serverless entry point
✅ **Updated**: [`vercel.json`](vercel.json) - Vercel configuration
✅ **Updated**: [`script/build.ts`](script/build.ts) - Added mongoose to bundle
✅ **Updated**: [`.gitignore`](.gitignore) - Secure environment files

---

## Prerequisites Checklist

Before deploying, ensure you have:

- [x] Project pushed to GitHub
- [ ] **MongoDB Atlas** cluster ready ([create one](https://cloud.mongodb.com/))
- [ ] **Vercel account** ([sign up](https://vercel.com/signup))
- [ ] MongoDB connection string
- [ ] Secure session secret generated

---

## STEP 1: Prepare MongoDB Atlas

### 1.1 Create/Access Your Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in or create account
3. Create a **FREE M0 cluster** (if you don't have one)
   - Cloud Provider: AWS (or your preference)
   - Region: Choose closest to your users
   - Cluster Tier: M0 Sandbox (FREE)

### 1.2 Configure Database Access

1. In Atlas Dashboard → **Database Access**
2. Click **"Add New Database User"**
3. Authentication Method: Password
   - Username: `bepro_user` (or your choice)
   - Password: Generate secure password (save this!)
4. Database User Privileges: **"Atlas admin"** or **"Read and write to any database"**
5. Click **"Add User"**

### 1.3 Configure Network Access

1. In Atlas Dashboard → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (required for Vercel)
4. Confirm

⚠️ **Note**: In production, you can restrict to [Vercel's IP ranges](https://vercel.com/docs/concepts/edge-network/regions) for better security.

### 1.4 Get Connection String

1. In Atlas Dashboard → **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string:
   ```
   mongodb+srv://bepro_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database user password
6. Add database name before the `?`:
   ```
   mongodb+srv://bepro_user:yourpassword@cluster0.xxxxx.mongodb.net/bepro_training?retryWrites=true&w=majority
   ```

---

## STEP 2: Generate Session Secret

Run this command to generate a secure session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output - you'll need it for Vercel environment variables.

**Example output**:
```
a7f3c9b2e8d4f1a6c5b3e9d7f2a4c8b1e3d5f7a9c2b4e6d8f1a3c5b7e9d2f4a6
```

---

## STEP 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

#### 3.1 Import Repository

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your repositories
4. Select **"Import Git Repository"**
5. Find and click **"Import"** on your `BeProTrainingandConsultancy` repo

#### 3.2 Configure Project Settings

On the "Configure Project" page:

**Framework Preset**: `Vite` (Vercel should detect this automatically)

**Root Directory**: `./` (leave as root)

**Build and Output Settings**:
- ✅ Override build settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

#### 3.3 Add Environment Variables

**CRITICAL**: Add these BEFORE clicking "Deploy"

Click **"Environment Variables"** section and add:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGO_URL` | `mongodb+srv://user:pass@cluster.mongodb.net/bepro_training?retryWrites=true&w=majority` | Production, Preview, Development |
| `SESSION_SECRET` | [Your generated secret from Step 2] | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**Example**:
```env
MONGO_URL=mongodb+srv://bepro_user:MyP@ss123@cluster0.abc12.mongodb.net/bepro_training?retryWrites=true&w=majority
SESSION_SECRET=a7f3c9b2e8d4f1a6c5b3e9d7f2a4c8b1e3d5f7a9c2b4e6d8f1a3c5b7e9d2f4a6
NODE_ENV=production
```

⚠️ **Important Notes**:
- If your MongoDB password contains special characters (`@`, `#`, `!`, etc.), URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `!` → `%21`
  - Use this [URL encoder](https://www.urlencoder.org/)

#### 3.4 Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Run build (`npm run build`)
   - Deploy serverless functions and static files
3. Wait 2-5 minutes for deployment

#### 3.5 Verify Deployment

Once deployment completes:

1. Click **"Visit"** or go to the provided URL (e.g., `https://your-project.vercel.app`)
2. You should see your homepage

---

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd BeProTrainingandConsultancy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? [Select your account]
# - Link to existing project? N
# - Project name? BeProTrainingandConsultancy
# - In which directory is your code located? ./

# Add environment variables
vercel env add MONGO_URL
# Paste your MongoDB connection string

vercel env add SESSION_SECRET
# Paste your generated secret

vercel env add NODE_ENV
# Enter: production

# Deploy to production
vercel --prod
```

---

## STEP 4: Verify Everything Works

### 4.1 Check Homepage

Visit: `https://your-project.vercel.app`

✅ Page loads
✅ CSS styles applied
✅ Navigation works
✅ Images load

### 4.2 Check API Endpoints

Test in browser or Postman:

**Get Courses**:
```
GET https://your-project.vercel.app/api/courses
```

Expected: JSON array of courses

**Get User** (should return 401):
```
GET https://your-project.vercel.app/api/user
```

Expected: 401 Unauthorized (because not logged in)

### 4.3 Check MongoDB Connection

1. Go to Vercel Dashboard → Your Project → **"Deployments"**
2. Click the latest deployment
3. Click **"View Function Logs"**
4. Look for MongoDB connection messages

✅ Should see: `"MongoDB connected successfully"` or similar

❌ If errors, check:
- MongoDB connection string is correct
- Database user has correct permissions
- Network access allows `0.0.0.0/0`

### 4.4 Test User Registration

1. Go to your Vercel URL
2. Try to register a new account
3. Check if it works successfully

**If it fails**, check Vercel function logs for errors.

---

## STEP 5: Add Custom Domain

### 5.1 Add Domain in Vercel

1. Go to Vercel Dashboard → Your Project → **"Settings"** → **"Domains"**
2. Enter your domain name:
   - Root domain: `beprotraining.com`
   - OR subdomain: `app.beprotraining.com`
3. Click **"Add"**

### 5.2 Configure DNS Records

Vercel will show DNS configuration instructions. You need to add records at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

#### For Root Domain (`beprotraining.com`):

**Option 1: A Record** (Most common)
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600
```

**Option 2: CNAME to www + Redirect**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```
Then set up redirect from root to www in Vercel.

#### For Subdomain (`app.beprotraining.com`):

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: 3600
```

#### For www Subdomain:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 5.3 DNS Configuration by Registrar

**GoDaddy**:
1. Go to [GoDaddy DNS Management](https://dcc.godaddy.com/manage/dns)
2. Find your domain → Click DNS
3. Add record → Select type → Fill values → Save

**Namecheap**:
1. Dashboard → Domain List → Manage → Advanced DNS
2. Add New Record → Fill values → Save

**Cloudflare**:
1. Dashboard → Select domain → DNS → Add record
2. Fill values → Save

### 5.4 Verify Domain

1. Back in Vercel → Domains page
2. Wait for DNS propagation (5-30 minutes, max 48 hours)
3. Status should change from "Pending" to **"Valid Configuration"**
4. SSL certificate automatically provisioned by Vercel

**Check DNS propagation**:
```bash
nslookup beprotraining.com
```

### 5.5 Set as Primary Domain

1. In Vercel Domains list
2. Click three dots (⋯) next to your custom domain
3. Select **"Set as Primary"**
4. This makes it the default URL for your project

### 5.6 Configure Domain Redirect (Optional)

**Redirect www to non-www** (or vice versa):

1. Add both `beprotraining.com` and `www.beprotraining.com` to Vercel
2. Set one as primary
3. The other will automatically redirect to primary

---

## STEP 6: Post-Deployment Configuration

### 6.1 Enable Production Optimizations

**Vercel Automatically Provides**:
- ✅ HTTPS/SSL (free, auto-renewed)
- ✅ Global CDN
- ✅ Automatic compression (gzip/brotli)
- ✅ Edge caching for static files
- ✅ DDoS protection

### 6.2 Configure Build Settings (Optional)

In Vercel Dashboard → Settings → General:

**Node.js Version**: `18.x` (or `20.x`)

Add this to [package.json](package.json) to lock Node version:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 6.3 Set Up MongoDB Indexes (Performance)

Connect to MongoDB Atlas and create indexes:

```javascript
// In MongoDB Atlas → Collections → Select database → Create Index

// Sessions collection
db.sessions.createIndex({ "expires": 1 }, { expireAfterSeconds: 0 })

// Users collection
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "email": 1 })

// Courses collection
db.courses.createIndex({ "category": 1 })
db.courses.createIndex({ "isFeatured": 1 })

// Applications collection
db.applications.createIndex({ "userId": 1 })
db.applications.createIndex({ "courseId": 1 })
db.applications.createIndex({ "status": 1 })
```

### 6.4 Monitor Performance

**Enable Vercel Analytics**:
1. Vercel Dashboard → Your Project → **Analytics**
2. Click **"Enable"**
3. Monitor traffic, performance, and errors

**Enable Speed Insights**:
1. Vercel Dashboard → Your Project → **Speed Insights**
2. Install package:
   ```bash
   npm install @vercel/analytics
   ```
3. Add to [client/src/main.tsx](client/src/main.tsx):
   ```typescript
   import { Analytics } from '@vercel/analytics/react';

   // In your render:
   <Analytics />
   ```

---

## STEP 7: Continuous Deployment

### Auto-Deploy on Git Push

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update: description"
git push origin main
```

**What Happens**:
1. Vercel detects the push
2. Triggers new build
3. Runs tests (if configured)
4. Deploys to production
5. Updates your live site (2-5 minutes)

### Preview Deployments

Every branch and PR gets a preview URL:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

**Preview URL**: `https://your-project-git-feature-new-feature.vercel.app`

Test the preview before merging to main!

---

## STEP 8: Troubleshooting

### Issue: "Internal Server Error" (500)

**Check Function Logs**:
1. Vercel Dashboard → Deployments → Latest
2. Click **"View Function Logs"**
3. Look for error messages

**Common Causes**:
- MongoDB connection failed
- Environment variables missing
- Database user permissions

**Solution**:
```bash
# Verify env vars are set
vercel env ls

# Check MongoDB connection string format
# Should be: mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Issue: "Module not found" Errors

**Cause**: Dependencies not installed or wrong Node version

**Solution**:
1. Verify [package.json](package.json) has all dependencies
2. Check Node version in Vercel Settings
3. Redeploy:
   ```bash
   vercel --prod --force
   ```

### Issue: Static Files 404

**Cause**: Build output directory incorrect

**Solution**:
1. Verify build creates `dist/public/` directory
2. Check Vercel output directory setting: `dist/public`
3. Test build locally:
   ```bash
   npm run build
   ls -la dist/public/
   # Should show index.html and assets/
   ```

### Issue: API Routes 404

**Cause**: API routes not properly configured

**Solution**:
1. Verify [`api/index.ts`](api/index.ts) exists
2. Check [`vercel.json`](vercel.json) rewrites:
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "/api" }
     ]
   }
   ```
3. Redeploy

### Issue: Session/Auth Not Working

**Cause**: Session secret missing or cookies not working

**Solution**:
1. Verify `SESSION_SECRET` env var is set in Vercel
2. Check MongoDB session store connection
3. Ensure `secure` cookies only in production:
   ```typescript
   cookie: {
     secure: process.env.NODE_ENV === 'production',
     httpOnly: true,
     maxAge: 30 * 24 * 60 * 60 * 1000
   }
   ```

### Issue: MongoDB Connection Timeout

**Cause**: Network access not configured or wrong connection string

**Solution**:
1. MongoDB Atlas → Network Access → Ensure `0.0.0.0/0` is allowed
2. Verify connection string includes database name
3. Check password is URL-encoded
4. Test connection locally:
   ```bash
   node -e "require('mongoose').connect(process.env.MONGO_URL).then(() => console.log('OK')).catch(console.error)"
   ```

### Issue: Large Build Time / Timeout

**Cause**: Too many dependencies or large files

**Solution**:
1. Check `node_modules` is in `.gitignore`
2. Remove unused dependencies:
   ```bash
   npm prune
   ```
3. Move devDependencies:
   ```bash
   npm install --save-dev [package]
   ```

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bepro_training?retryWrites=true&w=majority` |
| `SESSION_SECRET` | Secure random key for sessions | `a7f3c9b2e8d4f1a6c5b3e9d7f2a4c8b1...` |
| `NODE_ENV` | Environment mode | `production` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_DB_NAME` | Override database name | from connection string |
| `PORT` | Server port (Vercel manages) | `3000` |

---

## Security Checklist

Before going live:

- [ ] `.env` file in `.gitignore` (never committed)
- [ ] Strong MongoDB password (16+ characters)
- [ ] Secure session secret (32+ bytes random)
- [ ] MongoDB user has minimal required permissions
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS configured if needed
- [ ] Rate limiting on API routes (consider adding)
- [ ] Input validation with Zod (already implemented)
- [ ] MongoDB network access restricted (or monitored)
- [ ] Regular dependency updates

---

## Performance Optimization Tips

### 1. Enable Caching Headers

Add to [`server/static.ts`](server/static.ts):
```typescript
app.use(express.static(distPath, {
  maxAge: '1y', // Cache static assets for 1 year
  immutable: true
}));
```

### 2. MongoDB Connection Pooling

Already configured in Mongoose, but verify:
```typescript
// In server/db.ts
mongoose.connect(mongoUrl, {
  maxPoolSize: 10, // Max connections
  minPoolSize: 2,  // Min connections
});
```

### 3. Compress Responses

Add compression middleware:
```bash
npm install compression
```

```typescript
import compression from 'compression';
app.use(compression());
```

### 4. Image Optimization

Use Vercel's image optimization:
```typescript
import Image from 'next/image';
// Or use Vercel's image CDN URLs
```

---

## Monitoring & Maintenance

### Check Deployment Health

**Vercel Dashboard**:
- **Deployments**: View deployment history and logs
- **Analytics**: Traffic and performance metrics
- **Functions**: Serverless function logs and performance

**MongoDB Atlas**:
- **Metrics**: Database performance
- **Real-time Performance**: Active connections
- **Alerts**: Set up alerts for high usage

### Regular Tasks

- **Weekly**: Review Vercel function logs for errors
- **Monthly**: Check MongoDB usage and performance
- **Quarterly**: Update dependencies
  ```bash
  npm outdated
  npm update
  ```
- **As Needed**: Review and rotate credentials

---

## Quick Reference Commands

### Vercel CLI Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME

# Pull environment variables to local
vercel env pull

# Link local project to Vercel
vercel link

# Inspect deployment
vercel inspect [URL]
```

### Build Commands

```bash
# Build locally
npm run build

# Test production build locally
npm run build && npm start

# Check types
npm run check

# Seed database (development only)
npm run seed
```

---

## Success Checklist

Before considering deployment complete:

- [x] Project builds successfully locally
- [x] All environment variables configured in Vercel
- [ ] MongoDB Atlas cluster accessible
- [ ] Vercel deployment successful
- [ ] Homepage loads at Vercel URL
- [ ] API endpoints responding correctly
- [ ] User registration/login works
- [ ] Database queries working
- [ ] Custom domain configured (if applicable)
- [ ] DNS records verified
- [ ] SSL certificate active (HTTPS)
- [ ] All routes accessible
- [ ] Mobile responsiveness checked
- [ ] Performance metrics acceptable

---

## Support & Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Runtime](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)

### Get Help
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- MongoDB Support: [support.mongodb.com](https://support.mongodb.com/)

---

**Congratulations!** 🎉

Your BeProTrainingandConsultancy platform is now deployed on Vercel with:
- ✅ Serverless API functions
- ✅ Global CDN for static files
- ✅ Automatic HTTPS
- ✅ MongoDB cloud database
- ✅ Continuous deployment from GitHub
- ✅ Custom domain (if configured)

Happy building!
