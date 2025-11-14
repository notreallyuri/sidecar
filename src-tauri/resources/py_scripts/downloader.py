import os
import sys
import json

import yt_dlp

def progress_hook(d):
    if d['status'] == 'downloading':
        total = d.get('total_bytes') or d.get('total_bytes_estimate')
        downloaded = d.get('downloaded_bytes', 0)
        
        if total:
            percentage = (downloaded / total) * 100
        else:
            percentage = 0

        data = {
            "progress": {
                "status": "downloading",
                "percentage": round(percentage, 1), # e.g., 45.5
                "filename": d.get('filename', 'Unknown file')
            }
        }
        print(json.dumps(data), flush=True)

    elif d['status'] == 'finished':
        data = {
            "progress": {
                "status": "finished",
                "percentage": 100,
                "filename": d.get('filename')
            }
        }
        print(json.dumps(data), flush=True)


def download_generic(url, options):
    ydl_opts = {
        "format": options.get("format", "best"),
        "outtmpl": "%(title)s.%(ext)s",
        "quiet": True, 
        "noplaylist": True,
        "progress_hooks": [progress_hook],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing args"}))
        return

    url = sys.argv[1]
    
    try:
        options = json.loads(sys.argv[2])
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON"}))
        return

    target_dir = options.get("target_dir")
    if target_dir:
        try:
            os.chdir(target_dir)
        except:
            pass 

    try:
        download_generic(url, options)
        print(json.dumps({"done": True}), flush=True)
    except Exception as e:
        print(json.dumps({"error": str(e)}), flush=True)

if __name__ == "__main__":
    main()
