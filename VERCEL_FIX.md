# Vercel 404 Fix - Deploy Instructions

## What Was Fixed

I've fixed the 404 error by correcting the Vercel configuration:

### Changes Made:

1. ✅ **Updated [vercel.json](vercel.json)**:
   - Changed from `rewrites` to `builds` and `routes` configuration
   - Properly configured API serverless function routing
   - Fixed static file serving paths

2. ✅ **Updated [api/index.ts](api/index.ts)**:
   - Removed static file serving (Vercel CDN handles this)
   - Added error handling to the handler
   - Kept only API route handling in serverless function

3. ✅ **Updated [package.json](package.json)**:
   - Added `vercel-build` script for Vercel's build process

---

## Deploy Fixed Version

### Step 1: Commit and Push Changes

```bash
git add .
git commit -m "Fix: Vercel 404 error - update configuration for serverless deployment"
git push origin main
```

### Step 2: Vercel Will Auto-Deploy

Vercel will automatically detect the push and redeploy with the new configuration.

**OR** manually trigger a redeploy:

1. Go to Vercel Dashboard → Your Project
2. Click **"Deployments"** tab
3. Find the latest deployment
4. Click three dots (⋯) → **"Redeploy"**

---

## Step 3: Verify After Deployment

Once deployed, test these URLs:

### Homepage
```
https://your-project.vercel.app/
```
✅ Should show your React app homepage

### API Endpoint
```
https://your-project.vercel.app/api/courses
```
✅ Should return JSON with courses array

### Check Logs
If still having issues:
1. Vercel Dashboard → Deployments → Latest
2. Click on deployment → **"View Function Logs"**
3. Look for errors

---

## What the Configuration Does Now

### Builds
```json
"builds": [
  {
    "src": "api/index.ts",          // ← API serverless function
    "use": "@vercel/node"
  },
  {
    "src": "package.json",           // ← Client build
    "use": "@vercel/static-build",
    "config": { "distDir": "dist/public" }
  }
]
```

### Routes
```json
"routes": [
  {
    "src": "/api/(.*)",              // ← All /api/* → serverless function
    "dest": "/api/index.ts"
  },
  {
    "src": "/assets/(.*)",           // ← Static assets from build
    "dest": "/dist/public/assets/$1"
  },
  {
    "src": "/(.*)",                  // ← Try to serve static file
    "dest": "/dist/public/$1"
  },
  {
    "src": "/(.*)",                  // ← Fallback to index.html (React Router)
    "dest": "/dist/public/index.html"
  }
]
```

---

## Expected Behavior After Fix

✅ `/` → React app (homepage)
✅ `/courses` → React app (courses page)
✅ `/api/courses` → API endpoint (JSON response)
✅ `/api/user` → API endpoint (401 if not logged in)
✅ `/assets/*` → Static files from build

---

## If Still Getting 404

### Check 1: Environment Variables

Make sure these are set in Vercel:
- `MONGO_URL`
- `SESSION_SECRET`
- `NODE_ENV=production`

### Check 2: Build Output

Verify build creates correct output:
```bash
npm run build
ls -la dist/public/    # Should have index.html and assets/
```

### Check 3: API Function

Test locally first:
```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

Then visit:
- `http://localhost:3000/` (homepage)
- `http://localhost:3000/api/courses` (API)

---

## Common Issues & Solutions

### Issue: Build Fails

**Error**: `Cannot find module 'api/index.ts'`

**Solution**: Make sure `api/index.ts` exists in your repository root:
```bash
ls -la api/index.ts
```

### Issue: API Returns 500

**Error**: Internal Server Error

**Solution**: Check MongoDB connection:
1. Verify `MONGO_URL` is correct
2. Check MongoDB Atlas network access allows `0.0.0.0/0`
3. View Vercel function logs for detailed error

### Issue: Static Files Missing

**Error**: CSS/JS not loading

**Solution**: Check build output directory:
1. Verify `vercel.json` has `"distDir": "dist/public"`
2. Ensure build creates `dist/public/` with files
3. Check browser dev tools for 404s on specific files

---

## Next Steps

1. **Push changes to GitHub**
2. **Wait for Vercel auto-deploy** (2-3 minutes)
3. **Test your Vercel URL**
4. **Add custom domain** (if not done yet)

---

## Need More Help?

**View Logs**:
```bash
vercel logs --follow
```

**Inspect Deployment**:
```bash
vercel inspect [deployment-url]
```

**Redeploy**:
```bash
vercel --prod
```

---

Your deployment should work now! 🚀
