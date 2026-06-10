'use client';

import { useState } from 'react';
import { CheckIcon } from './icons';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <div className="border-b border-brand-800 bg-brand-950">
      <div className="container-x flex flex-col items-center gap-6 py-10 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white">Ne ratez aucune promotion !</h2>
          <p className="mt-1 text-sm text-brand-300">
            Inscrivez-vous à notre newsletter et recevez nos arrivages de palettes en avant-première.
          </p>
        </div>
        {done ? (
          <p className="flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-medium text-accent-300">
            <CheckIcon className="h-5 w-5" /> Merci ! Votre inscription est enregistrée.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes('@')) setDone(true);
            }}
            className="flex w-full max-w-md gap-2"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Votre adresse e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="h-12 flex-1 rounded-lg border border-brand-700 bg-brand-900 px-4 text-sm text-white outline-none placeholder:text-brand-400 focus:border-accent-400"
            />
            <button type="submit" className="btn-primary shrink-0">
              S&apos;inscrire
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
