import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { type Express } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { storage } from './storage';
import { User as SelectUser } from '@shared/schema';

const scryptAsync = promisify(scrypt);

const crypto = {
  hash: async (password: string) => {
    const salt = randomBytes(16).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  },
  compare: async (storedPassword: string, suppliedPassword: string) => {
    const [hashed, salt] = storedPassword.split('.');
    const hashedPasswordBuf = Buffer.from(hashed, 'hex');
    const suppliedPasswordBuf = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  },
};

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

export async function setupAuth(app: Express) {
  const dbName = process.env.MONGO_DB_NAME || 'BeProTrainingandConsultancy';

  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL is required for the session store');

  const store = MongoStore.create({
    mongoUrl,
    dbName,
    collectionName: 'sessions',
    ttl: 30 * 24 * 60 * 60,       // 30 days — matches cookie maxAge
    touchAfter: 24 * 60 * 60,     // re-save session at most once per day
    autoRemove: 'native',
  });

  store.on('error', err => {
    console.error('[session-store] error:', err?.message || err);
  });
  store.on('connected', () => {
    console.log('[session-store] connected to MongoDB');
  });

  const sessionSettings: session.SessionOptions = {
    store,
    secret: process.env.SESSION_SECRET || 'super secret session key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: app.get('env') === 'production',
      httpOnly: true,
      sameSite: 'lax',
    },
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await crypto.compare(user.password, password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => done(null, user.id ?? user._id));

  passport.deserializeUser(async (id: string, done) => {
    console.log('[auth] deserializeUser called with id:', id);
    try {
      const user = await storage.getUser(id);
      console.log('[auth] deserializeUser found user:', !!user, user?.username);
      // Return false (not an error) for missing/invalid users so a stale
      // session cookie logs the user out gracefully instead of surfacing 500.
      done(null, user ?? false);
    } catch (err) {
      console.warn('[auth] deserializeUser soft-failure:', (err as Error)?.message);
      done(null, false);
    }
  });

  return crypto;
}
