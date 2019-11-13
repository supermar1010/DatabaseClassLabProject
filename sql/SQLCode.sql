CREATE User(
user_ID VARCHAR(5),
u_name VARCHAR(30) NOT NULL,
u_pwd VARCHAR(30) NOT NULL,
is_admin BIT DEFAULT 0,
PRIMARY KEY (user_ID)
);

CREATE MetaData(
ID VARCHAR(5),
file_size DECIMAL(4,0) NOT NULL,
date_added DATE,
number_of_updates SMALLINT, 
user_ID VARCHAR(5),
file_ID VARCHAR(5),
PRIMARY KEY (ID),
FOREIGN KEY (user_ID) REFERENCES User(user_ID),
FOREIGN KEY (file_ID) REFERENCES File(file_ID)
);

CREATE File(
file_ID VARCHAR(5),
file_content VARCHAR(30),
file_location VARCHAR(30),
PRIMARY KEY (file_ID)
);
