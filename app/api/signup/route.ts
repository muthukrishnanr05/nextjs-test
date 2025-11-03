import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDbPool } from '../../../lib/db';
import bcrypt from 'bcryptjs';

const SignupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  password: z.string().min(8).max(100)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const pool = getDbPool();

    const [rows] = await pool.query<[{ count: number }] & any[]>(
      'SELECT COUNT(*) as count FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    const exists = Array.isArray(rows) ? (rows[0] as any)?.count > 0 : (rows as any)?.count > 0;
    if (exists) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, passwordHash]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


