# VoidSoft Store — AppList

Danh sách app/mod/game của **VoidSoft**. Trang này được host bằng GitHub Pages và được app **VoidSoft** fetch về để hiển thị.

## Cách thêm app mới

Thêm 1 mục vào mảng `apps` trong `AppList.json`:

```json
{
  "id": "ten-khong-dau-khong-space",
  "name": "Tên hiển thị",
  "type": "game",
  "version": "1.0.0",
  "author": "bibobonking",
  "date": "2026-08-20",
  "description": "Mô tả ngắn.",
  "image_url": "https://.../icon.png",
  "download_url": "https://github.com/bibobonking/REPO/releases/download/TAG/FILE.zip",
  "file_size": 123456
}
```

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `id` | ✓ | duy nhất, chữ thường, không dấu, không space |
| `name` | ✓ | tên hiển thị |
| `type` | ✓ | `game`, `mod` hoặc `app` |
| `version` | | phiên bản (so sánh để hiện nút Update) |
| `description` | | mô tả |
| `image_url` | | ảnh đại diện (PNG/JPG) |
| `download_url` | ✓* | link GitHub Release (file công khai) |
| `file_size` | | dung lượng byte (hiển thị + progress bar) |

> *Nếu chưa có link tải, app vẫn hiển thị mục đó nhưng không tải được.

## Cách tạo link GitHub Release

1. Vào repo trên GitHub -> **Releases** -> **Draft a new release**
2. Tag version (vd `v1.0.0`), đính kèm file (game/mod/app đóng zip)
3. Copy link file từ phần **Assets** vào `download_url`

## Cách tải file lên repo này

- Push qua git, hoặc
- Bấm **Add file -> Upload files** trên github.com, hoặc
- Dùng chính app **VoidSoft** (mục **Add App**) — cần GitHub token trong Settings.

## Cấu hình GitHub Pages

Settings repo -> **Pages** -> Source: **Deploy from a branch** -> branch `main` / `/ (root)` -> Save.