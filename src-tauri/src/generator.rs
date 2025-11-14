use super::structures::settings::AppSettings;
use serde::Serialize;
use std::fs;
use tauri::{AppHandle, Manager};

#[derive(Serialize)]
pub struct OnboardResult {
    #[serde(rename = "settingsCreated")]
    pub settings_created: bool,
    #[serde(rename = "appDir")]
    pub app_dir: String,
}

#[tauri::command]
pub fn onboard(app: AppHandle) -> Result<OnboardResult, String> {
    let app_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {e}"))?;

    let videos_dir = app
        .path()
        .video_dir()
        .map_err(|e| format!("Failed to get videos directory: {e}"))?
        .join("sider");

    let settings_path = app_dir.join("settings.json");

    let mut settings_created = false;

    if !app_dir.exists() {
        fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
    }

    if !videos_dir.exists() {
        fs::create_dir_all(&videos_dir).map_err(|e| e.to_string())?;
    }

    if !settings_path.exists() {
        let default_settings = AppSettings::default();
        let json = serde_json::to_string_pretty(&default_settings).map_err(|e| e.to_string())?;
        fs::write(&settings_path, json).map_err(|e| e.to_string())?;
        settings_created = true;
    }

    let result = OnboardResult {
        settings_created,
        app_dir: app_dir.to_string_lossy().to_string(),
    };

    Ok(result)
}
