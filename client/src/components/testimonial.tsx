// The two clients who may be named (Pete, 17 Nov 2026) and their approved
// words. Sources of truth: streamlined-bot-files atlas-website/testimonials/
// 2026-11-17-eamonn-kennedy-ipm.md and 2026-11-17-ian-omahony-komplete.md.
// Use the quotes word for word. Logos are files in this repo and are never
// links: linking a client's website would imply Streamlined Tech built it.
// Never name or hint at IPM Enviro's own client beyond Eamonn's words.

export const CLIENTS = {
  ipm: {
    name: "IPM Enviro",
    logo: "/images/clients/ipm-enviro.png",
    logoAlt: "IPM Environmental Services logo",
    width: 560,
    height: 192,
    line: "The technician scans each numbered unit on an iPad and logs what they found, and the visit report writes itself.",
  },
  komplete: {
    name: "Komplete Engineers",
    logo: "/images/clients/komplete-engineers.png",
    logoAlt: "Komplete logo",
    width: 700,
    height: 132,
    line: "Quotes that chase themselves, a new project set up in one tap, and every live project at a glance.",
  },
} as const;

export type ClientKey = keyof typeof CLIENTS;

const ATTRIBUTION: Record<ClientKey, string> = {
  ipm: "Eamonn Kennedy, Director, IPM Enviro",
  komplete: "Ian O'Mahony, Komplete Engineers",
};

export const QUOTES = {
  ipmMain: {
    client: "ipm",
    text: "We were working with another company for 12 months and weren't even close to launch. Pete contacted us by email, we had a chat, and almost overnight we had a product sample to look at. Our client is a multinational pharmaceutical plant and they're very pleased with how professional it looks, but the most important thing is how user friendly it is. There's literally no training required for our techs or their people.",
  },
  ipmDemo: {
    client: "ipm",
    text: "Almost overnight, you brought it around to where it needed to be.",
  },
  ipmSpeed: {
    client: "ipm",
    text: "The speed at which we could turn things around, I can't underestimate the value of that.",
  },
  ipmSupport: {
    client: "ipm",
    text: "Always accessible and very quick to come back to us, whether it's a sample or fixing the system. It literally happens almost instantly.",
  },
  kompleteMain: {
    client: "komplete",
    text: "It's made our process much more efficient, in speed and in knowing when invoices are due. Overall it's greatly benefited the efficiency of the business. We're definitely managing the work better and getting things done quicker.",
  },
  kompleteShort: {
    client: "komplete",
    text: "We're definitely managing it better, probably getting things done quicker.",
  },
} as const satisfies Record<string, { client: ClientKey; text: string }>;

export function ClientLogo({ client, small = false }: { client: ClientKey; small?: boolean }) {
  const c = CLIENTS[client];
  return (
    <img
      src={c.logo}
      alt={c.logoAlt}
      width={c.width}
      height={c.height}
      loading="lazy"
      decoding="async"
      className={small ? "st-logo st-logo--small" : "st-logo"}
    />
  );
}

/**
 * One approved quote with who said it. `short` is the smaller look used
 * beside a step; it shows the client's logo next to the name. The full look
 * leaves the logo to the card it sits in.
 */
export function Testimonial({ quote, short = false }: { quote: keyof typeof QUOTES; short?: boolean }) {
  const q = QUOTES[quote];
  return (
    <figure className={short ? "st-quote st-quote--short" : "st-quote"} data-testid={`quote-${quote}`}>
      <blockquote>“{q.text}”</blockquote>
      <figcaption>
        {short ? <ClientLogo client={q.client} small /> : null}
        <span>{ATTRIBUTION[q.client]}</span>
      </figcaption>
    </figure>
  );
}
