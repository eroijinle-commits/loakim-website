#!/bin/bash
set -e

echo "🔍 LOAKIM PREFLIGHT CHECK"
echo "=========================="

# 1. TypeScript compilation
echo ""
echo "1️⃣  TypeScript Compilation Check"
npx tsc --noEmit
if [ $? -eq 0 ]; then
  echo "✅ TypeScript compiles with zero errors"
else
  echo "❌ TypeScript compilation failed"
  exit 1
fi

# 2. Build verification
echo ""
echo "2️⃣  Build Verification"
npm run build
if [ $? -eq 0 ]; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

# 3. Check for .env
echo ""
echo "3️⃣  Environment Variables Check"
if [ -f .env ]; then
  echo "✅ .env file exists"
else
  echo "⚠️  .env file missing — copy from .env.example"
fi

# 4. Check node_modules
echo ""
echo "4️⃣  Dependencies Check"
if [ -d node_modules ]; then
  echo "✅ node_modules exists"
else
  echo "❌ node_modules missing — run npm install"
  exit 1
fi

echo ""
echo "=========================="
echo "✅ ALL CHECKS PASSED"
echo "Ready for deployment."
