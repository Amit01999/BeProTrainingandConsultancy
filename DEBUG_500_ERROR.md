# Fix 500 Error - Backend API Issues

## What I Fixed

I've updated the code to fix common serverless issues:

### 1. ✅ Fixed MongoDB Connection ([server/db.ts](server/db.ts))
- Added connection caching for serverless (critical for Vercel)
- Improved error logging
- Disabled command buffering for serverless environment

### 2. ✅ Enhanced Error Logging ([api/index.ts](api/index.ts))
- Added detailed error logging
- Environment variable checking
- Request logging for debugging

---

## CRITICAL: Check Environment Variables

The most common cause of 500 errors is **missing environment variables**.

### Step 1: Verify in Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these are set:

| Variable Name | Status | Example Value |
|--------------|--------|---------------|
| `MONGO_URL` | ✅ Must be set | `mongodb+srv://user:pass@cluster.mongodb.net/bepro_training?retryWrites=true&w=majority` |
| `SESSION_SECRET` | ✅ Must be set | `a7f3c9b2e8d4f1a6c5b3e9d7...` (long random string) |
| `NODE_ENV` | ⚠️ Optional | `production` |

### Step 2: Add Missing Variables

If any are missing:

1. Click **"Add New"** button
2. Enter variable name and value
3. Select environments: **Production**, **Preview**, **Development** (all 3)
4. Click **"Save"**

### Step 3: Redeploy

After adding variables:
1. Go to **Deployments** tab
2. Click three dots (⋯) on latest deployment
3. Click **"Redeploy"**

---

## How to Check Vercel Logs

### Method 1: Vercel Dashboard

1. Go to your project in Vercel
2. Click **"Deployments"** tab
3. Click on the **latest deployment**
4. Click **"View Function Logs"** button
5. Look for error messages

**What to look for**:
- ❌ `MONGO_URL environment variable is not set!`
- ❌ `MongooseServerSelectionError`
- ❌ `MODULE_NOT_FOUND`
- ✅ `MongoDB connected successfully`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# View real-time logs
vercel logs --follow

# View logs for specific deployment
vercel logs [deployment-url]
```

---

## Deploy the Fixes

### Step 1: Commit Changes

```bash
git add .
git commit -m "Fix: MongoDB connection for serverless + enhanced logging"
git push origin main
```

### Step 2: Wait for Deployment (2-3 minutes)

Vercel will auto-deploy. Watch progress in Vercel Dashboard.

### Step 3: Check Logs

Immediately after deployment:
1. Go to Vercel Dashboard → Deployments → Latest
2. Click **"View Function Logs"**
3. Refresh your site (trigger an API call)
4. Watch logs appear in real-time

**Expected logs**:
```
Environment check: { hasMongoUrl: true, hasSessionSecret: true, nodeEnv: 'production' }
Creating new MongoDB connection...
MongoDB connected successfully
[2024-01-03T...] GET /api/courses
```

---

## Troubleshooting by Error Message

### Error: "MONGO_URL must be set"

**Cause**: Environment variable not configured in Vercel

**Solution**:
1. Vercel Dashboard → Settings → Environment Variables
2. Add `MONGO_URL` with your MongoDB Atlas connection string
3. Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
4. Redeploy

### Error: "MongooseServerSelectionError: connect ECONNREFUSED"

**Cause**: MongoDB Atlas network access not configured

**Solution**:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. **Network Access** → **Add IP Address**
4. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
5. Save and wait 2 minutes

### Error: "Authentication failed"

**Cause**: Wrong MongoDB credentials

**Solution**:
1. Check MongoDB Atlas → Database Access
2. Verify user exists and has correct permissions
3. Copy connection string again from **Connect** button
4. Replace `<password>` with actual password
5. If password has special characters (`@`, `#`, `!`), URL-encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `!` → `%21`

### Error: "Cannot find module '../server/routes'"

**Cause**: Build issue or missing dependencies

