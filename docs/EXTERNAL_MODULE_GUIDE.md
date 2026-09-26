# DSP Avionics — hợp đồng module cho AI bên ngoài

Tài liệu này là context tối thiểu để một AI khác xây thêm bài lab và trả về code có thể copy thẳng vào repo.

## 1. Stack cố định

- Astro + Starlight, TypeScript, package manager `pnpm`.
- Nội dung: MDX trong `src/content/docs/`.
- Thành phần tương tác: `.astro` trong `src/components/`.
- Toán học: `katex`, `remark-math`, `rehype-katex` đã cài sẵn.
- Không dùng React/Vue/Svelte, Tailwind, backend hoặc database.
- SVG cho diagram; Canvas cho đồ thị cần vẽ lại liên tục.

Không yêu cầu AI sửa `astro.config.mjs`, `package.json`, sidebar hoặc CSS toàn site, trừ khi nhiệm vụ nói rõ.

## 2. Deliverable bắt buộc

AI chỉ cần trả về hai file:

```text
src/components/<PascalCaseName>.astro
src/content/docs/labs/<kebab-case-slug>.mdx
```

Trang MDX import component bằng:

```mdx
import Lab from '../../../components/<PascalCaseName>.astro';

<Lab />
```

Không đổi URL hoặc file của bài đã có.

## 3. Interface của component

Mỗi component phải có cấu trúc:

```astro
---
const id = `lab-${Math.random().toString(36).slice(2)}`;
---

<section class="my-lab" id={id}>...</section>

<script define:vars={{ id }}>
  const root = document.getElementById(id);
  // Mọi query phải bắt đầu từ root.
</script>

<style>
  /* CSS tĩnh, được Astro scope tự động. */
</style>

<style is:global>
  /* Chỉ dùng cho element do JS sinh bằng innerHTML. Luôn prefix .my-lab. */
</style>
```

Quy tắc state:

- Dùng một object state duy nhất.
- Tách `calculate()`, `renderDiagram()`, `renderControls()` và `renderAll()`.
- Không dùng `eval()`.
- Không ghi vào `window` hoặc query toàn document nếu không cần.
- Dùng event delegation cho SVG hoặc danh sách sinh động.
- `ResizeObserver` cho Canvas/SVG phụ thuộc kích thước.
- Canvas phải xử lý `devicePixelRatio`.

## 4. Theme và màu sắc

Không hard-code nền đen hoặc chữ trắng. Dùng token Starlight:

```css
.my-lab {
  --lab-bg: var(--sl-color-bg);
  --lab-panel: var(--sl-color-gray-7, var(--sl-color-bg));
  --lab-soft: var(--sl-color-gray-6);
  --lab-border: var(--sl-color-gray-5);
  --lab-text: var(--sl-color-white);
  --lab-muted: var(--sl-color-gray-2);
  --lab-accent: var(--sl-color-accent);
  --lab-accent-soft: var(--sl-color-accent-low);
  --lab-orange: var(--sl-color-orange-high);
}
```

Quy ước thị giác:

- Accent teal: lựa chọn, tín hiệu chính, focus.
- Orange: cảnh báo hoặc nhánh đối dấu.
- Gray: cấu trúc không hoạt động.
- Màu phải đi kèm nhãn, nét hoặc hình dạng; không truyền đạt bằng màu đơn thuần.
- Component phải đúng ở cả `data-theme="light"` và `data-theme="dark"`.

## 5. Layout

- Component rộng `100%`, `max-width: 100%`, `box-sizing: border-box`.
- Không đặt `min-width` cố định cho SVG làm tràn trang.
- Diagram chính dùng toàn chiều rộng.
- Panel phụ tối đa khoảng 1/4 chiều rộng; dưới `900px` phải xếp dọc.
- Không tạo khoảng trống bằng `min-height` lớn.
- Nếu dữ liệu thật sự rộng, chỉ vùng dữ liệu được `overflow-x: auto`, không phải toàn trang.

Site đã có hai drawer Menu/Mục lục mặc định đóng. Khi đóng, content có thể rộng tới `90rem`.

## 6. Công thức

Trong MDX dùng LaTeX trực tiếp:

```mdx
$$
X_k=\sum_{n=0}^{N-1}x_nW_N^{kn}.
$$
```

Trong frontmatter Astro dùng KaTeX server-side:

```astro
---
import katex from 'katex';
const math = katex.renderToString(String.raw`W_N^k`, { throwOnError: false });
---
<span set:html={math} />
```

Nếu HTML toán được JS sinh động, truyền chuỗi KaTeX đã render qua `define:vars`. Không tự giả lập LaTeX bằng chuỗi như `W4^1`.

## 7. Accessibility và interaction

- Điều khiển phải là `button`, `input`, `select`, `details` thật.
- Có label, focus visible và `aria-live="polite"` cho kết quả đổi động.
- Tương tác quan trọng phải dùng được bằng click/tap và bàn phím.
- Không để thông tin thiết yếu chỉ xuất hiện khi hover.
- Target cảm ứng quan trọng khoảng 44px.
- Tôn trọng `prefers-reduced-motion`.

## 8. Trang MDX

Frontmatter tối thiểu:

```yaml
---
title: Lab — Tên bài
description: Một câu mô tả mục tiêu.
sidebar:
  order: 5
---
```

Trang cần có:

1. Mục tiêu.
2. Một đoạn trực giác ngắn.
3. Component tương tác.
4. Hoạt động gợi ý.
5. Câu hỏi tự kiểm tra.

Nội dung chính bằng tiếng Việt; giữ thuật ngữ tiếng Anh phổ biến như FFT, pole, zero, aliasing.

## 9. Cách copy module vào repo

Từ thư mục repo `dsp/`:

1. Copy component vào `src/components/`.
2. Copy trang MDX vào `src/content/docs/labs/`.
3. Không cần đăng ký route hoặc sidebar; Starlight tự sinh từ thư mục.
4. Chạy:

```bash
pnpm check
pnpm build
```

5. Mở `/labs/<slug>/` và kiểm tra light/dark, desktop/mobile, bàn phím và console.

## 10. Prompt ngắn gửi AI khác

```text
Hãy xây một module lab cho website DSP Avionics theo file EXTERNAL_MODULE_GUIDE.md đính kèm.

Chủ đề: <CHỦ ĐỀ>
Mục tiêu học tập: <MỤC TIÊU>
Tương tác chính: <TƯƠNG TÁC>

Chỉ trả về đúng 2 file hoàn chỉnh:
1. src/components/<Name>.astro
2. src/content/docs/labs/<slug>.mdx

Không sửa config/package/global CSS. Không dùng framework UI. Dùng token theme Starlight, KaTeX có sẵn, responsive và keyboard-accessible. Cuối câu trả lời ghi các giả định và các bước kiểm thử thủ công, tối đa 8 dòng.
```

## 11. Checklist nhận code từ AI

- [ ] Chỉ có hai file đúng đường dẫn.
- [ ] Không thêm dependency nếu không thật sự cần.
- [ ] Không màu nền/chữ hard-code phá light theme.
- [ ] Không có SVG `min-width` làm tràn trang.
- [ ] CSS cho element sinh động dùng `is:global` và prefix root.
- [ ] Không dùng `eval()`.
- [ ] `pnpm check` sạch lỗi và warning.
- [ ] `pnpm build` thành công.
- [ ] Không sửa file đang có của người dùng.

