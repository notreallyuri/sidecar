use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum FieldType {
    Text,
    File,
    Select,
    Checkbox,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PluginField {
    pub label: String,
    pub flag: Option<String>,
    #[serde(rename = "type")]
    pub field_type: FieldType,
    pub options: Option<Vec<String>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Plugin {
    pub info: PluginInfo,
    pub binary: String,
    pub fields: Vec<PluginField>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PluginInfo {
    pub name: String,
    pub version: String,
    pub author: Option<String>,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PluginManifestItem {
    pub name: String,
    pub path: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PluginManifest {
    pub plugins: Vec<PluginManifestItem>,
}

impl Default for PluginManifest {
    fn default() -> Self {
        Self { plugins: vec![] }
    }
}
