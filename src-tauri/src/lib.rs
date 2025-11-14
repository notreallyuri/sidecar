mod atomic;
mod features;
mod generator;
mod paths;
mod structures;

use features::downloader::*;
use features::settings::*;
use generator::onboard;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            if let Err(e) = onboard(app.handle().clone()) {
                eprintln!("Onboarding failed: {e}");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            onboard,
            load_settings,
            save_settings,
            reset_settings,
            download_youtube,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
