/**
 * WebMCP for the "Ask for a call" form (/contact only).
 *
 * WebMCP lets a page tell a browser's AI agent what it can do. The current
 * draft (Web Machine Learning Community Group, https://webmachinelearning.github.io/webmcp/,
 * read 22 Nov 2026) puts it on document.modelContext, with registerTool(tool,
 * { signal }); the older navigator.modelContext is gone. This is progressive
 * enhancement: where document.modelContext is missing, nothing happens and the
 * page is exactly what it was. No dependency, no visible change.
 *
 * The one tool is ask_for_call. It is not a second way into the site: it
 * fills the same form that a person sees (client/src/components/
 * ask-for-call-form.tsx), uses the same checks below, and sends through the
 * same request, honeypot included, so the server's checks in
 * server/details-lead-core.ts apply unchanged. It sends only when the agent
 * sets submit to true; otherwise the form is filled in and left for the
 * person (or the agent) to send.
 */

export type CallValues = { name: string; phone: string; email: string; company: string; about: string };
export type CallErrors = { name?: string; phone?: string; email?: string };

/** The form's own rules, in one place so the button and the agent share them. */
export function validateCall(values: CallValues): CallErrors {
  const next: CallErrors = {};
  if (values.name.trim().length < 2) next.name = "Please tell us your name.";
  if (values.phone.replace(/\D/g, "").length < 7) next.phone = "We need a number to call you on.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "That email doesn't look right.";
  return next;
}

export type ToolResult = { ok: boolean; message: string; errors?: CallErrors };
export type Run = (values: CallValues, submit: boolean, signal: AbortSignal) => Promise<ToolResult>;

// Only the part of the draft this uses, so the code builds without the types
// the browsers will one day ship.
type ModelContextLike = {
  registerTool: (
    tool: {
      name: string;
      title?: string;
      description: string;
      inputSchema?: object;
      execute: (input: Record<string, unknown>, options: { signal: AbortSignal }) => Promise<unknown>;
      annotations?: { readOnlyHint?: boolean; consequentialHint?: boolean };
    },
    options?: { signal?: AbortSignal },
  ) => Promise<undefined>;
};

const text = (value: unknown) => (typeof value === "string" ? value : "");

export function registerAskForCallTool(run: Run, signal: AbortSignal): void {
  if (typeof document === "undefined") return;
  const modelContext = (document as unknown as { modelContext?: ModelContextLike }).modelContext;
  if (!modelContext || typeof modelContext.registerTool !== "function") return;
  try {
    modelContext
      .registerTool(
        {
          name: "ask_for_call",
          title: "Ask for a call",
          description:
            "Ask Streamlined Tech to phone a trade or service business owner. It fills in the Ask for a call form on this page. One of the team calls, normally within 24 hours. Set submit to true only when the person has asked to be called; otherwise the form is filled in and not sent. Do not use it for tests or sample enquiries.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "The person's name." },
              phone: { type: "string", description: "A phone number to call them on." },
              email: { type: "string", description: "Their email address." },
              company: { type: "string", description: "Their business name (optional)." },
              about: { type: "string", description: "What their business does (optional)." },
              submit: {
                type: "boolean",
                description: "True to send the form. Defaults to false: the form is filled in and not sent.",
              },
            },
            required: ["name", "phone", "email"],
            additionalProperties: false,
          },
          annotations: { consequentialHint: true },
          execute: async (input, options) =>
            run(
              {
                name: text(input.name),
                phone: text(input.phone),
                email: text(input.email),
                company: text(input.company),
                about: text(input.about),
              },
              input.submit === true,
              options?.signal ?? signal,
            ),
        },
        { signal },
      )
      .catch(() => {
        // Already registered, or the browser refused: the form works as it always did.
      });
  } catch {
    // Same: never let an agent feature break the page.
  }
}
