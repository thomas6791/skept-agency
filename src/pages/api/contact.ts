import { Resend } from "resend";

export const prerender = false;

export async function POST({ request }) {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        message: "Configuration d'erreur : clé API manquante",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { firstName, lastName, company, email, phone, dataConsent } = body;

    // Validation
    if (!firstName || !lastName || !email || !dataConsent) {
      return new Response(
        JSON.stringify({
          message: "Veuillez remplir tous les champs obligatoires",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "Email invalide" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Envoyer l'email via Resend
    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // À remplacer par votre domaine Resend
      to: email,
      subject: "Confirmation de votre demande de contact",
      html: generateEmailHTML(firstName, lastName, company, phone),
    });

    if (result.error) {
      const errorMessage = result.error?.message || JSON.stringify(result.error);
      console.error("Erreur Resend détaillée:", {
        error: result.error,
        message: errorMessage,
        from: "Contact Form <onboarding@resend.dev>",
        to: email,
      });
      return new Response(
        JSON.stringify({
          message: "Erreur lors de l'envoi de l'email: " + errorMessage,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Email envoyé avec succès",
        id: result.data?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erreur serveur détaillée:", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new Response(
      JSON.stringify({
        message: "Erreur interne du serveur: " + errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function generateEmailHTML(
  firstName: string,
  lastName: string,
  company: string | undefined,
  phone: string | undefined
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #0066cc; }
          .info-group { margin: 15px 0; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; margin-left: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Merci pour votre demande de contact !</h1>
          <p>Nous avons bien reçu votre message et vous recontacterons rapidement.</p>

          <h2>Détails de votre demande :</h2>
          <div class="info-group">
            <span class="label">Nom :</span>
            <span class="value">${lastName} ${firstName}</span>
          </div>
          ${company ? `<div class="info-group"><span class="label">Entreprise :</span><span class="value">${company}</span></div>` : ""}
          <div class="info-group">
            <span class="label">Email :</span>
            <span class="value">${email}</span>
          </div>
          ${phone ? `<div class="info-group"><span class="label">Téléphone :</span><span class="value">${phone}</span></div>` : ""}

          <p style="margin-top: 30px; font-size: 14px; color: #999;">
            Cet email a été généré automatiquement. Veuillez ne pas y répondre directement.
          </p>
        </div>
      </body>
    </html>
  `;
}
