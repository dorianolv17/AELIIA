import Stripe from "stripe";
import admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-01-27" });

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64) {
    const json = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    admin.initializeApp({ credential: admin.credential.cert(json) });
    return;
  }

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

function getRawBody(event) {
  if (!event.body) return Buffer.from("");
  return event.isBase64Encoded ? Buffer.from(event.body, "base64") : Buffer.from(event.body, "utf8");
}

// Mapping prix -> crédits. Exemple:
// PRICE_TO_CREDITS_JSON={"price_pack10":12,"price_pack50":60,"price_pack100":120,"price_journal":0}
function creditsForPrice(priceId) {
  try {
    const map = JSON.parse(process.env.PRICE_TO_CREDITS_JSON || "{}");
    return Number(map[priceId] ?? 0);
  } catch {
    return 0;
  }
}

function isJournalPrice(priceId) {
  try {
    const map = JSON.parse(process.env.PRICE_TO_FLAGS_JSON || "{}");
    return Boolean(map[priceId]?.journalUnlocked);
  } catch {
    return false;
  }
}

export default async (event) => {
  try {
    // Stripe exige la signature sur le RAW body
    const sig = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!sig || !webhookSecret) {
      return { statusCode: 400, body: "Missing Stripe signature/secret" };
    }

    const rawBody = getRawBody(event);
    const stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;

      const uid = session.metadata?.uid || session.client_reference_id;
      const priceId = session.metadata?.priceId;

      if (!uid || !priceId) {
        console.warn("Webhook: uid/priceId manquants");
        return { statusCode: 200, body: "ok" };
      }

      initFirebaseAdmin();
      const db = admin.firestore();

      const appId = process.env.APP_ID || "aeliia-platform";
      const userRef = db.doc(`artifacts/${appId}/users/${uid}/profile/data`);

      const add = creditsForPrice(priceId);
      const unlockJournal = isJournalPrice(priceId);

      const update = {};
      if (add) update.credits = admin.firestore.FieldValue.increment(add);
      if (unlockJournal) update.journalUnlocked = true;

      if (Object.keys(update).length) {
        await userRef.set(update, { merge: true });
      }
    }

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("Webhook error:", err);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};
