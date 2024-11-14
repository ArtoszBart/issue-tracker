#!/bin/sh
echo "Starting server container..."

echo "Migrating the databse..."
npm run db:migrate-prod

echo "Seeding the databse..."
npm run db:seed

echo "Starting the server..."
npm start