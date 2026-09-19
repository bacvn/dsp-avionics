# DSP Avionics

Website giảng dạy Xử lý tín hiệu số bằng tiếng Việt tại `avionics.vn`.

## Phát triển cục bộ

```bash
pnpm install
pnpm dev
```

## Kiểm tra bản xuất bản

```bash
pnpm build
pnpm preview
```

Mỗi lần thay đổi được merge vào nhánh `main`, GitHub Actions sẽ build và triển khai website lên GitHub Pages.

## Việc cần làm sau khi tạo repository

1. Thay `USERNAME` trong `astro.config.mjs` bằng GitHub username thật.
2. Chọn **GitHub Actions** tại Repository Settings → Pages → Source.
3. Xác minh `avionics.vn` trong GitHub account Settings → Pages.
4. Thiết lập DNS theo hướng dẫn GitHub Pages và bật **Enforce HTTPS**.
