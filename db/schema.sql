USE f03tve9panxb4ual;

CREATE TABLE IF NOT EXISTS profiles (
   id int auto_increment not null,
   name VARCHAR(50),
   photo VARCHAR(255),
   scores VARCHAR(50),
   primary key(id)
);

select * from profiles;