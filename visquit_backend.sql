CREATE TABLE USER_TB (
    user_id INT(11) unsigned AUTO_INCREMENT,
    user_name varchar(32),
    primary key (user_id)
);

CREATE TABLE STORE_TB (
    store_id INT(11) unsigned AUTO_INCREMENT,
    user_id INT(11) unsigned,
    store_location varchar(32),
    store_tel varchar(11),
    primary key (store_id),
    foreign key (user_id) references USER_TB (user_id)
);

CREATE TABLE MENU_TB (
    menu_id INT(11) unsigned AUTO_INCREMENT,
    store_id INT(11) unsigned,
    menu_name varchar(32),
    menu_price INT(11) unsigned,
    primary key (menu_id),
    foreign key (store_id) references STORE_TB (store_id)
);

CREATE TABLE ORDERS_TB (
    order_id INT(11) unsigned AUTO_INCREMENT,
    store_id INT(11) unsigned,
    order_date DATE,
    order_num INT(11) unsigned,
    order_time TIME,
    order_price INT(11) unsigned,
    primary key (order_id),
    foreign key (store_id) references STORE_TB (store_id)    
);

CREATE TABLE ORDERITEM_TB (
    item_id INT(11) unsigned AUTO_INCREMENT,
    order_id INT(11) unsigned,
    menu_id INT(11) unsigned,
    store_id INT(11) unsigned,
    item_quantity INT(11) unsigned,
    item_price INT(11) unsigned,
    primary key (item_id),
    foreign key (order_id) references ORDERS_TB (order_id),
    foreign key (menu_id) references MENU_TB (menu_id),
    foreign key (store_id) references STORE_TB (store_id)
);

