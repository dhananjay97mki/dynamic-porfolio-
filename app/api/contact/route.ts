import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or message' },
        { status: 400 }
      );
    }

    await saveContactMessage({
      name,
      email,
      subject: subject || 'Portfolio Contact Form Inquiry',
      message,
    });

    return NextResponse.json(
      { success: true, message: 'Message received successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
