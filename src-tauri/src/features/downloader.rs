use std::path::PathBuf;

use serde_json::json;
use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_shell::{process::CommandEvent, ShellExt};

async fn run_downloader_sidecar(
    app: &AppHandle,
    url: String,
    custom_path: Option<PathBuf>,
) -> Result<String, String> {
    let target_path = match custom_path {
        Some(p) => p,
        None => app
            .path()
            .video_dir()
            .map_err(|_| "Could not find Videos directory")?
            .join("sider"),
    };

    let target_path_str = target_path.to_string_lossy().to_string();

    let options = json!({
        "target_dir": target_path_str,
        "format": "best"
    });

    let sidecar = app
        .shell()
        .sidecar("downloader-sidecar")
        .map_err(|e| e.to_string())?;

    let command = sidecar.args([url.as_str(), options.to_string().as_str()]);

    let (mut rx, _) = command
        .spawn()
        .map_err(|e| format!("Failed to spawn sidecar: {}", e))?;

    while let Some(event) = rx.recv().await {
        match event {
            CommandEvent::Stdout(line_bytes) => {
                let line = String::from_utf8_lossy(&line_bytes);

                if let Some(json_start_index) = line.find('{') {
                    let json_part = &line[json_start_index..];

                    if let Ok(parsed_json) = serde_json::from_str::<serde_json::Value>(json_part) {
                        app.emit("download-progress", parsed_json).unwrap();
                    } else {
                        eprintln!("Failed to parse partial JSON: {}", json_part);
                    }
                }
            }

            CommandEvent::Stderr(line_bytes) => {
                let line = String::from_utf8_lossy(&line_bytes);
                if let Some(json_start_index) = line.find('{') {
                    let json_part = &line[json_start_index..];
                    if let Ok(parsed_json) = serde_json::from_str::<serde_json::Value>(json_part) {
                        app.emit("download-progress", parsed_json).unwrap();
                    } else {
                        eprintln!("PYTHON ERROR (non-json): {}", line);
                    }
                } else {
                    eprintln!("PYTHON ERROR (non-json): {}", line);
                }
            }
            _ => {}
        }
    }

    Ok("Download started".to_string())
}

#[tauri::command]
pub async fn download_youtube(
    app: AppHandle,
    url: String,
    path: Option<String>,
) -> Result<String, String> {
    println!("Starting YouTube download for: {}", url);
    let path_buf = path.map(PathBuf::from);
    run_downloader_sidecar(&app, url, path_buf).await
}
