import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FeatureKey =
  | "feed"
  | "messages"
  | "groups"
  | "location"
  | "rooms"
  | "stories"
  | "calendar";

export type HomePage = "/feed" | "/messages" | "/groups" | "/location" | "/rooms";

export type LocationPrecision = "exact" | "approximate" | "city";
export type Visibility = "everyone" | "friends" | "nobody";
export type ScreenTimeReminder = "off" | "30min" | "1hr" | "2hr";
export type BreakReminder = "off" | "15min" | "30min" | "1hr";
export type UsageLimit = "off" | "30min" | "1hr" | "2hr" | "4hr";
export type ThemeName = "shrimp" | "coral" | "ocean";

export interface FeatureVisibility {
  feed: boolean;
  messages: boolean;
  groups: boolean;
  location: boolean;
  rooms: boolean;
  stories: boolean;
  calendar: boolean;
}

export interface PrivacySettings {
  locationPrecision: LocationPrecision;
  onlineStatusVisibility: Visibility;
  profileVisibility: Visibility;
  whoCanMessage: Visibility;
  whoCanSeeStories: Visibility;
  showReadReceipts: boolean;
  showTypingIndicators: boolean;
}

export interface WellnessSettings {
  screenTimeReminder: ScreenTimeReminder;
  breakReminder: BreakReminder;
  dailyUsageLimit: UsageLimit;
  bedtimeMode: boolean;
  bedtimeStart: string; // "HH:MM"
  bedtimeEnd: string;
  scrollSpeedBumps: boolean;
  interventionMessages: boolean;
  contentSensitivityFilter: boolean;
}

export interface AppearanceSettings {
  theme: ThemeName;
  compactMode: boolean;
  reduceAnimations: boolean;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  messageNotifications: boolean;
  groupNotifications: boolean;
  locationNotifications: boolean;
  roomNotifications: boolean;
  storyNotifications: boolean;
  soundEnabled: boolean;
}

export interface SettingsState {
  homePage: HomePage;
  features: FeatureVisibility;
  privacy: PrivacySettings;
  wellness: WellnessSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;

  setHomePage: (page: HomePage) => void;
  toggleFeature: (feature: FeatureKey) => void;
  setFeature: (feature: FeatureKey, enabled: boolean) => void;
  updatePrivacy: (updates: Partial<PrivacySettings>) => void;
  updateWellness: (updates: Partial<WellnessSettings>) => void;
  updateAppearance: (updates: Partial<AppearanceSettings>) => void;
  updateNotifications: (updates: Partial<NotificationSettings>) => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: Omit<
  SettingsState,
  | "setHomePage"
  | "toggleFeature"
  | "setFeature"
  | "updatePrivacy"
  | "updateWellness"
  | "updateAppearance"
  | "updateNotifications"
  | "resetToDefaults"
> = {
  homePage: "/feed",
  features: {
    feed: true,
    messages: true,
    groups: true,
    location: true,
    rooms: true,
    stories: true,
    calendar: true,
  },
  privacy: {
    locationPrecision: "approximate",
    onlineStatusVisibility: "friends",
    profileVisibility: "everyone",
    whoCanMessage: "everyone",
    whoCanSeeStories: "friends",
    showReadReceipts: true,
    showTypingIndicators: true,
  },
  wellness: {
    screenTimeReminder: "off",
    breakReminder: "off",
    dailyUsageLimit: "off",
    bedtimeMode: false,
    bedtimeStart: "22:00",
    bedtimeEnd: "07:00",
    scrollSpeedBumps: false,
    interventionMessages: true,
    contentSensitivityFilter: false,
  },
  appearance: {
    theme: "shrimp",
    compactMode: false,
    reduceAnimations: false,
  },
  notifications: {
    pushEnabled: true,
    messageNotifications: true,
    groupNotifications: true,
    locationNotifications: true,
    roomNotifications: true,
    storyNotifications: true,
    soundEnabled: true,
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setHomePage: (page) => set({ homePage: page }),

      toggleFeature: (feature) =>
        set((state) => ({
          features: { ...state.features, [feature]: !state.features[feature] },
        })),

      setFeature: (feature, enabled) =>
        set((state) => ({
          features: { ...state.features, [feature]: enabled },
        })),

      updatePrivacy: (updates) =>
        set((state) => ({
          privacy: { ...state.privacy, ...updates },
        })),

      updateWellness: (updates) =>
        set((state) => ({
          wellness: { ...state.wellness, ...updates },
        })),

      updateAppearance: (updates) =>
        set((state) => ({
          appearance: { ...state.appearance, ...updates },
        })),

      updateNotifications: (updates) =>
        set((state) => ({
          notifications: { ...state.notifications, ...updates },
        })),

      resetToDefaults: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: "shrimp-talk-settings",
    }
  )
);

export const FEATURE_LABELS: Record<FeatureKey, { name: string; description: string }> = {
  feed: { name: "Feed", description: "Posts, photos, and updates from friends" },
  messages: { name: "Messages", description: "Direct and group conversations" },
  groups: { name: "Groups", description: "Friend groups and circles" },
  location: { name: "Location", description: "Map and location sharing with friends" },
  rooms: { name: "Rooms", description: "Public and private chat rooms" },
  stories: { name: "Stories", description: "Ephemeral photo and video stories" },
  calendar: { name: "Calendar", description: "Events and scheduling" },
};

export const HOME_PAGE_OPTIONS: { value: HomePage; label: string }[] = [
  { value: "/feed", label: "Feed" },
  { value: "/messages", label: "Messages" },
  { value: "/groups", label: "Groups" },
  { value: "/location", label: "Location" },
  { value: "/rooms", label: "Rooms" },
];
