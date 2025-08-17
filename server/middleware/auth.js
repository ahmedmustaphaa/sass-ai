import { clerkClient } from "@clerk/express";
export const auth = async (req, res, next) => {
  try {
    // استثني login أو أي public routes
    if (req.path === "/login" || req.path === "/register") {
      return next();
    }

    const { userId, has } = req.auth;
    if (!userId || !has) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const hasPremiumPlan = await has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);

    if (!hasPremiumPlan && user.privateMetadata?.free_usage !== undefined) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
