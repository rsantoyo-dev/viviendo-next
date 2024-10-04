// app/api/properties/route.ts
import { fetchProperties } from '@/app/middleware/requests';
import { NextResponse } from 'next/server';

// Define the GET request handler
export async function GET() {
  try {
    // Call the service function to fetch properties
    const properties = await fetchProperties();

    // Return the fetched properties in JSON format
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    
    // Return a 500 error if something goes wrong
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}
