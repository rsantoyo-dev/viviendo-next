// app/api/properties/route.ts
import { NextResponse } from 'next/server';

// Define the GET request handler
export async function GET() {
 return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
