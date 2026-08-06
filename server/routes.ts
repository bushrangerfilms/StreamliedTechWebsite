import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processDetailsLead } from "./details-lead-core";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/track", async (req, res) => {
    try {
      const { page, referrer } = req.body;
      const userAgent = req.headers["user-agent"] || null;
      await storage.trackPageView({ page, referrer, userAgent });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to track" });
    }
  });

  app.post("/api/details-lead", async (req, res) => {
    try {
      const result = await processDetailsLead(req.body, (req.headers["user-agent"] as string) || null);
      res.status(result.status).json(result.body);
    } catch (error) {
      console.error("details-lead: unexpected error", error);
      res.status(500).json({ error: "Failed" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!adminPassword) {
        res.status(500).json({ error: "Admin password not configured" });
        return;
      }
      
      if (password === adminPassword) {
        res.json({ success: true, token: Buffer.from(password).toString("base64") });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!authHeader || !adminPassword) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      
      const token = authHeader.replace("Bearer ", "");
      const decodedPassword = Buffer.from(token, "base64").toString();
      
      if (decodedPassword !== adminPassword) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  return httpServer;
}
