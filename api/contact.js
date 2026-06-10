import { Resend } from "resend";

const requiredFields = ["name", "school", "email", "topic", "message"];

function clean(value) {
  return String(value || "").trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const missing = requiredFields.filter((field) => !clean(body[field]));

  if (missing.length) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }

  const email = clean(body.email);
  if (!isEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      return res.status(200).json({ ok: true, dev: true });
    }

    return res.status(500).json({ error: "Contact email is not configured." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL || "yeneschool@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "YeneSchool <onboarding@resend.dev>";
  const name = clean(body.name);
  const school = clean(body.school);
  const topic = clean(body.topic);
  const phone = clean(body.phone) || "Not provided";
  const messageFocus = clean(body.message_focus);
  const demoDate = clean(body.demo_date);
  const message = clean(body.message);

  const subject = `YeneSchool contact: ${topic} from ${school}`;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>New YeneSchool contact request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>School:</strong> ${escapeHtml(school)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        ${messageFocus ? `<p><strong>Demo focus:</strong> ${escapeHtml(messageFocus)}</p>` : ""}
        ${demoDate ? `<p><strong>Preferred demo date:</strong> ${escapeHtml(demoDate)}</p>` : ""}
        <hr style="border: 0; border-top: 1px solid #e5e7eb;" />
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      </div>
    `,
    text: [
      "New YeneSchool contact request",
      `Name: ${name}`,
      `School: ${school}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Topic: ${topic}`,
      messageFocus ? `Demo focus: ${messageFocus}` : "",
      demoDate ? `Preferred demo date: ${demoDate}` : "",
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend contact email failed:", error);
    if (process.env.NODE_ENV !== "production") {
      return res.status(502).json({
        error: error.message || "Could not send the message. Please try again.",
      });
    }

    return res.status(502).json({ error: "Could not send the message. Please try again." });
  }

  return res.status(200).json({ ok: true });
}
