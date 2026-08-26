import type { SidebarItemConfig } from "@/design-system";
import { DashboardIcon } from "@/design-system";
import { AdsIcon } from "@/design-system/components/icons/AdsIcon";
import { CatalogIcon } from "@/design-system/components/icons/CatalogIcon";
import { ChartBarIcon } from "@/design-system/components/icons/ChartBarIcon";
import { ConnectionsIcon } from "@/design-system/components/icons/ConnectionsIcon";
import { CustomerCenterIcon } from "@/design-system/components/icons/CustomerCenterIcon";
import { ExperimentIcon } from "@/design-system/components/icons/ExperimentIcon";
import { FunnelIcon } from "@/design-system/components/icons/FunnelIcon";
import { GlobeIcon } from "@/design-system/components/icons/GlobeIcon";
import { IntegrationsIcon } from "@/design-system/components/icons/IntegrationsIcon";
import { KeyIcon } from "@/design-system/components/icons/KeyIcon";
import { LinkIcon } from "@/design-system/components/icons/LinkIcon";
import { NotificationIcon } from "@/design-system/components/icons/NotificationIcon";
import { PaywallIcon } from "@/design-system/components/icons/PaywallIcon";
import { PersonIcon } from "@/design-system/components/icons/PersonIcon";
import { RicoIcon } from "@/design-system/components/icons/RicoIcon";
import { SearchIcon } from "@/design-system/components/icons/SearchIcon";
import { SettingsIcon } from "@/design-system/components/icons/SettingsIcon";
import { TargetIcon } from "@/design-system/components/icons/TargetIcon";
import { TooltipIcon } from "@/design-system/components/icons/TooltipIcon";

export interface ProjectConfig {
  name: string;
  logoUrl?: string;
}

export const MOCK_PROJECTS: ProjectConfig[] = [
  {
    name: "Bruto",
  },
];

export const MAIN_NAV_ITEMS: SidebarItemConfig[] = [
  { label: "Overview", to: "", isActive: true, icon: DashboardIcon },
  {
    label: "Analytics",
    to: "",
    icon: ChartBarIcon,
    subItems: [
      { label: "Charts", to: "" },
      { label: "Benchmarks", to: "" },
    ],
  },
  { label: "Customers", to: "", icon: PersonIcon },
  {
    label: "Product Catalog",
    to: "",
    icon: CatalogIcon,
    subItems: [{ label: "", to: "" }],
  },
  { label: "Paywalls", to: "", icon: PaywallIcon },
  { label: "Targeting", to: "", icon: TargetIcon },
  {
    label: "Experiments",
    to: "",
    icon: ExperimentIcon,
  },
  { label: "Funnels", to: "", icon: FunnelIcon },
  {
    label: "Purchase links",
    to: "",
    icon: LinkIcon,
  },
  { label: "Ads", to: "", icon: AdsIcon },
  {
    label: "Lifecycle",
    to: "",
    icon: CustomerCenterIcon,
    subItems: [{ label: "", to: "" }],
  },
];

export const BOTTOM_NAV_ITEMS: SidebarItemConfig[] = [
  { label: "Apps", to: "", icon: ConnectionsIcon },
  { label: "Web", to: "", icon: GlobeIcon },
  { label: "API Keys", to: "", icon: KeyIcon },
  {
    label: "Integrations",
    to: "",
    icon: IntegrationsIcon,
  },
  {
    label: "Project settings",
    to: "",
    icon: SettingsIcon,
  },
];

export interface HeaderActionItemConfig {
  label: string;
  icon: React.ComponentType;
}

export const HEADER_NAV_ITEMS: HeaderActionItemConfig[] = [
  { label: "Search", icon: SearchIcon },
  { label: "Ask Rico", icon: RicoIcon },
  { label: "Help", icon: TooltipIcon },
  { label: "Notifications", icon: NotificationIcon },
];

export interface OnboardingStepConfig {
  id: number;
  title: string;
  description: string;
  actionText: string;
  actionUrl: string;
  isCompleted: boolean;
}

export const MOCK_ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: 1,
    title: "Integrate the SDK",
    description: "Add RevenueCat to your app. Copy your API key, use the sample code, or set up with AI prompts.",
    actionText: "Install SDK",
    actionUrl: "",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Create your first paywall",
    description: "Create a paywall to sell in your app. Use RevenueCat's editor or build your own with our docs.",
    actionText: "New Paywall",
    actionUrl: "",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Make your first purchase",
    description: "Test your setup by making a purchase in the app. Tap the purchase button on your Paywall.",
    actionText: "Present a Paywall",
    actionUrl: "",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Setup integrations",
    description: "Connect your billing system or third party analytics like Stripe, Mixpanel, or Amplitude.",
    actionText: "Link integrations",
    actionUrl: "",
    isCompleted: false,
  },
  {
    id: 5,
    title: "Configure webhooks",
    description: "Get real-time transaction notifications sent straight to your server or Slack channel.",
    actionText: "Add webhook",
    actionUrl: "",
    isCompleted: false,
  },
  {
    id: 6,
    title: "Invite your team",
    description: "Grant project access to developers, marketers, and product managers in your organization.",
    actionText: "Add members",
    actionUrl: "",
    isCompleted: false,
  },
];
