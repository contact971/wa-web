"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "./components/Section";

export default function Home() {
  const [nom, setNom] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    // Validation minimale (DG-proof, sobre)
    if (!nom.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("Veuillez compléter le nom, le courriel et le message.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          organisation,
          email, // IMPORTANT: l'API attend "email"
          message,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(
          "Impossible d’envoyer la demande pour le moment. Veuillez réessayer."
        );
        return;
      }

      setStatus("success");
      setNom("");
      setOrganisation("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Impossible d’envoyer la demande pour le moment. Veuillez réessayer."
      );
    }
  }

  const disabled = status === "loading";

  return (
    <main className="min-h-screen text-black">
    {/* Header */}
<header className="sticky top-0 z-50 border-b border-black/10 bg-white/55 backdrop-blur">
  {/* voile bleu / brume */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_20%_0%,rgba(59,130,246,0.18),transparent_60%),linear-gradient(to_bottom,rgba(59,130,246,0.08),rgba(255,255,255,0.00))]" />

  <div className="mx-auto max-w-6xl px-6">
    <div className="flex items-center justify-between py-3">
      {/* Identité */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight text-black">
          William Arseneault
        </span>
        <span className="text-xs text-gray-700">
          Interventions web — municipalités
        </span>
      </div>

      {/* Navigation desktop */}
      <nav className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
        <a href="#services" className="hover:text-black">Services</a>
        <a href="#mandats" className="hover:text-black">Mandats</a>
        <a href="#processus" className="hover:text-black">Processus</a>
        <a href="#realisations" className="hover:text-black">Réalisations</a>
        <a href="#faq" className="hover:text-black">FAQ</a>
        <a href="#contact" className="hover:text-black">Contact</a>
      </nav>

      {/* Bouton Menu mobile */}
      <button
        type="button"
        className="rounded-md border border-black/20 bg-white/70 px-3 py-2 text-sm font-medium text-black md:hidden"
        onClick={() => {
          const el = document.getElementById("mobile-menu");
          el?.classList.toggle("hidden");
        }}
      >
        Menu
      </button>
    </div>

    {/* Menu mobile */}
    <div
      id="mobile-menu"
      className="hidden border-t border-black/10 pb-4 pt-3 md:hidden"
    >
      <nav className="flex flex-col gap-3 text-sm text-gray-700">
        {[
          { href: "#services", label: "Services" },
          { href: "#mandats", label: "Mandats" },
          { href: "#processus", label: "Processus" },
          { href: "#realisations", label: "Réalisations" },
          { href: "#faq", label: "FAQ" },
          { href: "#contact", label: "Contact" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="hover:text-black"
            onClick={() => {
              const el = document.getElementById("mobile-menu");
              el?.classList.add("hidden");
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  </div>
</header>





      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-[0_40px_120px_rgba(59,130,246,0.25)] backdrop-blur">
          <div className="grid items-center gap-10 p-10 md:grid-cols-2">
            {/* Bloc texte — centré verticalement */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Interventions ciblées pour sites municipaux existants.
              </h1>

              <p className="mt-5 text-lg text-gray-700">
                Audit ciblé, correctifs prioritaires et validation avant mise en
                ligne. L’objectif&nbsp;: réduire les irritants, améliorer
                l’accessibilité de base et stabiliser l’existant avec une
                démarche défendable.
              </p>

              {/* 🔒 Verrou institutionnel */}
              <p className="mt-4 text-sm text-gray-600">
                Approche conçue pour des environnements municipaux&nbsp;:
                interventions traçables, documentation claire et validation avant
                toute mise en ligne.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Demander une proposition
                </a>

                <a
                  href="#mandats"
                  className="rounded-md border border-black/10 bg-white/60 px-6 py-3 font-medium hover:bg-white"
                >
                  Voir les mandats
                </a>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-700">
                <p>• Documentation claire (priorités, estimation et périmètre).</p>
                <p>
                  • Changements appliqués par étapes, avec validation avant mise
                  en ligne.
                </p>
                <p>
                  • Approche compatible avec les réalités des petites
                  municipalités.
                </p>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Services offerts partout au Québec.
              </p>
            </div>

            {/* Bloc visuel */}
            <div className="relative">
              {/* halo doux de fond */}
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-72 w-72 rounded-full bg-blue-400/30 blur-3xl" />
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 ring-1 ring-white/40 shadow-2xl">
                <Image
                  src="/hero-ui.png"
                  alt="Aperçu conceptuel (exemples, sans données municipales)."
                  fill
                  priority
                  className="object-cover rounded-xl saturate-95 contrast-95"
                />
                {/* overlay léger pour lisser l’image */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-white/10 to-transparent" />
              </div>

              <p className="mt-3 text-center text-xs text-gray-600">
                Aperçu conceptuel (exemples, sans données municipales).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section
        id="services"
        title="Services"
        subtitle="Des interventions ciblées, simples et durables — pour réduire les irritants et stabiliser l’existant."
      >
        {/* 🔒 Phrase de cadrage (anti “il va tout changer”) */}
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-gray-700">
          Les interventions sont volontairement ciblées afin de limiter les
          impacts, faciliter l’approbation interne et éviter les projets lourds.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🧾",
              title: "Analyse du site existant",
              desc: "Repérage des irritants : liens brisés, pages incohérentes, contenu difficile à trouver, erreurs visibles et points à risque.",
            },
            {
              icon: "🛠️",
              title: "Corrections et ajustements",
              desc: "Correctifs rapides : liens, pages, formulaires, menus, éléments qui « cassent » selon le navigateur ou les mises à jour.",
            },
            {
              icon: "📱",
              title: "Amélioration mobile",
              desc: "Meilleure lisibilité sur téléphone : boutons, espacements, menus, mise en page et cohérence de navigation.",
            },
            {
              icon: "🧰",
              title: "Suivi et prévention",
              desc: "Vérifications périodiques, mises à jour et petites corrections au besoin — pour éviter l’accumulation de problèmes.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm backdrop-blur transition
                   hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-[0_18px_60px_rgba(59,130,246,0.18)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100/80 text-lg ring-1 ring-black/5 transition group-hover:bg-white">
                {s.icon}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mandats */}
      <Section
        id="mandats"
        title="Types de mandats proposés"
        subtitle="Cadres d’intervention possibles, définis selon votre site, vos priorités et votre réalité organisationnelle."
      >
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* A */}
          <div className="rounded-2xl border border-black/10 bg-white/70 p-7 shadow-sm backdrop-blur">
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 text-black font-bold">
                  A
                </span>
                <h3 className="text-lg font-semibold">Audit ciblé</h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              <span className="font-semibold">Livrable :</span> rapport clair,
              priorités identifiées et estimation de charge.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              <li>• Pages clés (accueil, services, nous joindre)</li>
              <li>• Navigation, cohérence et lisibilité</li>
              <li>• Accessibilité de base (éléments essentiels)</li>
              <li>• Recommandations concrètes et priorisées</li>
            </ul>
          </div>

          {/* B */}
          <div className="rounded-2xl border border-black/15 bg-white/80 p-7 shadow-sm backdrop-blur">
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 text-black font-bold">
                  B
                </span>
                <h3 className="text-lg font-semibold">Audit + correctifs</h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              <span className="font-semibold">Livrable :</span> rapport,
              correctifs convenus et validation finale avant mise en ligne.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              <li>• Plan d’intervention priorisé</li>
              <li>• Correctifs ciblés (gains rapides, irritants)</li>
              <li>• Ajustements mobile et navigation</li>
              <li>• Mise en ligne après validation</li>
            </ul>
          </div>

          {/* C */}
          <div className="rounded-2xl border border-black/10 bg-white/70 p-7 shadow-sm backdrop-blur">
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/80 text-black font-bold">
                  C
                </span>
                <h3 className="text-lg font-semibold">Suivi préventif</h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              <span className="font-semibold">Livrable :</span> vérifications
              périodiques, petites corrections et compte rendu.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              <li>• Mises à jour et hygiène de base</li>
              <li>• Vérification des liens et formulaires</li>
              <li>• Corrections ponctuelles documentées</li>
              <li>• Recommandations au besoin</li>
            </ul>
          </div>
        </div>

        {/* Désamorçage + point d’entrée unique */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">
            Aucun engagement. Une proposition est préparée uniquement après
            compréhension du contexte, des priorités et des contraintes
            municipales.
          </p>

          <a
            href="#contact"
            className="mt-4 inline-flex items-center justify-center rounded-md border border-black px-6 py-3 font-medium hover:bg-white/60"
          >
            Discuter d’un mandat possible
          </a>
        </div>
      </Section>

      {/* Processus */}
      <Section
        id="processus"
        title="Processus défendable en contexte municipal"
        subtitle="Simple, clair et défendable — avec contrôle et validation avant mise en ligne."
      >
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "1",
              title: "Analyse",
              desc: "Lecture de l’existant et identification des priorités (gains rapides + irritants récurrents).",
            },
            {
              n: "2",
              title: "Rapport",
              desc: "Résumé clair : quoi corriger, pourquoi, dans quel ordre — avec estimation de charge.",
            },
            {
              n: "3",
              title: "Correctifs",
              desc: "Corrections ciblées. Si possible : environnement de test avant mise en ligne.",
            },
            {
              n: "4",
              title: "Validation",
              desc: "Vérification finale + compte rendu. Mise en ligne seulement après validation.",
            },
          ].map((p) => (
            <div
              key={p.n}
              className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100/80 font-bold">
                  {p.n}
                </span>
                <h3 className="font-semibold">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-700">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Réalisations */}
      <Section
        id="realisations"
        title="Réalisations"
        subtitle="Exemples de structure et de méthodologie — présentés sans données sensibles."
      >
        {/* 🔒 Phrase de cadrage institutionnelle */}
        <p className="mx-auto mt-2 max-w-3xl text-center text-sm text-gray-700">
          L’exemple présenté met l’accent sur la méthodologie, la structure et la
          documentation — et non sur l’organisation ou les données.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Texte */}
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h3 className="font-semibold">Référence sur demande (anonymisée)</h3>

            <p className="mt-3 text-sm text-gray-700">
              Exemple de réalisation démontrant une structure claire, maintenable
              et documentée : priorisation, plan d’intervention et validation
              avant mise en ligne.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Analyse et priorisation des irritants</li>
              <li>• Plan d’intervention structuré</li>
              <li>• Suivi de l’état d’avancement</li>
              <li>• Documentation des changements</li>
            </ul>

            <p className="mt-4 text-xs text-gray-600">
              Aperçu présenté à titre illustratif 
            </p>
          </div>

          {/* Visuel */}
          <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-black/10">
              <Image
                src="/livrable.anonymise.png"
                alt="Exemple de livrable anonymisé – priorisation et plan d’intervention"
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-3 text-xs text-gray-600 text-center">
              Exemple de livrable (anonymisé)
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
          <p className="mt-2 text-gray-700">Réponses simples, sans flou.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              q: "Est-ce qu’une refonte complète est nécessaire ?",
              a: "Rarement. L’approche vise d’abord à fiabiliser l’existant par des correctifs ciblés. Une refonte n’est envisagée que lorsque les limites techniques la rendent pertinente.",
            },
            {
              q: "Est-ce que l’objectif est de forcer une refonte du site ?",
              a: "Non. L’objectif est de fournir une information claire et structurée afin de permettre à la municipalité de décider en toute connaissance de cause. La décision finale reste entièrement de votre côté.",
            },
            {
              q: "Dans quel délai peut-on voir un résultat ?",
              a: "Souvent dès les premiers correctifs. Les actions sont priorisées (gains rapides d’abord), puis consolidées au besoin.",
            },
            {
              q: "Est-ce compatible avec WordPress ?",
              a: "Oui. L’objectif reste le même : clarté, stabilité, performance perçue et maintenance simplifiée.",
            },
            {
              q: "La municipalité garde-t-elle le contrôle du site et des accès ?",
              a: "Oui. Vous conservez les accès et la propriété. Les changements sont documentés et validés avant mise en ligne.",
            },
            {
              q: "Pouvez-vous travailler avec notre fournisseur actuel ?",
              a: "Oui. Intervention possible en complément (correctifs ciblés) ou coordination avec votre fournisseur.",
            },
            {
              q: "Comment ça commence ?",
              a: "Prise de contact → quelques questions → proposition structurée (A/B/C) → exécution par étapes avec validation.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className={`rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur ${
                item.q === "Comment ça commence ?" ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
            <p className="mt-3 text-gray-700">
              Une demande concise permet une proposition claire et rapide.
              <span className="block mt-2 text-sm text-gray-600">
                Réponse habituelle : 1 à 2 jours ouvrables.
              </span>
            </p>

            <div className="mt-6 space-y-2 text-sm text-gray-700">
              <p className="font-semibold">
                William Arseneault — Consultant – Solutions web
              </p>
              <p>📧 william.arsenault@hotmail.ca</p>
              <p>📞 450-513-4490</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-black/10 bg-white/70 p-8 backdrop-blur"
          >
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium" htmlFor="nom">
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black"
                  placeholder="Nom"
                  autoComplete="name"
                  disabled={disabled}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="organisation">
                  Municipalité / Organisation (optionnel)
                </label>
                <input
                  id="organisation"
                  name="organisation"
                  type="text"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  className="mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black"
                  placeholder="Organisation"
                  disabled={disabled}
                />
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="courriel">
                  Courriel
                </label>
                <input
                  id="courriel"
                  name="courriel"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black"
                  placeholder="courriel@exemple.com"
                  autoComplete="email"
                  disabled={disabled}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full resize-none rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black"
                  placeholder="URL du site, priorités, irritants observés, délais souhaités…"
                  disabled={disabled}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={disabled}
                className="mt-2 rounded-md bg-black px-5 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {status === "loading" ? "Envoi…" : "Soumettre la demande"}
              </button>

              {status === "success" && (
                <p className="text-sm text-green-700">
                  Demande transmise. Un retour vous sera fait après analyse du
                  contexte.
                </p>
              )}

              {status === "error" && (
                <p className="text-sm text-red-700">
                  {errorMsg ||
                    "Impossible d’envoyer la demande pour le moment. Veuillez réessayer."}
                </p>
              )}

              <p className="text-xs text-gray-600">
                Aucune donnée n’est conservée sur le site. Transmission par
                courriel.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-600">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} William Arseneault — Consultant –
              Solutions web
            </p>
            <p className="text-gray-500">Services municipaux — Québec</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
