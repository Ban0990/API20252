CREATE TABLE categorias (

  cat_id INT AUTO_INCREMENT PRIMARY KEY,

  cat_nombre VARCHAR(100),

  cat_descripcion TEXT

);

 

ALTER TABLE productos

ADD cat_id INT,

ADD CONSTRAINT fk_prod_cat FOREIGN KEY (cat_id) REFERENCES categorias(cat_id);