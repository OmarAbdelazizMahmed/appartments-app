CREATE TABLE IF NOT EXISTS users (
    id          VARCHAR PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE APARTMENTS (
    id          VARCHAR PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location    VARCHAR(255) NOT NULL,
    image       VARCHAR(255) NOT NULL,
    user_id     VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);