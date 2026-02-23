#!/bin/bash
# deploy-local.sh (Run on Mac)

USER="sundaradmin"
HOST="68.178.163.170"

echo "🚀 Step 1: Building and Uploading..."

# Build and archive
bun run build || { echo "❌ Build failed"; exit 1; }
COPYFILE_DISABLE=1 tar --no-xattrs -czvf build.tar.gz .next/standalone .next/static public

# Upload to VPS
echo "📤 Uploading to server... (Enter password when prompted)"
scp build.tar.gz $USER@$HOST:/tmp/

echo "✅ Upload complete. Now log into your server and run ./make-live.sh"
rm build.tar.gz