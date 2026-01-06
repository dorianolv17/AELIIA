import Stripe from "stripe";
import admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-01-27" });

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  // Option A (recommandée): FIREBASE_SERVICE_ACCOUNT_B64 = base64(JSON service account)
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64) {
    const json = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    admin.initializeApp({ credential: admin.credential.cert(json) });
    return;
  }

  // Option B: variables séparées (fallback)
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin non configuré: ajoute FIREBASE_SERVICE_ACCOUNT_B64 (ou les 3 vars séparées).");
  }
  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey })
  });
}

async function verifyUser(event) {
  const auth = event.headers.authorization || event.headers.Authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) throw new Error("Missing auth token");
  initFirebaseAdmin();
  const decoded = await admin.auth().verifyIdToken(token);
  return decoded; // { uid, ... }
}

export default async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { uid } = await verifyUser(event);

    const body = JSON.parse(event.body || "{}");
    const priceId = body.priceId;
    if (!priceId) return { statusCode: 400, body: JSON.stringify({ error: "priceId manquant" }) };

    const origin =
      event.headers.origin ||
      (event.headers.referer ? new URL(event.headers.referer).origin : null) ||
      process.env.PUBLIC_SITE_URL ||
      "http://localhost:8888";

    // Pour éviter d'être dépendant des "Payment Links", on crée une Checkout Session.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: uid,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?success=1`,
      cancel_url: `${origin}/?canceled=1`,
      metadata: {
        uid,
        priceId
      }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message || "Erreur" })
    };
  }
};
