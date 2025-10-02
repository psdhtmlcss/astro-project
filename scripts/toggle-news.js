import { readFileSync, renameSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Получаем путь к корневой директории проекта
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Читаем конфигурацию
const configPath = join(rootDir, 'src/config.ts');
const configContent = readFileSync(configPath, 'utf-8');

// Проверяем, включены ли новости
const newsEnabled = configContent.includes('enabled: true');

// Пути к папкам
const newsDir = join(rootDir, 'src/pages/news');
const hiddenNewsDir = join(rootDir, 'src/pages/_news');
const newsContentDir = join(rootDir, 'src/content/news');
const hiddenNewsContentDir = join(rootDir, 'src/content/_news');

console.log('🔧 Проверка конфигурации новостей...');
console.log(`Новости ${newsEnabled ? 'ВКЛЮЧЕНЫ' : 'ОТКЛЮЧЕНЫ'}`);

try {
  if (newsEnabled) {
    // Если новости включены - убираем подчеркивание (показываем новости)
    if (existsSync(hiddenNewsDir)) {
      renameSync(hiddenNewsDir, newsDir);
      console.log('✅ Папка src/pages/_news переименована в src/pages/news');
    }
    if (existsSync(hiddenNewsContentDir)) {
      renameSync(hiddenNewsContentDir, newsContentDir);
      console.log('✅ Папка src/content/_news переименована в src/content/news');
    }
  } else {
    // Если новости отключены - добавляем подчеркивание (скрываем новости)
    if (existsSync(newsDir)) {
      renameSync(newsDir, hiddenNewsDir);
      console.log('✅ Папка src/pages/news переименована в src/pages/_news');
    }
    if (existsSync(newsContentDir)) {
      renameSync(newsContentDir, hiddenNewsContentDir);
      console.log('✅ Папка src/content/news переименована в src/content/_news');
    }
  }
  
  console.log('✨ Готово!');
} catch (error) {
  console.error('❌ Ошибка при переименовании:', error.message);
  process.exit(1);
}