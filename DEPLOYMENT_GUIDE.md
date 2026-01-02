# Complete Deployment Guide
## BeProTrainingandConsultancy - Git, GitHub & Vercel Setup

This guide provides step-by-step instructions for setting up Git, pushing to GitHub, deploying to Vercel, and connecting a custom domain.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initialize Fresh Git Repository](#step-1-initialize-fresh-git-repository)
3. [Create and Push to GitHub](#step-2-create-and-push-to-github)
4. [Deploy to Vercel](#step-3-deploy-to-vercel)
5. [Connect Custom Domain](#step-4-connect-custom-domain)
6. [Environment Variables Setup](#step-5-environment-variables-setup)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- [ ] **Git** installed ([download here](https://git-scm.com/downloads))
- [ ] **GitHub account** ([sign up here](https://github.com/join))
- [ ] **Vercel account** ([sign up here](https://vercel.com/signup))
- [ ] **MongoDB Atlas** account with a cluster ([setup guide](https://www.mongodb.com/cloud/atlas/register))
- [ ] **Domain name** (if using custom domain)
- [ ] **Node.js 18+** installed

Verify installations:
```bash
git --version
node --version
npm --version
```

---

## STEP 1: Initialize Fresh Git Repository

### 1.1 Initialize Git in Your Project

Open your terminal in the project directory and run:

```bash
# Initialize a new Git repository
git init

# Check Git status
git status
```

You should see all your project files listed as "Untracked files".

### 1.2 Stage All Files

```bash
# Add all files to staging area (respects .gitignore)
git add .

# Verify staged files
git status
```

**Important**: Ensure `.env` is NOT listed in the staged files (it should be ignored).

### 1.3 Create Your First Commit

```bash
# Create initial commit
git commit -m "Initial commit: BeProTrainingandConsultancy fullstack application"

# Verify commit
git log --oneline
```

---

## STEP 2: Create and Push to GitHub

### 2.1 Create New GitHub Repository

**Option A: Using GitHub Website**
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `BeProTrainingandConsultancy` (or your preferred name)
3. Description: "Full-stack training and consultancy platform"
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

**Option B: Using GitHub CLI** (if installed)
```bash
gh repo create BeProTrainingandConsultancy --public --source=. --remote=origin
```

### 2.2 Connect Local Repository to GitHub

Copy the commands from GitHub's "push an existing repository" section, or use:

```bash
# Add remote origin (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/BeProTrainingandConsultancy.git

# Verify remote
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 2.3 Verify Push

Visit your GitHub repository URL: `https://github.com/YOUR-USERNAME/BeProTrainingandConsultancy`

You should see all your files (except those in `.gitignore`).

---

## STEP 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub

**Method 1: Vercel Dashboard (Recommended for beginners)**

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Import your repository: `BeProTrainingandConsultancy`

**Method 2: Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel
```

### 3.2 Configure Project Settings

During import, configure these settings:

**Framework Preset**: `Other` (or `Vite` if available, but configure manually)

**Build Settings:**
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Root Directory**: `./` (leave as root)

### 3.3 Set Environment Variables (CRITICAL)

**Do this BEFORE first deployment!**

In Vercel Dashboard > Your Project > Settings > Environment Variables, add:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGO_URL` | `mongodb+srv://username:password@cluster.mongodb.net/dbname` | Production, Preview, Development |
| `SESSION_SECRET` | `[generated-secret-key]` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `PORT` | `3000` | Production, Preview, Development |

**Generate Secure Session Secret:**
```bash
# Run this command to generate a secure random key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `SESSION_SECRET`.

**MongoDB URL Format:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

Replace:
- `USERNAME`: Your MongoDB Atlas username
- `PASSWORD`: Your database user password (URL-encoded if it contains special characters)
- `cluster0.xxxxx`: Your actual cluster address
- `DATABASE_NAME`: Your database name (e.g., `bepro_training`)

### 3.4 Deploy

Click **"Deploy"** button.

Vercel will:
1. Clone your repository
2. Install dependencies (`npm install`)
3. Run build command (`npm run build`)
4. Deploy to production

**Deployment URL**: `https://your-project-name.vercel.app`

### 3.5 Verify Deployment

1. Visit your Vercel URL
2. Check the homepage loads correctly
3. Test API endpoints: `https://your-project-name.vercel.app/api/courses`
4. Check browser console for errors

---

## STEP 4: Connect Custom Domain

### 4.1 Add Domain in Vercel

1. Go to: Vercel Dashboard > Your Project > **Settings** > **Domains**
2. Enter your domain name (e.g., `beprotraining.com`)
3. Click **"Add"**

### 4.2 Configure DNS Records

Vercel will provide DNS configuration instructions. You need to add records to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

**Option A: Using Nameservers (Recommended)**

If Vercel suggests using their nameservers:
1. Copy Vercel's nameserver addresses
2. Go to your domain registrar's DNS settings
3. Replace existing nameservers with Vercel's nameservers
4. Save changes (propagation takes 24-48 hours)

**Option B: Using DNS Records**

Add these records in your domain registrar's DNS panel:

For root domain (`beprotraining.com`):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600
```

For www subdomain (`www.beprotraining.com`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**For subdomain** (e.g., `app.beprotraining.com`):
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: 3600
```

### 4.3 Verify Domain Configuration

**In Vercel Dashboard:**
1. Check domain status (may show "Pending" initially)
2. Wait for DNS propagation (usually 5-30 minutes, max 48 hours)
3. Status should change to **"Valid Configuration"**
4. SSL certificate will be automatically provisioned

**Manual Verification:**
```bash
# Check DNS propagation
nslookup beprotraining.com

# Check HTTPS certificate
curl -I https://beprotraining.com
```

### 4.4 Redirect Configuration (Optional)

**Redirect www to non-www (or vice versa):**

1. In Vercel Dashboard > Domains
2. Click on the domain you want to redirect FROM
3. Enable "Redirect to" and select the primary domain
4. Save

Example: `www.beprotraining.com` → `beprotraining.com`

### 4.5 Set Primary Domain

In Vercel Dashboard > Settings > Domains:
1. Find your preferred domain
2. Click three dots (⋯) next to it
3. Select **"Set as Primary"**
4. This will be used for deployment URLs and previews

---

## STEP 5: Environment Variables Setup

### 5.1 MongoDB Atlas Setup

**Create Production Database:**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (or use existing)
3. Database Access:
   - Create a database user
   - Set a strong password
   - Grant "Read and write to any database" permissions
4. Network Access:
   - Add IP Address: `0.0.0.0/0` (allow from anywhere)
   - **For production**: Whitelist only Vercel IPs (see Vercel docs)
5. Connect:
   - Click "Connect" > "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password

**Connection String Example:**
```
mongodb+srv://admin:MySecureP@ssw0rd@cluster0.abc12.mongodb.net/bepro_training?retryWrites=true&w=majority
```

### 5.2 Local Development Setup

**Create `.env` file** (never commit this):

```bash
# Copy from example
cp .env.example .env
```

Edit `.env`:
```env
# MongoDB (use your Atlas connection string)
MONGO_URL=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/bepro_training?retryWrites=true&w=majority

# Session secret (generate a unique one)
SESSION_SECRET=your-generated-secret-from-crypto-command

# Development mode
NODE_ENV=development

# Server port
PORT=5000
```

**Test locally:**
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit: `http://localhost:5000`

### 5.3 Sync Environment Variables

**Vercel CLI Method:**
```bash
# Pull environment variables from Vercel to local .env
vercel env pull

# Push local variables to Vercel (use with caution)
vercel env add
```

---

## STEP 6: Continuous Deployment

### 6.1 How It Works

Vercel automatically redeploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will:
1. Detect the push
2. Trigger a new build
3. Deploy to production (if on main branch)
4. Update your live site

### 6.2 Preview Deployments

Every branch and pull request gets a preview URL:

```bash
# Create a new branch
git checkout -b feature/new-feature

# Make changes and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

Vercel creates a preview: `https://your-project-git-feature-new-feature-username.vercel.app`

### 6.3 Production Deployments

Only commits to `main` branch deploy to production domain.

**To promote a preview to production:**
1. Merge branch to main via GitHub Pull Request
2. Or locally:
```bash
git checkout main
git merge feature/new-feature
git push origin main
```

---

## STEP 7: Post-Deployment Checks

### 7.1 Functionality Checklist

- [ ] Homepage loads correctly
- [ ] Navigation works (all routes accessible)
- [ ] API endpoints respond (`/api/courses`, `/api/user`)
- [ ] MongoDB connection successful (check Vercel logs)
- [ ] User registration works
- [ ] Login/logout functionality
- [ ] Admin panel accessible (if admin user exists)
- [ ] Forms submit correctly (contact, course application)
- [ ] Images and assets load
- [ ] CSS styles applied correctly
- [ ] Mobile responsiveness
- [ ] HTTPS enabled (green padlock in browser)

### 7.2 Performance Optimization

**Enable Vercel Features:**

1. **Analytics**: Vercel Dashboard > Analytics (enable)
2. **Speed Insights**: Vercel Dashboard > Speed Insights
3. **Image Optimization**: Automatically enabled
4. **Edge Caching**: Configure in `vercel.json` if needed

**Check Build Times:**
- Build should complete in under 2 minutes
- If slower, check for large dependencies

### 7.3 Monitoring

**Vercel Logs:**
```bash
# View real-time logs
vercel logs --follow

# View recent logs
vercel logs
```

**MongoDB Atlas Logs:**
1. Go to Atlas Dashboard
2. Select your cluster
3. Click "Metrics" to view database performance
4. Check "Real-time Performance Panel" for active connections

---

## Troubleshooting

### Issue: Build Fails on Vercel

**Symptoms:**
```
Error: Build failed with exit code 1
```

**Solutions:**
1. Check Vercel build logs for specific error
2. Verify `package.json` scripts are correct
3. Test build locally: `npm run build`
4. Ensure all dependencies are in `dependencies` (not `devDependencies`) if needed at runtime
5. Check Node.js version compatibility

**Fix Node.js Version:**

Create `.nvmrc` or `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

### Issue: Environment Variables Not Working

**Symptoms:**
- App crashes with "Missing MONGO_URL"
- Session errors

**Solutions:**
1. Verify variables are set in Vercel Dashboard > Settings > Environment Variables
2. Check variable names match exactly (case-sensitive)
3. Redeploy after adding variables: Vercel Dashboard > Deployments > Redeploy
4. For preview deployments, ensure variables are enabled for "Preview" environment

**Verify in Vercel:**
```bash
vercel env ls
```

---

### Issue: MongoDB Connection Fails

**Symptoms:**
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solutions:**
1. Verify `MONGO_URL` format is correct
2. Check MongoDB Atlas Network Access allows Vercel IPs (`0.0.0.0/0`)
3. Verify database user credentials
4. URL-encode password if it contains special characters:
   ```javascript
   // If password is: p@ss!word
   // Use: p%40ss%21word
   ```
5. Check cluster is not paused (in Atlas dashboard)

**Test Connection Locally:**
```bash
node -e "require('mongoose').connect(process.env.MONGO_URL).then(() => console.log('Connected')).catch(e => console.error(e))"
```

---

### Issue: Custom Domain Not Working

**Symptoms:**
- Domain shows "This domain is not configured"
- SSL certificate errors

**Solutions:**
1. Verify DNS propagation: `nslookup yourdomain.com`
2. Check DNS records are correctly configured
3. Wait 24-48 hours for full propagation
4. In Vercel, click "Refresh" next to domain status
5. Check domain registrar's DNS settings

**Force SSL Renewal:**
1. Vercel Dashboard > Domains
2. Click domain > "Refresh DNS"
3. Wait a few minutes

---

### Issue: Static Files Not Loading

**Symptoms:**
- Homepage works but CSS/JS fails to load
- 404 errors for `/assets/*` files

**Solutions:**
1. Verify build creates `dist/public/` directory
2. Check `vercel.json` routes configuration
3. Ensure static files are in correct directory
4. Test build locally: `npm run build && npm start`

**Fix `vercel.json` routes:**
```json
{
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/dist/public/assets/$1"
    }
  ]
}
```

---

### Issue: API Routes Return 404

**Symptoms:**
- `/api/*` endpoints not found
- Works locally but fails on Vercel

**Solutions:**
1. Check `vercel.json` routes for API paths
2. Verify server bundle path: `/dist/index.cjs`
3. Ensure Express routes are defined before static middleware
4. Check build output includes server code

**Verify Build Output:**
```bash
npm run build
ls -la dist/
# Should show: index.cjs and public/
```

---

### Issue: Session/Authentication Not Persisting

**Symptoms:**
- Users logged out after page refresh
- Session expires immediately

**Solutions:**
1. Verify `SESSION_SECRET` is set in Vercel
2. Check MongoDB session store is configured (connect-mongo)
3. Ensure secure cookie settings in production:
   ```javascript
   // In server/auth.ts or session config
   cookie: {
     secure: process.env.NODE_ENV === 'production', // HTTPS only
     httpOnly: true,
     maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
   }
   ```
4. Verify trust proxy is enabled for production

---

### Issue: Large Build Size / Slow Deployment

**Symptoms:**
- Build takes >5 minutes
- Deployment exceeds size limits

**Solutions:**
1. Check `node_modules` is in `.gitignore`
2. Remove unused dependencies: `npm prune`
3. Use `devDependencies` for build-only packages
4. Verify `.gitignore` excludes `dist/`, `.env`, etc.

**Analyze Build Size:**
```bash
npm run build
du -sh dist/
```

---

## Quick Reference Commands

### Git Commands
```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Description"

# Push to GitHub
git push origin main

# Create new branch
git checkout -b feature-name

# Pull latest changes
git pull origin main

# View commit history
git log --oneline
```

### Vercel CLI Commands
```bash
# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod

# View logs
vercel logs

# Environment variables
vercel env ls
vercel env add
vercel env pull

# Link local project to Vercel project
vercel link

# Check deployment status
vercel inspect
```

### npm Commands
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Seed database
npm run seed
```

---

## Security Best Practices

### 1. Never Commit Secrets
- [ ] `.env` is in `.gitignore`
- [ ] No hardcoded API keys in code
- [ ] Use environment variables for all secrets

### 2. Strong Credentials
```bash
# Generate secure session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Use strong MongoDB password (min 16 characters, mixed case, symbols)
```

### 3. MongoDB Security
- [ ] Use database-specific users (not admin user)
- [ ] Enable IP whitelisting in production
- [ ] Rotate credentials periodically
- [ ] Enable encryption at rest (MongoDB Atlas)

### 4. Vercel Security
- [ ] Enable Vercel Authentication for admin pages
- [ ] Set environment variables per environment
- [ ] Review deployment logs regularly
- [ ] Enable Vercel firewall rules (Pro plan)

### 5. Domain Security
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure HSTS headers
- [ ] Set up CAA DNS records
- [ ] Use strong domain registrar password + 2FA

---

## Additional Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Vite Documentation](https://vitejs.dev/)

### Support
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- MongoDB Support: [support.mongodb.com](https://support.mongodb.com/)
- GitHub Community: [github.community](https://github.community/)

---

## Summary Checklist

Before going live, ensure:

- [x] Git repository initialized
- [x] Code pushed to GitHub
- [x] `.gitignore` configured correctly
- [x] `.env` file NOT committed
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set in Vercel
- [ ] Project deployed to Vercel
- [ ] Production deployment successful
- [ ] Custom domain added (if applicable)
- [ ] DNS records configured
- [ ] SSL certificate active (HTTPS)
- [ ] All functionality tested
- [ ] API endpoints working
- [ ] Database connection verified
- [ ] Session persistence working
- [ ] Mobile responsiveness checked

---

**Congratulations!** Your BeProTrainingandConsultancy platform is now live and deployed.

For ongoing maintenance, remember to:
- Regularly update dependencies
- Monitor Vercel analytics and logs
- Backup MongoDB database
- Test before merging to main branch
- Use preview deployments for testing
