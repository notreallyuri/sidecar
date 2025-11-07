use super::structures::{plugin::PluginManifest, settings::AppSettings};
use serde::Serialize;
use std::fs;
use tauri::{AppHandle, Manager};

#[derive(Serialize)]
pub struct OnboardResult {
    #[serde(rename = "settingsCreated")]
    pub settings_created: bool,
    #[serde(rename = "pluginsCreated")]
    pub plugins_created: bool,
    #[serde(rename = "manifestCreated")]
    pub manifest_created: bool,
    #[serde(rename = "appDir")]
    pub app_dir: String,
}

#[tauri::command]
pub fn onboard(app: AppHandle) -> Result<OnboardResult, String> {
    let app_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {e}"))?;

    let settings_path = app_dir.join("settings.json");
    let plugins_dir = app_dir.join("plugins");
    let plugin_manifest_path = plugins_dir.join("manifest.json");

    let mut settings_created = false;
    let mut plugins_created = false;
    let mut manifest_created = false;

    if !app_dir.exists() {
        fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
        println!("Created app data directory at {:?}", app_dir);
    }

    if !settings_path.exists() {
        let default_settings = AppSettings::default();
        let json = serde_json::to_string_pretty(&default_settings).map_err(|e| e.to_string())?;
        fs::write(&settings_path, json).map_err(|e| e.to_string())?;
        settings_created = true;
        println!("Created default settings at {:?}", settings_path);
    }

    if !plugins_dir.exists() {
        fs::create_dir_all(&plugins_dir).map_err(|e| e.to_string())?;
        plugins_created = true;
        println!("Created plugins directory at {:?}", plugins_dir);
    }

    if !plugin_manifest_path.exists() {
        let default_manifest = PluginManifest::default();
        let json = serde_json::to_string_pretty(&default_manifest).map_err(|e| e.to_string())?;
        fs::write(&plugin_manifest_path, json).map_err(|e| e.to_string())?;
        manifest_created = true;
        println!(
            "Created default plugin manifest at {:?}",
            plugin_manifest_path
        );
    }
    Ok(OnboardResult {
        settings_created,
        plugins_created,
        manifest_created,
        app_dir: app_dir.to_string_lossy().to_string(),
    })
}
