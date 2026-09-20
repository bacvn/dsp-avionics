# DSP Avionics

Website giảng dạy Xử lý tín hiệu số bằng tiếng Việt tại `dsp.avionics.vn`.

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

Repository: `https://github.com/bacvn/dsp-avionics`

1. Chọn **GitHub Actions** tại Repository Settings → Pages → Source.
2. Xác minh `avionics.vn` trong GitHub account Settings → Pages.
3. Thiết lập DNS theo hướng dẫn GitHub Pages.
4. Bật **Enforce HTTPS** sau khi GitHub cấp chứng chỉ cho domain.
