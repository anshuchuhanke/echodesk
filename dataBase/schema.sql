CREATE TABLE customers (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(30)
);

CREATE TABLE products (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    returnable BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) REFERENCES customers(id),
    order_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10,2),
    expected_delivery DATE,
    tracking_number VARCHAR(100)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(20) REFERENCES orders(id),
    product_id VARCHAR(20) REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE returns (
    id VARCHAR(20) PRIMARY KEY,
    order_id VARCHAR(20) REFERENCES orders(id),
    product_id VARCHAR(20) REFERENCES products(id),
    reason VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refunds (
    id VARCHAR(20) PRIMARY KEY,
    order_id VARCHAR(20) REFERENCES orders(id),
    amount DECIMAL(10,2),
    status VARCHAR(50),
    initiated_at TIMESTAMP,
    expected_date DATE
);

CREATE TABLE support_tickets (
    id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) REFERENCES customers(id),
    order_id VARCHAR(20) REFERENCES orders(id),
    issue TEXT,
    priority VARCHAR(20),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);