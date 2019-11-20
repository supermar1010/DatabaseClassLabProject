CREATE TABLE IF NOT EXISTS User(
ID INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
pwd VARCHAR(30) NOT NULL,
is_admin BIT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS File(
ID INT AUTO_INCREMENT PRIMARY KEY,
file_content LONGTEXT,
file_location VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS MetaData(
ID INT AUTO_INCREMENT PRIMARY KEY,
file_size DECIMAL(4,0) NOT NULL,
date_added INT,
number_of_updates SMALLINT,
user_ID INT,
file_ID INT,
FOREIGN KEY (user_ID) REFERENCES User(ID),
FOREIGN KEY (file_ID) REFERENCES File(ID)
);
