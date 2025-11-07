use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum Theme {
    Light,
    Dark,
    System,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct InterfaceSettings {
    #[serde(rename = "darkMode")]
    pub dark_mode: Theme,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct AccessSettings {
    #[serde(rename = "allowExternalPlugins")]
    pub allow_external_plugins: bool,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct AppSettings {
    #[serde(rename = "interfaceSettings")]
    pub interface: InterfaceSettings,
    #[serde(rename = "accessSettings")]
    pub access_settings: AccessSettings,
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            interface: InterfaceSettings {
                dark_mode: Theme::Dark,
            },
            access_settings: AccessSettings {
                allow_external_plugins: false,
            },
        }
    }
}
