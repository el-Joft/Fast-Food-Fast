CREATE TABLE users
(
   id SERIAL PRIMARY KEY NOT NULL,
    role INT DEFAULT 0,
    email varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    phone varchar(15),
    firstname varchar(250) NOT NULL,
    lastname varchar(250),
    address TEXT,
    city TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    zipcode varchar(15)
);

CREATE TABLE category
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(40) NOT NULL,  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);



CREATE TABLE menus
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NULL,
  price INT NOT NULL,
  categoryid INT NOT NULL,
  FOREIGN KEY (categoryid) REFERENCES category (id),
  isAvailable BOOLEAN NOT NULL,
  created_date TIMESTAMP DEFAULT NOW(),
  modified_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders
(
  id SERIAL PRIMARY KEY,
  menuid INT NOT NULL,
  FOREIGN KEY (menuId) REFERENCES menus (id),
  timeordered TIME WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
  orderedby INT NOT NULL,
  FOREIGN KEY (orderedby) REFERENCES users (id),
  quantity   INT NOT NULL,
  totalprice MONEY NOT NULL,
  created_date TIMESTAMP DEFAULT NOW(),
  modified_date TIMESTAMP DEFAULT NOW()
);


-- create users
INSERT INTO users (role, email, password, phone, firstname, lastname, address, city, zipcode) 
VALUES (1,'ottimothy@gmail.com', '$2a$10$UYSh5KyTJiNJKMRDjOGpYuh2DfAPjmFkIEeH6kn/QHYILhD2MOOae', '08136681130', 'Timothy', 'Fehintolu', 'Andela Nigeria', 'yaba', 331107);
