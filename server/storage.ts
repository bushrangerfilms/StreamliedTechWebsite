import { type User, type InsertUser, type InsertPageView, type PageView, pageViews } from "@shared/schema";
import { db } from "./db";
import { desc, sql, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  trackPageView(data: InsertPageView): Promise<void>;
  getAnalytics(): Promise<{
    totalViews: number;
    recentViews: PageView[];
    pageBreakdown: { page: string; count: number }[];
    last7Days: { date: string; count: number }[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  }

  async trackPageView(data: InsertPageView): Promise<void> {
    await db.insert(pageViews).values({
      page: data.page,
      referrer: data.referrer || null,
      userAgent: data.userAgent || null,
    });
  }

  async getAnalytics(): Promise<{
    totalViews: number;
    recentViews: PageView[];
    pageBreakdown: { page: string; count: number }[];
    last7Days: { date: string; count: number }[];
  }> {
    const allViews = await db.select().from(pageViews).orderBy(desc(pageViews.timestamp));
    
    const totalViews = allViews.length;
    const recentViews = allViews.slice(0, 50);
    
    const pageCountMap = new Map<string, number>();
    allViews.forEach((view: PageView) => {
      const current = pageCountMap.get(view.page) || 0;
      pageCountMap.set(view.page, current + 1);
    });
    const pageBreakdown = Array.from(pageCountMap.entries())
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);
    
    const last7DaysMap = new Map<string, number>();
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      last7DaysMap.set(dateStr, 0);
    }
    
    allViews.forEach((view: PageView) => {
      const dateStr = view.timestamp.toISOString().split("T")[0];
      if (last7DaysMap.has(dateStr)) {
        last7DaysMap.set(dateStr, (last7DaysMap.get(dateStr) || 0) + 1);
      }
    });
    
    const last7Days = Array.from(last7DaysMap.entries())
      .map(([date, count]) => ({ date, count }));
    
    return { totalViews, recentViews, pageBreakdown, last7Days };
  }
}

export const storage = new DatabaseStorage();
