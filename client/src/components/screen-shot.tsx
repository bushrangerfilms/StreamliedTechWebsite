// Sample screens that break up the text (Pete, 17 Nov 2026, 16:55: "Use real
// product screenshots as the images that break up the text").
//
// Each file in client/public/images/screens is a still taken from one of our
// own sample-data demos, with every name changed before the picture was
// taken: the firm is "Your Company" with a plain square for a logo, people are
// "Customer 1", staff have stock first names, places are invented, every euro
// figure, registration plate and job number is a placeholder. No client's app
// is shown and nothing here links to a demo. They are static images only.
// To add one, run it through the same replacement first; never drop in a raw
// screenshot.

export const SCREENS = {
  jobBoard: { file: "job-board", w: 1600, h: 956, alt: "A job board with a column for each stage, from enquiry to fitted, and a card for each job.", caption: "A job board, from enquiry to fitted." },
  today: { file: "today-dashboard", w: 1600, h: 956, alt: "A Today screen listing what needs the owner and which van is on which job.", caption: "The Today screen: what needs you, and who is out where." },
  diary: { file: "diary", w: 1600, h: 956, alt: "A day diary with a column for each van and its jobs.", caption: "The diary, van by van." },
  services: { file: "services-due", w: 1600, h: 956, alt: "A services screen showing who is due a yearly service and who has said yes.", caption: "Services due, and who has said yes." },
  jobCard: { file: "job-card", w: 1600, h: 956, alt: "A job card for a car, with the panels being worked on marked on a plan of the car.", caption: "A job card for a body shop." },
  tablet: { file: "workshop-tablet", w: 1200, h: 903, alt: "A workshop tablet listing the trucks in the yard, each with its job sheet.", caption: "A job sheet on the workshop tablet." },
  phone: { file: "van-phone", w: 640, h: 1385, alt: "A phone showing a van crew's jobs for today and tomorrow.", caption: "The crew's day, on the phone." },
} as const;

export function ScreenShot({ screen, phone = false, eager = false }: { screen: keyof typeof SCREENS; phone?: boolean; eager?: boolean }) {
  const s = SCREENS[screen];
  return (
    <figure className={phone ? "st-shot st-shot--phone" : "st-shot"} data-testid={`screen-${s.file}`}>
      <img
        src={`/images/screens/${s.file}.webp`}
        alt={s.alt}
        width={s.w}
        height={s.h}
        loading={eager ? undefined : "lazy"}
        decoding="async"
      />
      <figcaption>
        {s.caption} <span>Sample screen. The names, places and prices are made up.</span>
      </figcaption>
    </figure>
  );
}
