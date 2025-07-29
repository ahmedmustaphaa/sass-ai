import { Webhook } from 'svix';
import { User } from '../model/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const ClerkWebhooks = async (req, res) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      return res.status(500).json({ error: 'Webhook secret not set' });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };

    const payload = req.body;

    let evt;
    try {
      evt = wh.verify(JSON.stringify(payload), headers);
    } catch (err) {
      console.error("❌ Invalid Clerk webhook signature", err);
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    const { data, type } = evt;

    if (type === "user.created") {
      const userData = {
        _id: data.id,
        email: data.email_addresses?.[0]?.email_address || "no-email@unknown.com",
        username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url,
      };

      const existing = await User.findById(userData._id);
      if (!existing) {
        await User.create(userData);
        console.log("✅ User created:", userData.username);
      }

    } else if (type === "user.updated") {
      const userData = {
        _id: data.id,
        email: data.email_addresses?.[0]?.email_address || "no-email@unknown.com",
        username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url,
      };

      await User.findByIdAndUpdate(userData._id, userData);
      console.log("🔄 User updated:", userData.username);

    } else if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      console.log("❌ User deleted:", data.id);
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('🔥 Clerk Webhook Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
