
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  Clock3,
  CreditCard,
  Headphones,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

const WHATSAPP = "237655046802";

const faqSections = [
  {
    title: "La boutique",
    icon: ShoppingBag,
    questions: [
      {
        q: "Qu'est-ce qu'Ousmane Chicha ?",
        a: "Ousmane Chicha est une boutique spécialisée dans la vente de chichas, de saveurs et d'accessoires. Nous proposons nos produits aux particuliers comme aux professionnels.",
      },
      {
        q: "Où se trouve votre boutique ?",
        a: "Notre boutique est située à Douala, dans le quartier Bonamoussadi, en face du Yapaki. Vous pouvez nous contacter avant votre déplacement pour obtenir des indications supplémentaires.",
      },
      {
        q: "Quels types de produits proposez-vous ?",
        a: "Nous proposons des chichas, des accessoires et différents produits associés. Pour connaître les références disponibles et les nouveautés, consultez notre boutique en ligne ou contactez notre équipe.",
      },
      {
        q: "Puis-je venir directement en boutique ?",
        a: "Oui, vous pouvez vous rendre directement à notre boutique à Bonamoussadi, en face du Yapaki. Nous vous recommandons de nous contacter pour vérifier la disponibilité du produit recherché.",
      },
    ],
  },
  {
    title: "Commandes et achats",
    icon: Package,
    questions: [
      {
        q: "Comment passer une commande en ligne ?",
        a: "Parcourez notre boutique, choisissez les produits qui vous intéressent et suivez les étapes de commande affichées sur le site. Si vous avez besoin d'aide, notre équipe peut vous accompagner.",
      },
      {
        q: "Vendez-vous en gros et au détail ?",
        a: "Oui, Ousmane Chicha propose la vente en gros et au détail. Les particuliers peuvent acheter selon leurs besoins et les revendeurs peuvent nous contacter pour discuter de leurs quantités et des conditions commerciales.",
      },
      {
        q: "Puis-je commander plusieurs produits différents ?",
        a: "Oui, vous pouvez nous contacter pour composer votre commande selon vos besoins et les disponibilités. Pour les commandes en grande quantité, contactez-nous directement afin de faciliter le traitement de votre demande.",
      },
      {
        q: "Comment savoir si un produit est disponible ?",
        a: "Consultez la fiche du produit sur notre boutique en ligne ou contactez-nous sur WhatsApp. Notre équipe pourra vous renseigner sur la disponibilité et les options proposées.",
      },
      {
        q: "Puis-je obtenir un prix pour une commande en gros ?",
        a: "Oui. Indiquez-nous les produits recherchés, les quantités souhaitées et, si nécessaire, votre activité de revendeur. Nous pourrons vous communiquer les conditions applicables à votre demande.",
      },
    ],
  },
  {
    title: "Livraison",
    icon: Truck,
    questions: [
      {
        q: "Proposez-vous un service de livraison ?",
        a: "Oui, la livraison est proposée. Contactez notre équipe pour vérifier la possibilité de livrer à votre adresse et connaître les modalités applicables à votre commande.",
      },
      {
        q: "Livrez-vous en dehors de Bonamoussadi ?",
        a: "Contactez-nous en précisant votre quartier ou votre ville. Nous vous confirmerons si votre destination peut être desservie et les conditions de livraison correspondantes.",
      },
      {
        q: "Combien coûte la livraison ?",
        a: "Les frais dépendent des modalités applicables à votre commande et de votre destination. Contactez-nous avant de valider votre achat afin de connaître le montant exact.",
      },
      {
        q: "Quel est le délai de livraison ?",
        a: "Le délai peut varier selon votre localisation, la disponibilité des produits et les conditions de livraison. Notre équipe vous renseignera sur le délai estimé pour votre commande.",
      },
      {
        q: "Puis-je récupérer ma commande en boutique ?",
        a: "Vous pouvez nous contacter pour organiser le retrait de votre commande à notre boutique de Bonamoussadi, en face du Yapaki, et confirmer les modalités avant votre déplacement.",
      },
    ],
  },
  {
    title: "Paiement et assistance",
    icon: CreditCard,
    questions: [
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Contactez notre équipe pour connaître les moyens de paiement actuellement disponibles pour votre commande. Les modalités applicables vous seront précisées avant la finalisation de l'achat.",
      },
      {
        q: "Comment obtenir de l'aide pour une commande ?",
        a: "Écrivez-nous sur WhatsApp en précisant votre demande et, si vous avez déjà commandé, les informations permettant d'identifier votre commande. Notre équipe vous orientera.",
      },
      {
        q: "Que faire si un produit reçu présente un problème ?",
        a: "Contactez-nous dès que possible en décrivant le problème et en joignant, si nécessaire, des photos du produit. Notre équipe examinera votre demande et vous indiquera la marche à suivre.",
      },
      {
        q: "Comment vous contacter rapidement ?",
        a: "Vous pouvez nous joindre par WhatsApp au +237 655 046 802. Vous pouvez également visiter notre boutique à Bonamoussadi, en face du Yapaki.",
      },
    ],
  },
];

