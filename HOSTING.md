# Инструкция по размещению на хостинг (VPS/Сервер)

## Структура проекта

```
zhest/
├── zhest.db           <- База данных SQLite (ВСЕ ДАННЫЕ ЗДЕСЬ)
├── public/
│   └── uploads/       <- Фотографии товаров (загруженные)
│   └── images/        <- Статичные изображения
├── src/               <- Исходный код
├── package.json
└── ...
```

## Способ 1: VPS сервер (Ubuntu/Debian) - РЕКОМЕНДУЕТСЯ

### Шаг 1: Подготовка сервера

```bash
# Обновить систему
sudo apt update && sudo apt upgrade -y

# Установить Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Установить PM2 (для запуска в фоне)
sudo npm install -g pm2

# Установить nginx (для доступа через домен)
sudo apt install -y nginx
```

### Шаг 2: Загрузить проект на сервер

Вариант А - через Git:
```bash
cd /var/www
git clone <ваш-репозиторий> zhest
cd zhest
```

Вариант Б - через FTP/SFTP:
- Загрузить всю папку `zhest` в `/var/www/zhest`
- ВАЖНО: Обязательно загрузить файл `zhest.db` и папку `public/uploads/`

### Шаг 3: Установить зависимости и собрать

```bash
cd /var/www/zhest
npm install
npm run build
```

### Шаг 4: Запустить приложение

```bash
# Запустить через PM2 (будет работать в фоне)
pm2 start npm --name "zhest" -- start

# Сохранить настройки PM2
pm2 save
pm2 startup
```

### Шаг 5: Настроить nginx

```bash
sudo nano /etc/nginx/sites-available/zhest
```

Вставить:
```nginx
server {
    listen 80;
    server_name ваш-домен.ru;  # или IP адрес сервера

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активировать:
```bash
sudo ln -s /etc/nginx/sites-available/zhest /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Шаг 6: Установить SSL (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d ваш-домен.ru
```

---

## Способ 2: Shared хостинг с Node.js

Если ваш хостинг поддерживает Node.js:

1. Загрузить ВСЕ файлы проекта через FTP
2. Через SSH выполнить:
   ```bash
   npm install
   npm run build
   npm start
   ```
3. Настроить приложение через панель управления хостинга

---

## ВАЖНО: Что нужно обязательно загрузить

При переносе на хостинг обязательно загрузите:

1. **`zhest.db`** - это база данных со всеми товарами, продажами и т.д.
2. **`public/uploads/`** - папка с фотографиями товаров
3. **`public/images/`** - статичные изображения

Без этих файлов данные пропадут!

---

## Резервное копирование

Регулярно делайте копию:
- Файла `zhest.db` 
- Папки `public/uploads/`

```bash
# Скрипт резервного копирования
cp zhest.db zhest.db.backup-$(date +%Y%m%d)
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz public/uploads/
```

---

## Проверка работы

После размещения откройте:
- `http://ваш-домен.ru` - главная страница
- `http://ваш-домен.ru/admin` - админ панель (admin / admin123)

Если фото не отображаются - проверьте что папка `public/uploads/` загружена правильно.
