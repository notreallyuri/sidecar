use tauri::{AppHandle, Manager, Error};
use std::path::PathBuf;

pub fn get_app_data_dir(app: &AppHandle) -> Result<PathBuf, Error> {
    app.path().app_data_dir()
}

pub fn get_settings_path(app: &AppHandle) -> Result<PathBuf, Error> {
    let app_data_dir = get_app_data_dir(app)?;
    Ok(app_data_dir.join("settings.json"))
}

pub fn get_plugins_dir(app: &AppHandle) -> Result<PathBuf, Error> {
    let app_data_dir = get_app_data_dir(app)?;
    Ok(app_data_dir.join("plugins"))
}
pub fn get_plugin_manifest_path(app: &AppHandle) -> Result<PathBuf, Error> {
    let plugins_dir = get_plugins_dir(app)?;
    Ok(plugins_dir.join("manifest.json"))
}