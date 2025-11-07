type Theme = 'light' | 'dark' | 'system';

type InterfaceSettings = {
    darkMode: Theme;
}

type AccessSettings = {
    allowExternalPlugins: boolean;
}

type AppSettings = {
    interface: InterfaceSettings;
    access: AccessSettings;
}

type OnboardResult = {
    settingsCreated: boolean;
    pluginsCreated: boolean;
    manifestCreated: boolean;
    appDir: string;
}

export type {
    Theme,
    InterfaceSettings,
    AccessSettings,
    AppSettings,
    OnboardResult
}