Для того чтобы запусить это приложение понадобится версия node не ниже 8.17.0
php версии 7.1.32
чтобы запустить проект в  MySQL нужно создать БД person_db, в ней таблицу persons
командой :
CREATE TABLE `person_db`.`persons` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `age` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
затем запустить БД (я запускал через XAMPP)
в проекте перейти в папку front в командной строке: npm i && npm start
в далее в другой командной строке перейти в yii-test/basic ввести команду: php yii serve
# !!!ВАЖНО
# Поскольку политика CORS не давала мне возможности получать запрос с портов на localhost мне пришлось установить расширение хром
# https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=ru
# это временное решение
