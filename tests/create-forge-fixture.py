"""Build a tiny offline ZIP for the Forge browser persistence test."""
import json
from pathlib import Path
import struct
import zipfile
import zlib

def png_chunk(kind, payload):
    data = kind + payload
    return struct.pack(">I", len(payload)) + data + struct.pack(">I", zlib.crc32(data) & 0xffffffff)

png = (b"\x89PNG\r\n\x1a\n"
       + png_chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 8, 6, 0, 0, 0))
       + png_chunk(b"IDAT", zlib.compress(b"\x00\xff\x00\x00\xff"))
       + png_chunk(b"IEND", b""))
Path("/tmp/forge-reference.png").write_bytes(png)
report = {
 "mode": "paid", "request_id": "forge-persistence-test", "model": "gpt-image-2.6-flare",
 "planning_reserve_usd": 0.75, "estimated_api_cost_usd": 0.1325,
 "assets": [{"id": "rock-01", "name": "Saved test boulder", "file": "rock-01.png",
             "status": "Generated; human approval required"}]
}
with zipfile.ZipFile("/tmp/forge-review-test.zip", "w", compression=zipfile.ZIP_STORED) as archive:
    archive.writestr("asset-workshop-output/report.json", json.dumps(report))
    archive.writestr("asset-workshop-output/rock-01.png", png)
print("Prepared offline Forge test PNG and ZIP")