**Solution**:
1. Verify all files exist in repository
2. Check `package.json` has all dependencies
3. Force rebuild:
   ```bash
   vercel --force --prod
   ```

---

## Test Locally First

Before pushing, test locally with Vercel dev:

```bash
# Install Vercel CLI
npm install -g vercel

# Link to your Vercel project
vercel link

# Pull environment variables
vercel env pull

# Run dev server
vercel dev
```

Then test:
- `http://localhost:3000/` (homepage)
- `http://localhost:3000/api/courses` (should return JSON)

---

## Environment Variable Checklist

### MongoDB Connection String Format

```
mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DATABASE>?retryWrites=true&w=majority
```

**Replace**:
- `<USERNAME>`: MongoDB database user (NOT your Atlas login)
- `<PASSWORD>`: Database user password (URL-encoded if special chars)
- `<CLUSTER>`: Your cluster address (e.g., `cluster0.abc12`)
- `<DATABASE>`: Database name (e.g., `bepro_training`)

**Example**:
```
mongodb+srv://bepro_admin:MySecureP%40ss@cluster0.abc12.mongodb.net/bepro_training?retryWrites=true&w=majority
```

### Session Secret

Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output (64 character hex string).

---

## Verify MongoDB Atlas Setup

### 1. Database Access
- [ ] User created with password
- [ ] User has "Read and write to any database" permission
- [ ] Password saved securely

### 2. Network Access
- [ ] IP whitelist includes `0.0.0.0/0` (allow from anywhere)
- [ ] OR specific Vercel IP ranges added

### 3. Cluster Status
- [ ] Cluster is NOT paused
- [ ] Cluster is accessible
- [ ] Connection string copied correctly

### 4. Test Connection

Use MongoDB Compass or VS Code extension to test connection string locally before deploying.

---

## Quick Debug Checklist

Run through this checklist:

1. [ ] Environment variables set in Vercel (all 3 environments)
2. [ ] MongoDB Atlas network access allows `0.0.0.0/0`
3. [ ] MongoDB Atlas user exists with correct permissions
4. [ ] Connection string format is correct
5. [ ] Password in connection string is URL-encoded (if needed)
6. [ ] Latest code pushed to GitHub
7. [ ] Vercel deployed successfully (no build errors)
8. [ ] Checked Vercel function logs for specific error

---

## Next Steps

1. **Push the fixes**:
   ```bash
   git add .
   git commit -m "Fix: MongoDB serverless connection + logging"
   git push origin main
   ```

2. **Verify environment variables** in Vercel Dashboard

3. **Check logs** after deployment:
   - Vercel Dashboard → Deployments → Latest → View Function Logs

4. **Test API endpoints**:
   - `https://your-project.vercel.app/api/courses`
   - Should return JSON (not 500 error)

---

## If Still Getting 500 Errors

### Share Your Logs

Check Vercel function logs and look for:
1. What error message appears?
2. Does it say "MONGO_URL not set"?
3. Does it show MongoDB connection error?
4. Any other error messages?

### Common Patterns

**If logs show**: `MONGO_URL environment variable is not set!`
→ Add environment variable in Vercel

**If logs show**: `MongooseServerSelectionError`
→ Fix MongoDB Atlas network access

**If logs show**: `Authentication failed`
→ Check MongoDB credentials

**If no logs appear**:
→ Function might not be deploying; check build logs

---

## Success Indicators

✅ **Logs show**:
```
Environment check: { hasMongoUrl: true, hasSessionSecret: true, nodeEnv: 'production' }
MongoDB connected successfully
[timestamp] GET /api/courses 200 in 45ms
```

✅ **API returns data**:
```json
[
  {
    "id": "...",
    "title": "Graphic Design",
    "category": "NSDA",
    ...
  }
]
```

✅ **No 500 errors in browser console**

---

Your backend should work after these fixes! 🚀

The key issues were:
1. MongoDB connection not optimized for serverless
2. Missing error logging to debug issues
3. Environment variables might not be set

Follow the steps above and check the logs!
