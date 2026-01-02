#!/bin/bash
# Script to add environment variables to Vercel
# Run: bash add-env.sh

echo "Adding environment variables to Vercel..."
echo "You'll need to confirm each one"

vercel env add MONGO_URL production
vercel env add MONGO_DB_NAME production  
vercel env add SESSION_SECRET production
vercel env add NODE_ENV production

echo "Done! Now redeploy with: vercel --prod"
