import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://avionics.vn',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'DSP Avionics',
      description: 'Học xử lý tín hiệu số từ trực giác đến triển khai.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Bắt đầu', items: [{ label: 'Tổng quan khóa học', slug: '' }, { label: 'Lộ trình học', slug: 'lo-trinh' }] },
        {
          label: 'Nền tảng',
          items: [{ autogenerate: { directory: 'nen-tang' } }],
        },
        {
          label: 'Biến đổi & phân tích',
          items: [{ autogenerate: { directory: 'bien-doi' } }],
        },
        {
          label: 'Phòng thí nghiệm',
          items: [{ autogenerate: { directory: 'labs' } }],
        },
      ],
      lastUpdated: true,
    }),
  ],
});
