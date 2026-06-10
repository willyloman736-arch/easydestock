'use client';

import { useState } from 'react';
import { CheckIcon } from './icons';
import { mailtoLink } from '@/lib/site';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend in this front-end rebuild: open the user's mail client pre-filled.
    const subject = encodeURIComponent(`Demande de ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `${mailtoLink}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-6">
        <CheckIcon className="mt-0.5 h-6 w-6 shrink-0 text-accent-600" />
        <div>
          <p className="font-semibold text-brand-900">Merci pour votre message !</p>
          <p className="mt-1 text-sm text-brand-600">
            Votre logiciel de messagerie vient de s’ouvrir. Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-800">
          Votre nom <span className="text-sale">*</span>
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="h-12 w-full rounded-lg border border-brand-200 px-4 text-sm outline-none focus:border-accent-400"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-800">
          Votre e-mail <span className="text-sale">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="h-12 w-full rounded-lg border border-brand-200 px-4 text-sm outline-none focus:border-accent-400"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-800">
          Votre message <span className="text-sale">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-brand-200 px-4 py-3 text-sm outline-none focus:border-accent-400"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Envoyer le message
      </button>
    </form>
  );
}
