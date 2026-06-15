"use client";

import {
  Layout, LayoutGrid, MessageCircle, MessagesSquare, Phone, Workflow,
  Target, Palette, GitMerge, GraduationCap, Users, Building2,
  ArrowRight, ArrowUpRight, Check, CheckCheck, Zap, Clock, Globe,
  Rocket, Wrench, BarChart3, Calendar, Bot, Sparkles, ShieldCheck,
  MapPin, Mail, Menu, X, ChevronDown, Star, TrendingUp, Languages,
  PlugZap, Search, PenTool, Gauge, Repeat, BadgeCheck, Headphones,
  MousePointerClick, CircleCheck, Timer, Layers, LineChart, Send,
  Sun, Moon,
  Magnet, ShoppingBag, ShoppingCart, Store, Boxes, Database, Network,
  Inbox, PhoneCall, Filter, ClipboardCheck, AlertTriangle, Banknote,
  ListChecks, Route, Eye, Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

// Curated map. Importing a fixed set keeps the bundle lean and the
// data layer free of live component references (RSC-safe).
const MAP: Record<string, LucideIcon> = {
  Layout, LayoutGrid, MessageCircle, MessagesSquare, Phone, Workflow,
  Target, Palette, GitMerge, GraduationCap, Users, Building2,
  ArrowRight, ArrowUpRight, Check, CheckCheck, Zap, Clock, Globe,
  Rocket, Wrench, BarChart3, Calendar, Bot, Sparkles, ShieldCheck,
  MapPin, Mail, Menu, X, ChevronDown, Star, TrendingUp, Languages,
  PlugZap, Search, PenTool, Gauge, Repeat, BadgeCheck, Headphones,
  MousePointerClick, CircleCheck, Timer, Layers, LineChart, Send,
  Sun, Moon,
  Magnet, ShoppingBag, ShoppingCart, Store, Boxes, Database, Network,
  Inbox, PhoneCall, Filter, ClipboardCheck, AlertTriangle, Banknote,
  ListChecks, Route, Eye, Wallet,
};

export function Icon({
  name,
  className,
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Cmp = MAP[name] ?? CircleCheck;
  return (
    <Cmp
      size={size}
      strokeWidth={1.5}
      absoluteStrokeWidth
      className={cn(className)}
      aria-hidden="true"
    />
  );
}

export type IconName = keyof typeof MAP;
