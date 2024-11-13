#!/bin/sh
echo "Starting server container..."

echo "Migrating the databse..."
npx prisma migrate deploy

echo "Seeding the databse..."
node prisma/seed.js

echo "Starting the server..."
npm start