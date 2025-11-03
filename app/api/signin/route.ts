import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDbPool } from '../../../lib/db';
import bcrypt from 'bcryptjs';

const SigninSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SigninSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const pool = getDbPool();

    const [rows] = await pool.query<any[]>
      ('SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1', [email]);

    const user = Array.isArray(rows) ? rows[0] as any : rows as any;
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // In a real app, issue a session/cookie/JWT here
    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


