use std::fs::{rename, File};
use std::io::Write;
use std::path::Path;

pub fn write_atomic(path: &Path, data: &str) -> Result<(), std::io::Error> {
    let tmp = path.with_extension("tmp");
    let mut file = File::create(&tmp)?;
    file.write_all(data.as_bytes())?;
    file.sync_all()?;
    rename(tmp, path)?;
    Ok(())
}