const popularQuestions = [
  "Vendez-vous en gros et au détail ?",
  "Proposez-vous un service de livraison ?",
  "Où se trouve votre boutique ?",
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("Toutes");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const sections = ["Toutes", ...faqSections.map((section) => section.title)];

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqSections
      .filter(
        (section) =>
          activeSection === "Toutes" || section.title === activeSection,
      )
      .map((section) => ({
        ...section,
        questions: section.questions.filter(
          (item) =>
            !query ||
            item.q.toLowerCase().includes(query) ||
            item.a.toLowerCase().includes(query),
        ),
      }))
      .filter((section) => section.questions.length > 0);
  }, [search, activeSection]);

  const totalQuestions = faqSections.reduce(
    (total, section) => total + section.questions.length,
    0,
  );

  const whatsappUrl = (message: string) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] text-white">
      <section className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-36 left-1/2 h-[430px] w-[650px] -translate-x-1/2 rounded-full bg-[#c99a45]/[0.10] blur-[130px]" />
          <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#9b6d23]/[0.06] blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,#090909_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-7 sm:px-8 sm:pb-24 sm:pt-10 lg:px-12">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-16 flex items-center gap-2 text-xs text-white/40 sm:mb-24"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#e5bd72]"
            >
              Accueil
            </Link>
            <span>/</span>
            <span className="text-[#e5bd72]">FAQ</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d6ad63]/25 bg-[#d6ad63]/[0.07] px-4 py-2">
              <CircleHelp className="h-4 w-4 text-[#e5bd72]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e5bd72] sm:text-xs">
                Centre d'aide
              </span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Des réponses
              <br />
              à vos <span className="text-[#d6ad63]">questions.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              Tout ce que vous devez savoir sur Ousmane Chicha, nos produits,
              vos commandes et nos services de livraison.
            </p>

            <div className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="flex h-14 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-4 transition-colors focus-within:border-[#d6ad63]/60">
                <Search className="h-5 w-5 shrink-0 text-[#d6ad63]" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setOpenQuestion(null);
                  }}
                  placeholder="Rechercher une question..."
                  aria-label="Rechercher dans la FAQ"
                  className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-xs text-white/50 transition-colors hover:text-white"
                  >
                    Effacer
                  </button>
                )}
              </div>

              <a
                href={whatsappUrl(
                  "Bonjour Ousmane Chicha, j'ai une question concernant vos produits et services.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#d6ad63] px-6 text-sm font-semibold text-[#17120a] transition-colors hover:bg-[#e7c784]"
              >
                <MessageCircle className="h-4 w-4" />
                Nous contacter
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/40">
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-3.5 w-3.5 text-[#d6ad63]" />
                Vente en gros et au détail
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-[#d6ad63]" />
                Livraison disponible
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Parcourir par thème
              </p>

              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                {sections.map((section) => {
                  const Icon =
                    faqSections.find((item) => item.title === section)?.icon ??
                    CircleHelp;
                  const selected = activeSection === section;

                  return (
                    <button
                      key={section}
                      type="button"
                      onClick={() => {
                        setActiveSection(section);
                        setOpenQuestion(null);
                      }}
                      className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all lg:w-full ${
                        selected
                          ? "border-[#d6ad63]/30 bg-[#d6ad63]/[0.09] text-[#e5bd72]"
                          : "border-transparent bg-white/[0.025] text-white/50 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{section}</span>
                      {selected && (
                        <ArrowRight className="ml-auto hidden h-4 w-4 lg:block" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden rounded-2xl border border-white/[0.08] bg-[#111111] p-5 lg:block">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6ad63]/20 bg-[#d6ad63]/[0.08]">
                <Headphones className="h-5 w-5 text-[#d6ad63]" />
              </div>
              <h3 className="text-base font-medium">Besoin d'aide ?</h3>
              <p className="mt-2 text-sm leading-6 text-white/45">
                Notre équipe est disponible pour répondre à vos questions et
                vous accompagner dans vos achats.
              </p>
              <a
                href={whatsappUrl(
                  "Bonjour, j'ai besoin d'assistance pour ma demande auprès d'Ousmane Chicha.",
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#e5bd72] hover:text-white"
              >
                Parler à notre équipe
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d6ad63]">
                  Questions fréquentes
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {activeSection === "Toutes"
                    ? "Comment pouvons-nous vous aider ?"
                    : activeSection}
                </h2>
              </div>
              <span className="shrink-0 pb-1 text-xs text-white/35">
                {filteredSections.reduce(
                  (total, section) => total + section.questions.length,
                  0,
                )}{" "}
                questions
              </span>
            </div>

            {filteredSections.length > 0 ? (
              <div className="space-y-10">
                {filteredSections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <div key={section.title}>
                      {activeSection === "Toutes" && (
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d6ad63]/20 bg-[#d6ad63]/[0.06]">
                            <Icon className="h-4 w-4 text-[#d6ad63]" />
                          </div>
                          <h3 className="text-base font-medium">
                            {section.title}
                          </h3>
                        </div>
                      )}

                      <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                        {section.questions.map((item, index) => {
                          const id = `${section.title}-${item.q}`;
                          const isOpen = openQuestion === id;

                          return (
                            <div key={item.q}>
                              <button
                                type="button"
                                aria-expanded={isOpen}
                                onClick={() =>
                                  setOpenQuestion(isOpen ? null : id)
                                }
                                className="group flex w-full items-center gap-4 py-5 text-left sm:py-6"
                              >
                                <span className="hidden w-7 shrink-0 text-xs tabular-nums text-white/25 sm:block">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span
                                  className={`flex-1 text-sm font-medium leading-6 transition-colors sm:text-base ${
                                    isOpen
                                      ? "text-[#e5bd72]"
                                      : "text-white/80 group-hover:text-white"
                                  }`}
                                >
                                  {item.q}
                                </span>
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                                    isOpen
                                      ? "rotate-180 border-[#d6ad63]/40 bg-[#d6ad63]/10 text-[#e5bd72]"
                                      : "border-white/10 text-white/40 group-hover:border-white/25 group-hover:text-white"
                                  }`}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </span>
                              </button>

                              <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                  isOpen
                                    ? "grid-rows-[1fr]"
                                    : "grid-rows-[0fr]"
                                }`}
                              >
                                <div className="overflow-hidden">
                                  <div className="pb-6 pl-0 sm:pl-11">
                                    <p className="max-w-2xl text-sm leading-7 text-white/50">
                                      {item.a}
                                    </p>
                                    <a
                                      href={whatsappUrl(
                                        `Bonjour Ousmane Chicha, concernant votre FAQ : ${item.q}`,
                                      )}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#d6ad63] transition-colors hover:text-white"
                                    >
                                      Une autre question ? Écrivez-nous
                                      <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
                <Search className="mx-auto h-8 w-8 text-[#d6ad63]" />
                <h3 className="mt-5 text-lg font-medium">
                  Aucune question trouvée
                </h3>
                <p className="mt-2 text-sm text-white/45">
                  Essayez un autre mot-clé ou parcourez toutes les catégories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveSection("Toutes");
                  }}
                  className="mt-6 rounded-lg border border-[#d6ad63]/30 px-5 py-2.5 text-sm text-[#e5bd72] transition-colors hover:bg-[#d6ad63]/10"
                >
                  Afficher toutes les questions
                </button>
              </div>
            )}

            <div className="mt-12 rounded-2xl border border-[#d6ad63]/20 bg-[linear-gradient(135deg,rgba(214,173,99,0.09),rgba(255,255,255,0.015))] p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#d6ad63]">
                    Assistance personnalisée
                  </p>
                  <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
                    Vous n'avez pas trouvé votre réponse ?
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
                    Contactez-nous directement pour vos achats, vos commandes
                    en gros ou vos demandes de livraison.
                  </p>
                </div>
                <a
                  href={whatsappUrl(
                    "Bonjour Ousmane Chicha, je souhaite obtenir des renseignements sur vos produits et services.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#d6ad63] px-5 py-3.5 text-sm font-semibold text-[#17120a] transition-colors hover:bg-[#e7c784]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contacter Ousmane Chicha
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-9 max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d6ad63]">
              Ousmane Chicha
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Votre boutique chicha à Douala.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/45">
              Retrouvez nos produits, passez vos commandes et profitez d'un
              accompagnement adapté à vos besoins.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
              <MapPin className="h-5 w-5 text-[#d6ad63]" />
              <h3 className="mt-4 text-sm font-medium">Notre adresse</h3>
              <p className="mt-2 text-sm leading-6 text-white/45">
                Bonamoussadi, Douala
                <br />
                En face du Yapaki
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
              <MessageCircle className="h-5 w-5 text-[#d6ad63]" />
              <h3 className="mt-4 text-sm font-medium">Contact WhatsApp</h3>
              <p className="mt-2 text-sm leading-6 text-white/45">
                +237 655 046 802
                <br />
                Renseignements et commandes
              </p>
              <a
                href={whatsappUrl("Bonjour Ousmane Chicha !")}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#e5bd72] hover:text-white"
              >
                Envoyer un message
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
              <Truck className="h-5 w-5 text-[#d6ad63]" />
              <h3 className="mt-4 text-sm font-medium">
                Commande et livraison
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/45">
                Vente en gros et au détail. Contactez-nous pour vérifier les
                disponibilités et les modalités de livraison.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Ousmane Chicha. Tous droits réservés.</p>
            <div className="flex flex-wrap gap-5">
              <Link
                href="/"
                className="transition-colors hover:text-[#e5bd72]"
              >
                Accueil
              </Link>
              <Link
                href="/boutique"
                className="transition-colors hover:text-[#e5bd72]"
              >
                Boutique
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-[#e5bd72]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
