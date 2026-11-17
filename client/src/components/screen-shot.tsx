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
  customers: { file: "customers", w: 1600, h: 956, alt: "A customer list with each customer's town, job stage and how they got in touch.", caption: "Every customer in one list." },
  jobProfit: { file: "job-profit", w: 1600, h: 956, alt: "A table of finished jobs with the sale, hours, labour, materials and profit on each.", caption: "The profit on each job." },
  calendar: { file: "calendar", w: 1600, h: 956, alt: "A day calendar with the measuring list and a column for each van's fitting.", caption: "Measuring and fitting, day by day." },
  enquiries: { file: "enquiries", w: 1600, h: 956, alt: "An enquiries screen counting every call and message and where each lead is.", caption: "Every call and message in one list." },
  reminders: { file: "reminders", w: 1600, h: 956, alt: "A list of the service reminder messages the app sent and what was booked.", caption: "Service reminders the app sent by itself." },
  invoices: { file: "invoices", w: 1600, h: 956, alt: "An invoices screen listing finished jobs waiting for an invoice and the week's statements.", caption: "Invoices made from the job card." },
  workshopIpad: { file: "workshop-ipad", w: 1200, h: 903, alt: "A workshop iPad showing the cars at one station, each with its panels to do.", caption: "A workshop iPad, station by station." },
  measuringPhone: { file: "measuring-phone", w: 640, h: 1385, alt: "A phone showing the day's measuring visits with a box for sizes and notes.", caption: "The day's measuring, on the phone." },
  pickListPhone: { file: "pick-list-phone", w: 640, h: 1385, alt: "A phone showing the list of parts a van needs to bring from the yard.", caption: "The van's pick list for the morning." },
  phone: { file: "van-phone", w: 640, h: 1385, alt: "A phone showing a van crew's jobs for today and tomorrow.", caption: "The crew's day, on the phone." },
} as const;

export function ScreenShot({ screen, phone = false, eager = false, small = false }: { screen: keyof typeof SCREENS; phone?: boolean; eager?: boolean; small?: boolean }) {
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
        {s.caption} <span>{small ? "Sample screen." : "Sample screen. The names, places and prices are made up."}</span>
      </figcaption>
    </figure>
  );
}
