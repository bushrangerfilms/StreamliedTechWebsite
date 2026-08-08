import { useEffect } from "react";
import { SITE_ORIGIN, type RouteSeo } from "@/lib/seo-routes";

type SeoOptions = Pick<RouteSeo, "title" | "description" | "canonical" | "noindex">;

function setMeta(selector: string, attr: string, value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

/**
 * The app ships one index.html for every route, so without this every page
 * inherits the homepage's description and canonical. Sets them per route and
 * restores the shell's values on unmount.
 */
export function useSeo({ title, description, canonical, noindex }: SeoOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    const descEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descEl?.getAttribute("content") ?? "";
    const canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonicalEl?.getAttribute("href") ?? "";
    const ogUrlEl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const previousOgUrl = ogUrlEl?.getAttribute("content") ?? "";
    const ogTitleEl = document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const previousOgTitle = ogTitleEl?.getAttribute("content") ?? "";
    const ogDescEl = document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const previousOgDescription = ogDescEl?.getAttribute("content") ?? "";

    const canonicalUrl = `${SITE_ORIGIN}${canonical}`;

    document.title = title;
    descEl?.setAttribute("content", description);
    canonicalEl?.setAttribute("href", canonicalUrl);
    ogUrlEl?.setAttribute("content", canonicalUrl);
    ogTitleEl?.setAttribute("content", title);
    ogDescEl?.setAttribute("content", description);

    const robotsEl = noindex
      ? setMeta('meta[name="robots"]', "name", "robots", "noindex, follow")
      : null;

    return () => {
      document.title = previousTitle;
      descEl?.setAttribute("content", previousDescription);
      canonicalEl?.setAttribute("href", previousCanonical);
      ogUrlEl?.setAttribute("content", previousOgUrl);
      ogTitleEl?.setAttribute("content", previousOgTitle);
      ogDescEl?.setAttribute("content", previousOgDescription);
      robotsEl?.remove();
    };
  }, [title, description, canonical, noindex]);
}
