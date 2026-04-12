-- PostgreSQL Schema for Zhest project

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'admin'
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    buy_price DOUBLE PRECISION NOT NULL,
    sell_price DOUBLE PRECISION NOT NULL,
    image_url TEXT,
    category TEXT DEFAULT 'Общее',
    stock DOUBLE PRECISION DEFAULT 0,
    unit TEXT DEFAULT 'шт',
    full_width DOUBLE PRECISION,
    useful_width DOUBLE PRECISION,
    thickness DOUBLE PRECISION,
    color TEXT,
    variants TEXT,
    image_padding INTEGER DEFAULT 0,
    image_scale DOUBLE PRECISION DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    product_name TEXT,
    quantity DOUBLE PRECISION NOT NULL,
    total_price DOUBLE PRECISION NOT NULL,
    payment_method TEXT DEFAULT 'Наличными',
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_price DOUBLE PRECISION NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity DOUBLE PRECISION NOT NULL,
    price_at_time DOUBLE PRECISION NOT NULL,
    unit TEXT DEFAULT 'шт'
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    pin TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Work Logs table
CREATE TABLE IF NOT EXISTS work_logs (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(id),
    description TEXT NOT NULL,
    products_made TEXT,
    total_items INTEGER DEFAULT 0,
    work_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workers table
CREATE TABLE IF NOT EXISTS workers (
    id SERIAL PRIMARY KEY,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    position TEXT,
    salary DOUBLE PRECISION DEFAULT 0,
    conditions TEXT,
    rating INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    worker_id INTEGER NOT NULL REFERENCES workers(id),
    date TEXT NOT NULL,
    status TEXT DEFAULT 'present',
    check_in TEXT,
    check_out TEXT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sales_product_id ON sales(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_sale_date ON sales(sale_date);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_work_logs_employee_id ON work_logs(employee_id);
CREATE INDEX IF NOT EXISTS idx_work_logs_work_date ON work_logs(work_date);
CREATE INDEX IF NOT EXISTS idx_workers_login ON workers(login);
CREATE INDEX IF NOT EXISTS idx_attendance_worker_id ON attendance(worker_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

-- Default Admin
INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin') ON CONFLICT (username) DO NOTHING;

-- Initial Products Data
INSERT INTO products (id, name, buy_price, sell_price, image_url, stock, created_at, category, unit, image_padding, image_scale, variants) VALUES
(157, 'Пирамида Чешуя', 0.0, 1500.0, '/uploads/piramida-cheshuya.jpeg', 100, '2026-01-26 12:51:16', 'Кровля', 'шт', 0, 1.0, '[{"name":"RAL 6005 Зеленый","colorCode":"#0F4336","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 3005 Красный","colorCode":"#5E2028","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 8017 Шоколад","colorCode":"#5c4a3d","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 7024 Графит","colorCode":"#4b4d4e","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 9003 Белый","colorCode":"#ffffff","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 1015 Слоновая кость","colorCode":"#E6D2B5","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 5005 Синий","colorCode":"#004B93","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 9006 Серебро","colorCode":"#A1A1A0","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 3011 Вишня","colorCode":"#781F2E","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 8019 Темно-коричневый","colorCode":"#403A3A","image":"/uploads/piramida-cheshuya.jpeg"}]'),
(158, 'Пирамида', 0.0, 48.0, '/uploads/pyramid-brown-1.jpeg', 1000, '2026-01-26 12:51:16', 'Кровля', 'шт', 24, 1.0, '[{"name":"RAL 8017 Коричневый","image_url":"/uploads/pyramid-brown-1.jpeg"},{"name":"RAL 8014 Коричневый","image_url":"/uploads/pyramid-brown-2.jpeg"},{"name":"RAL 8004 Терракот","image_url":"/uploads/pyramid-brown-3.jpeg"},{"name":"RAL 9005 Черный","image_url":"/uploads/pyramid-black.jpeg"},{"name":"RAL 8019 Темно-коричневый","image_url":"/uploads/pyramid-black-2.jpeg"},{"name":"RAL 5005 Синий","image_url":"/uploads/pyramid-blue.jpeg"},{"name":"RAL 1015 Бежевый","image_url":"/uploads/pyramid-beige.jpeg"},{"name":"RAL 9003 Белый","image_url":"/uploads/pyramid-white.jpeg"},{"name":"RAL 6005 Зеленый","image_url":"/uploads/pyramid-green.jpeg"},{"name":"RAL 3005 Вишневый","image_url":"/uploads/pyramid-red.jpeg"},{"name":"RAL 3020 Красный","image_url":"/uploads/pyramid-red-2.jpeg"},{"name":"RAL 3009 Темно-красный","image_url":"/uploads/pyramid-burgundy.jpeg"},{"name":"RAL 3011 Коричнево-красный","image_url":"/uploads/pyramid-red-3.jpeg"}]'),
(159, 'Саморез 29мм сверло', 0.0, 4.0, '/uploads/samorez-29mm.png', 10000, '2026-01-26 12:51:16', 'Кровля', 'шт', 0, 1.0, '[{"name":"RAL 6005 Зеленый","colorCode":"#0F4336","image":"/uploads/samorez-29mm.png"},{"name":"RAL 3005 Красный","colorCode":"#5E2028","image":"/uploads/samorez-29mm.png"},{"name":"RAL 8017 Шоколад","colorCode":"#5c4a3d","image":"/uploads/samorez-29mm.png"},{"name":"RAL 7024 Графит","colorCode":"#4b4d4e","image":"/uploads/samorez-29mm.png"},{"name":"RAL 9003 Белый","colorCode":"#ffffff","image":"/uploads/samorez-29mm.png"},{"name":"RAL 1015 Слоновая кость","colorCode":"#E6D2B5","image":"/uploads/samorez-29mm.png"},{"name":"RAL 5005 Синий","colorCode":"#004B93","image":"/uploads/samorez-29mm.png"},{"name":"RAL 9006 Серебро","colorCode":"#A1A1A0","image":"/uploads/samorez-29mm.png"},{"name":"RAL 3011 Вишня","colorCode":"#781F2E","image":"/uploads/samorez-29mm.png"},{"name":"RAL 8019 Темно-коричневый","colorCode":"#403A3A","image":"/uploads/samorez-29mm.png"},{"name":"Оцинкованный","colorCode":"#C0C0C0","image":"/uploads/samorez-29mm.png"}]'),
(160, 'Желоб 3м', 445.0, 750.0, '/uploads/zhelob-3m.jpg', 100, '2026-01-26 12:51:16', 'Водосточная система (круглая)', 'шт', 20, 1.1, '[{"color":"RAL 8017 Шоколад","colorCode":"#5c4a3d","image_url":"/uploads/zhelob-8017-brown.jpg"},{"color":"RAL 6005 Зеленый","colorCode":"#0F4336","image_url":"/uploads/zhelob-6005-green.jpg"},{"color":"RAL 3005 Красный","colorCode":"#5E2028","image_url":"/uploads/zhelob-3005-red.jpg"},{"color":"RAL 9003 Белый","colorCode":"#ffffff","image_url":"/uploads/zhelob-9003-white.jpg"},{"color":"RAL 7024 Графит","colorCode":"#4b4d4e","image_url":"/uploads/zhelob-7024-gray.jpg"},{"color":"RAL 5005 Синий","colorCode":"#004B93","image_url":"/uploads/zhelob-5005-blue.jpg"},{"color":"RAL 2004 Оранжевый","colorCode":"#E25303","image_url":"/uploads/zhelob-2004-orange.jpg"},{"color":"RAL 3011 Медь","colorCode":"#781F2E","image_url":"/uploads/zhelob-3011-copper.jpg"}]'),
(185, 'Заглушка квадратная', 60.0, 120.0, '/uploads/zaglushka-blue.jpg', 100, '2026-01-27 02:03:11', 'Водосточная система (квадратная)', 'шт', 0, 1.0, NULL);

-- Reset sequence for id
SELECT setval(pg_get_serial_sequence('products', 'id'), COALESCE(MAX(id), 1)) FROM products;
