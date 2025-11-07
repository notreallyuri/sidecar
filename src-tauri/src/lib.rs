mod generator;
mod structures;

use generator::onboard;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            if let Err(e) = onboard(app.handle().clone()) {
                eprintln!("Onboarding failed: {e}");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, onboard])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
