use serde::{Deserialize, Serialize};
use std::fs;
use tauri::AppHandle;

use crate::{
    paths::{get_plugin_manifest_path, get_plugins_dir},
    structures::plugin::{Plugin, PluginManifest},
};

pub fn read_plugin_manifest(app: &AppHandle) -> Result<PluginManifest, String> {
    let manifest_path = get_plugin_manifest_path(&app).map_err(|e| e.to_string())?;
    let manifest_raw = fs::read_to_string(manifest_path)
        .map_err(|e| format!("Failed to read plugin manifest: {}", e))?;
    let manifest: PluginManifest = serde_json::from_str(&manifest_raw)
        .map_err(|e| format!("Failed to parse plugin manifest JSON: {}", e))?;
    Ok(manifest)
}

pub fn write_plugin_manifest(app: &AppHandle, new_manifest: &PluginManifest) -> Result<(), String> {
    let manifest_path = get_plugin_manifest_path(&app).map_err(|e| e.to_string())?;

    let manifest_json = serde_json::to_string_pretty(&new_manifest)
        .map_err(|e| format!("Failed to serialize plugin manifest: {}", e))?;

    fs::write(manifest_path, manifest_json)
        .map_err(|e| format!("Failed to write plugin manifest: {}", e))?;

    Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VerifyResponse {
    #[serde(rename = "validPlugins")]
    pub valid_plugins: Vec<String>,
    pub errors: Vec<String>,
    #[serde(rename = "orphanedPlugins")]
    pub orphaned_plugins: Vec<String>,
}

#[tauri::command]
pub fn verify_plugins(app: AppHandle) -> Result<VerifyResponse, String> {
    let manifest = read_plugin_manifest(&app)?;
    let plugins_dir = get_plugins_dir(&app).map_err(|e| e.to_string())?;

    let mut valid_plugins = Vec::new();
    let mut errors = Vec::new();

    for manifest_item in &manifest.plugins {
        let plugin_path = plugins_dir.join(&manifest_item.path);

        match verify_single_plugin(&plugin_path, &manifest_item.name) {
            Ok(_) => {
                valid_plugins.push(manifest_item.name.clone());
            }
            Err(e) => {
                errors.push(format!("{}: {}", manifest_item.name, e));
            }
        }
    }

    let entries = fs::read_dir(&plugins_dir).map_err(|e| e.to_string())?;
    let mut orphaned_plugins = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();

        if path.extension().and_then(|ext| ext.to_str()) == Some("json") {
            let file_name = path.file_name().and_then(|n| n.to_str()).unwrap_or("");

            let is_in_manifest = manifest.plugins.iter().any(|item| item.path == file_name);

            if !is_in_manifest {
                orphaned_plugins.push(file_name.to_string());
            }
        }
    }

    if !orphaned_plugins.is_empty() {
        println!(
            "\nWarning: Found {} orphaned plugin file(s) not in manifest:",
            orphaned_plugins.len()
        );
        for orphan in &orphaned_plugins {
            println!("  - {}", orphan);
        }
    }

    if !errors.is_empty() {
        return Err(format!(
            "Plugin verification failed with {} error(s)",
            errors.len()
        ));
    }

    let valid_manifest_items: Vec<_> = manifest
        .plugins
        .into_iter()
        .filter(|item| valid_plugins.contains(&item.name))
        .collect();

    let updated_manifest = PluginManifest {
        plugins: valid_manifest_items,
    };

    write_plugin_manifest(&app, &updated_manifest)?;

    Ok(VerifyResponse {
        valid_plugins,
        errors,
        orphaned_plugins,
    })
}

fn verify_single_plugin(
    plugin_path: &std::path::Path,
    plugin_name: &str,
) -> Result<Plugin, String> {
    if !plugin_path.exists() {
        return Err(format!(
            "Plugin file not found at path: {}",
            plugin_path.display()
        ));
    }

    let plugin_content = fs::read_to_string(plugin_path)
        .map_err(|e| format!("Failed to read plugin file: {}", e))?;

    let plugin: Plugin = serde_json::from_str(&plugin_content)
        .map_err(|e| format!("Failed to parse plugin JSON: {}", e))?;

    if plugin.info.name.is_empty() {
        return Err("Plugin info.name cannot be empty".to_string());
    }

    if plugin.info.version.is_empty() {
        return Err("Plugin info.version cannot be empty".to_string());
    }

    if plugin.binary.is_empty() {
        return Err("Plugin binary path cannot be empty".to_string());
    }

    if plugin.info.name != plugin_name {
        return Err(format!(
            "Plugin name mismatch: expected '{}', found '{}'",
            plugin_name, plugin.info.name
        ));
    }

    for (idx, field) in plugin.fields.iter().enumerate() {
        if field.label.is_empty() {
            return Err(format!("Field {} has empty label", idx));
        }

        if matches!(
            field.field_type,
            crate::structures::plugin::FieldType::Select
        ) {
            if field.options.is_none() || field.options.as_ref().unwrap().is_empty() {
                return Err(format!("Select field '{}' must have options", field.label));
            }
        }
    }

    Ok(plugin)
}
