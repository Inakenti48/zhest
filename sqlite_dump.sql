PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'admin'
  );
INSERT INTO users VALUES(1,'admin','admin123','admin');
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    buy_price REAL NOT NULL,
    sell_price REAL NOT NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  , category TEXT DEFAULT 'Общее', unit TEXT DEFAULT 'шт', full_width REAL, useful_width REAL, thickness REAL, color TEXT, image_padding INTEGER DEFAULT 0, image_scale DECIMAL(3,2) DEFAULT 1.0, variants TEXT, sizes TEXT);
INSERT INTO products VALUES(157,'Пирамида Чешуя',0.0,1500.0,'/uploads/piramida-cheshuya.jpeg',100,'2026-01-26 12:51:16','Кровля','шт',NULL,NULL,NULL,NULL,0,1,'[{"name":"RAL 6005 Зеленый","color":"RAL 6005 Зеленый","colorCode":"#0F4336","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 3005 Красный","color":"RAL 3005 Красный","colorCode":"#5E2028","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 8017 Шоколад","color":"RAL 8017 Шоколад","colorCode":"#5c4a3d","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 7024 Графит","color":"RAL 7024 Графит","colorCode":"#4b4d4e","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 9003 Белый","color":"RAL 9003 Белый","colorCode":"#ffffff","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 1015 Слоновая кость","color":"RAL 1015 Слоновая кость","colorCode":"#E6D2B5","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 5005 Синий","color":"RAL 5005 Синий","colorCode":"#004B93","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 9006 Серебро","color":"RAL 9006 Серебро","colorCode":"#A1A1A0","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 3011 Вишня","color":"RAL 3011 Вишня","colorCode":"#781F2E","image":"/uploads/piramida-cheshuya.jpeg"},{"name":"RAL 8019 Темно-коричневый","color":"RAL 8019 Темно-коричневый","colorCode":"#403A3A","image":"/uploads/piramida-cheshuya.jpeg"}]',NULL);
INSERT INTO products VALUES(158,'Пирамида',0.0,48.0,'/uploads/pyramid-brown-1.jpeg',1000,'2026-01-26 12:51:16','Кровля','шт',NULL,NULL,NULL,NULL,24,1,'[{"name":"RAL 8017 Коричневый","color":"RAL 8017 Коричневый","image_url":"/uploads/pyramid-brown-1.jpeg"},{"name":"RAL 8014 Коричневый","color":"RAL 8014 Коричневый","image_url":"/uploads/pyramid-brown-2.jpeg"},{"name":"RAL 8004 Терракот","color":"RAL 8004 Терракот","image_url":"/uploads/pyramid-brown-3.jpeg"},{"name":"RAL 9005 Черный","color":"RAL 9005 Черный","image_url":"/uploads/pyramid-black.jpeg"},{"name":"RAL 8019 Темно-коричневый","color":"RAL 8019 Темно-коричневый","image_url":"/uploads/pyramid-black-2.jpeg"},{"name":"RAL 5005 Синий","color":"RAL 5005 Синий","image_url":"/uploads/pyramid-blue.jpeg"},{"name":"RAL 1015 Бежевый","color":"RAL 1015 Бежевый","image_url":"/uploads/pyramid-beige.jpeg"},{"name":"RAL 9003 Белый","color":"RAL 9003 Белый","image_url":"/uploads/pyramid-white.jpeg"},{"name":"RAL 6005 Зеленый","color":"RAL 6005 Зеленый","image_url":"/uploads/pyramid-green.jpeg"},{"name":"RAL 3005 Вишневый","color":"RAL 3005 Вишневый","image_url":"/uploads/pyramid-red.jpeg"},{"name":"RAL 3020 Красный","color":"RAL 3020 Красный","image_url":"/uploads/pyramid-red-2.jpeg"},{"name":"RAL 3009 Темно-красный","color":"RAL 3009 Темно-красный","image_url":"/uploads/pyramid-burgundy.jpeg"},{"name":"RAL 3011 Коричнево-красный","color":"RAL 3011 Коричнево-красный","image_url":"/uploads/pyramid-red-3.jpeg"}]',NULL);
INSERT INTO products VALUES(159,'Саморез 29мм сверло',0.0,4.0,'/uploads/samorez-29mm.png',10000,'2026-01-26 12:51:16','Кровля','шт',NULL,NULL,NULL,NULL,0,1,'[{"name":"RAL 6005 Зеленый","color":"RAL 6005 Зеленый","colorCode":"#0F4336","image":"/uploads/samorez-29mm.png"},{"name":"RAL 3005 Красный","color":"RAL 3005 Красный","colorCode":"#5E2028","image":"/uploads/samorez-29mm.png"},{"name":"RAL 8017 Шоколад","color":"RAL 8017 Шоколад","colorCode":"#5c4a3d","image":"/uploads/samorez-29mm.png"},{"name":"RAL 7024 Графит","color":"RAL 7024 Графит","colorCode":"#4b4d4e","image":"/uploads/samorez-29mm.png"},{"name":"RAL 9003 Белый","color":"RAL 9003 Белый","colorCode":"#ffffff","image":"/uploads/samorez-29mm.png"},{"name":"RAL 1015 Слоновая кость","color":"RAL 1015 Слоновая кость","colorCode":"#E6D2B5","image":"/uploads/samorez-29mm.png"},{"name":"RAL 5005 Синий","color":"RAL 5005 Синий","colorCode":"#004B93","image":"/uploads/samorez-29mm.png"},{"name":"RAL 9006 Серебро","color":"RAL 9006 Серебро","colorCode":"#A1A1A0","image":"/uploads/samorez-29mm.png"},{"name":"RAL 3011 Вишня","color":"RAL 3011 Вишня","colorCode":"#781F2E","image":"/uploads/samorez-29mm.png"},{"name":"RAL 8019 Темно-коричневый","color":"RAL 8019 Темно-коричневый","colorCode":"#403A3A","image":"/uploads/samorez-29mm.png"},{"name":"Оцинкованный","color":"Оцинкованный","colorCode":"#C0C0C0","image":"/uploads/samorez-29mm.png"}]',NULL);
INSERT INTO products VALUES(160,'Желоб 3м',445.0,750.0,'/uploads/zhelob-3m.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,20,1.100000000000000089,'[{"color":"RAL 8017 Шоколад","colorCode":"#5c4a3d","image_url":"/uploads/zhelob-8017-brown.jpg"},{"color":"RAL 6005 Зеленый","colorCode":"#0F4336","image_url":"/uploads/zhelob-6005-green.jpg"},{"color":"RAL 3005 Красный","colorCode":"#5E2028","image_url":"/uploads/zhelob-3005-red.jpg"},{"color":"RAL 9003 Белый","colorCode":"#ffffff","image_url":"/uploads/zhelob-9003-white.jpg"},{"color":"RAL 7024 Графит","colorCode":"#4b4d4e","image_url":"/uploads/zhelob-7024-gray.jpg"},{"color":"RAL 5005 Синий","colorCode":"#004B93","image_url":"/uploads/zhelob-5005-blue.jpg"},{"color":"RAL 2004 Оранжевый","colorCode":"#E25303","image_url":"/uploads/zhelob-2004-orange.jpg"},{"color":"RAL 3011 Медь","colorCode":"#781F2E","image_url":"/uploads/zhelob-3011-copper.jpg"}]',NULL);
INSERT INTO products VALUES(161,'Угол желоба 90°',250.0,450.0,'/images/products/90.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,20,1.100000000000000089,'[{"color":"RAL 9003 Сигнальный белый","colorCode":"#ffffff","image_url":"/images/products/90.jpg"},{"color":"RAL 7024 Графитовый серый","colorCode":"#4b4d4e","image_url":"/uploads/ugol-zeloba-darkblue.jpg"},{"color":"RAL 6005 Зеленый","colorCode":"#0F4336","image_url":"/uploads/ugol-zeloba-green.jpg"},{"color":"RAL 5005 Синий","colorCode":"#004B93","image_url":"/uploads/ugol-zeloba-blue.jpg"}]',NULL);
INSERT INTO products VALUES(163,'Труба 3м',595.0,900.0,'/uploads/truba-3m-blue.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(164,'Труба 1м',200.0,300.0,'/uploads/truba-blue.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(165,'Держатель трубы',65.0,150.0,'/uploads/derzhatel-long-blue.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(166,'Крепление труб водосточной системы',500.0,700.0,'/uploads/piramida.jpeg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,'[{"name":"RAL 805 Чёрный","color":"#0A0A0A","image":"/uploads/piramida.jpeg"}]',NULL);
INSERT INTO products VALUES(167,'С10 8017 Шоколад',450.0,480.0,'/uploads/monterey-brown.jpg',100,'2026-01-26 12:51:16','Профнастил','кв.м.',1.179999999999999938,1.149999999999999911,0.4500000000000000111,'8017',0,1,NULL,NULL);
INSERT INTO products VALUES(168,'С19 8017 Шоколад',460.0,495.0,'/uploads/monterey-darkbrown.jpg',100,'2026-01-26 12:51:16','Профнастил','кв.м.',1.149999999999999911,1.100000000000000089,0.4500000000000000111,'8017',0,1,NULL,NULL);
INSERT INTO products VALUES(169,'С21 8017 Шоколад',480.0,520.0,'/uploads/monterey-brown.jpg',100,'2026-01-26 12:51:16','Профнастил','кв.м.',1.050000000000000044,1.0,0.4500000000000000111,'8017',0,1,NULL,NULL);
INSERT INTO products VALUES(170,'Воронка',150.0,250.0,'/uploads/voronka-nika-blue.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(171,'Заглушка',50.0,100.0,'/uploads/zaglushka-blue.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(172,'Угол внешний',200.0,350.0,'/uploads/ugol-vnesh-gray.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(173,'Колено 135°',180.0,300.0,'/uploads/ugol135-blue.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(174,'Водосток',300.0,500.0,'/uploads/vodostok-blue.jpg',100,'2026-01-26 12:51:16','Водосточная система (круглая)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(175,'Конёк',200.0,350.0,'/uploads/konek-8017.jpg',100,'2026-01-26 12:51:16','Кровля','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(176,'Снегозадержатель',400.0,650.0,'/uploads/snegoderjatel-green.jpg',100,'2026-01-26 12:51:16','Кровля','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(177,'Монтерей',350.0,500.0,'/uploads/monterey-green.jpg',100,'2026-01-26 12:51:16','Металлочерепица','кв.м.',NULL,NULL,NULL,NULL,0,1,'[{"color":"Зеленый","colorCode":"#0F4336","image_url":"/uploads/monterey-green.jpg"},{"color":"Красный","colorCode":"#5E2028","image_url":"/uploads/monterey-red.jpg"},{"color":"Шоколад","colorCode":"#5c4a3d","image_url":"/uploads/monterey-brown.jpg"},{"color":"Бордовый","colorCode":"#722F37","image_url":"/uploads/monterey-burgundy.jpg"},{"color":"Синий","colorCode":"#004B93","image_url":"/uploads/monterey-blue.jpg"},{"color":"Белый","colorCode":"#ffffff","image_url":"/uploads/monterey-white.jpg"},{"color":"Терракота","colorCode":"#CC4E3E","image_url":"/uploads/monterey-terracotta.jpg"}]',NULL);
INSERT INTO products VALUES(178,'Каскад',380.0,550.0,'/uploads/cascad-green.jpg',100,'2026-01-26 12:51:16','Металлочерепица','кв.м.',NULL,NULL,NULL,NULL,0,1,'[{"color":"Зеленый","colorCode":"#0F4336","image_url":"/uploads/cascad-green.jpg"},{"color":"Шоколад","colorCode":"#5c4a3d","image_url":"/uploads/cascad-chocolate.jpg"},{"color":"Синий","colorCode":"#004B93","image_url":"/uploads/cascad-blue.jpg"},{"color":"Графит","colorCode":"#4b4d4e","image_url":"/uploads/cascad-graphite.jpg"},{"color":"Серебро","colorCode":"#C0C0C0","image_url":"/uploads/cascad-silver.jpg"},{"color":"Черный","colorCode":"#1a1a1a","image_url":"/uploads/cascad-black.jpg"},{"color":"Вишня","colorCode":"#781F2E","image_url":"/uploads/cascad-cherry.jpg"},{"color":"Терракота","colorCode":"#CC4E3E","image_url":"/uploads/cascad-terracotta.jpg"}]',NULL);
INSERT INTO products VALUES(179,'Адамант',400.0,600.0,'/uploads/adamant-green.jpg',100,'2026-01-26 12:51:16','Металлочерепица','кв.м.',NULL,NULL,NULL,NULL,0,1,'[{"color":"Зеленый","colorCode":"#0F4336","image_url":"/uploads/adamant-green.jpg"},{"color":"Шоколад","colorCode":"#5c4a3d","image_url":"/uploads/adamant-chocolate.jpg"},{"color":"Бордовый","colorCode":"#722F37","image_url":"/uploads/adamant-burgundy.jpg"},{"color":"Синий","colorCode":"#004B93","image_url":"/uploads/adamant-blue.jpg"},{"color":"Коричневый","colorCode":"#8B4513","image_url":"/uploads/adamant-brown.jpg"},{"color":"Красный","colorCode":"#5E2028","image_url":"/uploads/adamant-red.jpg"},{"color":"Серый","colorCode":"#808080","image_url":"/uploads/adamant-gray.jpg"},{"color":"Светло-серый","colorCode":"#D3D3D3","image_url":"/uploads/adamant-gray-light.jpg"}]',NULL);
INSERT INTO products VALUES(180,'Желоб квадратный 3м',500.0,850.0,'/uploads/zhelob-3m.jpg',100,'2026-01-26 12:54:25','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(181,'Труба квадратная 3м',650.0,1000.0,'/uploads/truba-3m-blue.jpg',100,'2026-01-26 12:54:25','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(182,'Труба квадратная 1м',250.0,400.0,'/uploads/truba-blue.jpg',100,'2026-01-26 12:54:25','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(183,'Воронка квадратная',200.0,350.0,'/uploads/voronka-nika-blue.jpg',100,'2026-01-26 12:54:25','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(184,'Колено квадратное',180.0,300.0,'/uploads/ugol135-blue.jpg',100,'2026-01-26 12:54:25','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(185,'Заглушка квадратная',60.0,120.0,'/uploads/zaglushka-blue.jpg',100,'2026-01-27 02:03:11','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(186,'Держатель трубы квадратный',80.0,180.0,'/uploads/derzhatel-long-blue.jpg',100,'2026-01-26 12:54:25','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(187,'Угол желоба квадратный',280.0,500.0,'/uploads/ugol-kv-blue.jpg',100,'2026-01-26 12:54:25','Водосточная система (квадратная)','шт',NULL,NULL,NULL,NULL,0,1,NULL,NULL);
INSERT INTO products VALUES(188,'Саморезы',5.0,15.0,'/uploads/screw-white.png',1000,'2026-01-26 13:23:31','Крепёж','шт',NULL,NULL,NULL,NULL,0,1,'[{"name":"RAL 9003","image":"/uploads/screw-white.png"},{"name":"RAL 8017","image":"/uploads/screw-brown-1.jpeg"},{"name":"RAL 8014","image":"/uploads/screw-brown-2.png"},{"name":"RAL 8004","image":"/uploads/screw-brown-3.png"},{"name":"RAL 8019","image":"/uploads/screw-brown-4.png"},{"name":"RAL 3005","image":"/uploads/screw-red-1.png"},{"name":"RAL 3011","image":"/uploads/screw-red-2.png"},{"name":"RAL 2004","image":"/uploads/screw-orange.png"},{"name":"RAL 9005","image":"/uploads/screw-black.png"},{"name":"RAL 7024","image":"/uploads/screw-gray.png"},{"name":"RAL 1015","image":"/uploads/screw-beige.png"},{"name":"RAL 6005","image":"/uploads/screw-green.png"},{"name":"RAL 5005","image":"/uploads/screw-blue.png"}]',NULL);
INSERT INTO products VALUES(189,'Чешуя',0.0,1800.0,'/uploads/pyramid-1.jpeg',100,'2026-01-26 22:18:12','Кровля','шт',NULL,NULL,NULL,NULL,0,1,'[{"name":"RAL 5005 Синий","color":"RAL 5005 Синий","colorCode":"#005387","image":"/uploads/pyramid-1.jpeg"},{"name":"RAL 9005 Черный","color":"RAL 9005 Черный","colorCode":"#0E0E10","image":"/uploads/pyramid-2.jpeg"},{"name":"RAL 6005 Зеленый","color":"RAL 6005 Зеленый","colorCode":"#0F4336","image":"/uploads/pyramid-3.jpeg"},{"name":"RAL 7004 Серый","color":"RAL 7004 Серый","colorCode":"#9A9A9A","image":"/uploads/pyramid-4.jpeg"},{"name":"RAL 1015 Бежевый","color":"RAL 1015 Бежевый","colorCode":"#E6D2B5","image":"/uploads/pyramid-5.jpeg"},{"name":"RAL 7024 Графит","color":"RAL 7024 Графит","colorCode":"#474A51","image":"/uploads/pyramid-6.jpeg"},{"name":"RAL 8017 Шоколад","color":"RAL 8017 Шоколад","colorCode":"#45322E","image":"/uploads/pyramid-7.jpeg"},{"name":"RAL 3005 Вишня","color":"RAL 3005 Вишня","colorCode":"#5E2028","image":"/uploads/pyramid-8.jpeg"},{"name":"RAL 8004 Терракот","color":"RAL 8004 Терракот","colorCode":"#8D4931","image":"/uploads/pyramid-9.jpeg"},{"name":"RAL 3020 Красный","color":"RAL 3020 Красный","colorCode":"#C1121C","image":"/uploads/pyramid-10.jpeg"},{"name":"Оцинкованный","color":"Оцинкованный","colorCode":"#C0C0C0","image":"/uploads/pyramid-11.jpeg"}]',NULL);
CREATE TABLE sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    total_price REAL NOT NULL,
    sale_date DATETIME DEFAULT CURRENT_TIMESTAMP, product_name TEXT, payment_method TEXT DEFAULT 'Наличными',
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity REAL NOT NULL,
    price_at_time REAL NOT NULL,
    unit TEXT DEFAULT 'шт',
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    pin TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
INSERT INTO employees VALUES(1,'Тест Тестов','1234','2026-01-17 14:37:23');
CREATE TABLE work_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    products_made TEXT,
    total_items INTEGER DEFAULT 0,
    work_date DATE DEFAULT (DATE('now')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
  );
CREATE TABLE workers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    position TEXT,
    salary REAL DEFAULT 0,
    conditions TEXT,
    rating INTEGER DEFAULT 100,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
CREATE TABLE attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'present',
    check_in TEXT,
    check_out TEXT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (worker_id) REFERENCES workers(id)
  );
INSERT INTO sqlite_sequence VALUES('users',1);
INSERT INTO sqlite_sequence VALUES('products',189);
INSERT INTO sqlite_sequence VALUES('employees',1);
CREATE INDEX idx_sales_product_id ON sales(product_id);
CREATE INDEX idx_sales_sale_date ON sales(sale_date);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_work_logs_employee_id ON work_logs(employee_id);
CREATE INDEX idx_work_logs_work_date ON work_logs(work_date);
CREATE INDEX idx_workers_login ON workers(login);
CREATE INDEX idx_attendance_worker_id ON attendance(worker_id);
CREATE INDEX idx_attendance_date ON attendance(date);
COMMIT;
