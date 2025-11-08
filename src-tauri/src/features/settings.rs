use std::fs;
use tauri::AppHandle;

use crate::structures::settings::AppSettings;
use crate::{atomic::write_atomic, paths::get_settings_path};

#[tauri::command]
pub fn load_settings(app: AppHandle) -> Result<AppSettings, String> {
    let settings_path = get_settings_path(&app).map_err(|e| e.to_string())?;
    let raw = fs::read_to_string(settings_path).map_err(|e| e.to_string())?;

    match serde_json::from_str::<AppSettings>(&raw) {
        Ok(data) => Ok(data),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn reset_settings(app: AppHandle) -> Result<(), String> {
    let settings_path = get_settings_path(&app).map_err(|e| e.to_string())?;
    let default_settings = AppSettings::default();
    let json = serde_json::to_string_pretty(&default_settings).map_err(|e| e.to_string())?;
    write_atomic(&settings_path, &json).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn save_settings(app: AppHandle, settings: AppSettings) -> Result<(), String> {
    let settings_path = get_settings_path(&app).map_err(|e| e.to_string())?;
    let json = serde_json::to_string_pretty(&settings).map_err(|e| e.to_string())?;
    write_atomic(&settings_path, &json).map_err(|e| e.to_string())?;
    Ok(())
}
