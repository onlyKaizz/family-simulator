export interface ThemeOption {
  id: string;
  name: string;
  subtitle: string;
  isDark: boolean;
  colors: {
    bg: string;
    card: string;
    accent: string;
    text: string;
  };
  description: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'midnight',
    name: 'Huyền Vũ Hoàng Kim',
    subtitle: 'Chuẩn Web Gốc · Hoàng Gia',
    isDark: true,
    colors: {
      bg: '#0a1520',
      card: '#102131',
      accent: '#d9b26a',
      text: '#f2e8d5',
    },
    description: 'Nền xanh chàm kinh thành sâu lắng, chữ giấy ngà hoàng cung và điểm nhấn vàng son thiếp.',
  },
  {
    id: 'forbidden-city',
    name: 'Tử Cấm Thành',
    subtitle: 'Sơn Mài Đen · Đỏ Chu Sa',
    isDark: true,
    colors: {
      bg: '#0f0b10',
      card: '#19121a',
      accent: '#e11d48',
      text: '#fdf4eb',
    },
    description: 'Quyền quý và uy nghiêm với gỗ mun đen tuyền kết hợp đỏ chu sa và ánh vàng cung đình.',
  },
  {
    id: 'emerald-zen',
    name: 'Trúc Lâm Thiền Tự',
    subtitle: 'Rừng Trúc Đêm · Ngọc Bích',
    isDark: true,
    colors: {
      bg: '#06120e',
      card: '#0c1e17',
      accent: '#10b981',
      text: '#eafaf1',
    },
    description: 'Thanh tịnh và an yên như rừng trúc trong sương đêm, ánh ngọc bích phát sáng dịu mắt tuyệt đối.',
  },
  {
    id: 'ocean-sapphire',
    name: 'Hải Vân Dạ Nguyệt',
    subtitle: 'Vực Biển Đêm · Lam Ngọc Cyber',
    isDark: true,
    colors: {
      bg: '#050e18',
      card: '#0b1a2b',
      accent: '#38bdf8',
      text: '#f0f8ff',
    },
    description: 'Hiện đại, sắc sảo với đáy biển đêm sâu thẳm, lam ngọc phát quang và ánh vàng hải đăng rực rỡ.',
  },
  {
    id: 'parchment',
    name: 'Giấy Dó Thư Pháp',
    subtitle: 'Giao Diện Sáng · Mực Nho Ngàn Năm',
    isDark: false,
    colors: {
      bg: '#f4eee2',
      card: '#fffaf0',
      accent: '#a87a22',
      text: '#1f1a14',
    },
    description: 'Phong cách sáng nhẹ nhàng như lật giở trang giấy dó thủ công, chữ mực nho thư pháp và dấu triện đỏ.',
  },
];

const STORAGE_KEY = 'kns_active_theme';

export function getStoredTheme(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.some(t => t.id === saved)) {
      return saved;
    }
  } catch {
    // ignore
  }
  return 'midnight';
}

export function applyTheme(themeId: string) {
  const root = document.documentElement;
  root.setAttribute('data-theme', themeId);
  try {
    localStorage.setItem(STORAGE_KEY, themeId);
  } catch {
    // ignore
  }
}
