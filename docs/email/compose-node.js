// ─────────────────────────────────────────────────────────────
// n8n Code node:  "Compose Personalized Email"
// Mode: Run Once for Each Item   (Language: JavaScript)
// Sits between "Process One at a Time" and "Send via Gmail".
// Fetches the hosted template, fills merge fields from the sheet
// row, and outputs { to, subject, html } for the Gmail node.
// ─────────────────────────────────────────────────────────────

// ── 1) EDIT: sender identity + subject ────────────────────────
const SENDER_NAME  = "Vikas Dwivedi";
const SENDER_TITLE = "Founder";
const SENDER_PHONE = "+91 97201 30734";
const SUBJECT      = "An interior-execution partner for your projects — Cornelian";

// Template lives on your live site, so you can edit the design any
// time WITHOUT touching this workflow.
const TEMPLATE_URL = "https://www.cornelianinteriors.com/email/newsletter-v2.html";

// ── 2) EDIT: map to YOUR Google Sheet column names ────────────
// (Left side = sheet column; extra fallbacks are already handled.)
const row   = $json;
const email = String(row.email || row.Email || row["Email Address"] || "").trim();
const name  = String(row.name  || row.Name  || row["Architect Name"] || row.firstName || "").trim();
const city  = String(row.city  || row.City  || "Delhi NCR").trim();
const firm  = String(row.firm  || row.Firm  || row.company || row.Company || row["Firm Name"] || "your practice").trim();

// ── 3) derived values ─────────────────────────────────────────
const greeting    = name || "Architect";
const unsubscribe = "mailto:cornelianexecutiveinteriors@gmail.com?subject=Unsubscribe";

// ── 4) fetch template + fill merge fields ─────────────────────
let html = await this.helpers.httpRequest({ url: TEMPLATE_URL, json: false });

const fields = {
  "{{greeting}}":    greeting,
  "{{city}}":        city,
  "{{firmName}}":    firm,
  "{{senderName}}":  SENDER_NAME,
  "{{senderTitle}}": SENDER_TITLE,
  "{{senderPhone}}": SENDER_PHONE,
  "{{unsubscribe}}": unsubscribe,
};
for (const [k, v] of Object.entries(fields)) html = html.split(k).join(v);

// ── 5) output for the Gmail node ──────────────────────────────
return { to: email, subject: SUBJECT, html, email, name, city, firm };
