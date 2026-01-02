# Quick Start - Deploy to Vercel in 10 Minutes

## Pre-Deployment Checklist

✅ Code pushed to GitHub
✅ MongoDB Atlas account created
✅ Vercel account created

---

## Step 1: Prepare MongoDB (2 minutes)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create FREE M0 cluster
3. Database Access → Add User (save password!)
4. Network Access → Allow `0.0.0.0/0`
5. Connect → Copy connection string:
   ```
   mongodb+srv://user:PASSWORD@cluster.mongodb.net/bepro_training?retryWrites=true&w=majority
   ```

---

## Step 2: Generate Session Secret (30 seconds)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output.

---

## Step 3: Deploy to Vercel (5 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
4. Add Environment Variables:
   - `MONGO_URL`: [Your MongoDB connection string]
   - `SESSION_SECRET`: [Your generated secret]
   - `NODE_ENV`: `production`
5. Click **Deploy**
6. Wait 2-5 minutes

---

## Step 4: Add Custom Domain (3 minutes)

1. Vercel → Your Project → Settings → Domains
2. Add your domain (e.g., `beprotraining.com`)
3. Go to your domain registrar (GoDaddy, Namecheap, etc.)
4. Add DNS record:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
5. Wait 5-30 minutes for DNS propagation

---

## Done! 🎉

Your site is live at:
- Vercel URL: `https://your-project.vercel.app`
- Custom domain: `https://beprotraining.com` (after DNS propagation)

---

## Need Help?

See detailed guide: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
