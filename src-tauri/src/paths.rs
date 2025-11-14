use std::path::PathBuf;
use tauri::{AppHandle, Error, Manager};

pub fn get_app_data_dir(app: &AppHandle) -> Result<PathBuf, Error> {
    app.path().app_data_dir()
}

pub fn get_settings_path(app: &AppHandle) -> Result<PathBuf, Error> {
    let app_data_dir = get_app_data_dir(app)?;
    Ok(app_data_dir.join("settings.json"))
}
