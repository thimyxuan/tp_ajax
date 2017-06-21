CREATE DATABASE IF NOT EXISTS MikeMonRoi;

USE MikeMonRoi;

CREATE TABLE voiture (
  id INT(5) NOT NULL AUTO_INCREMENT,
  marque VARCHAR(60) NOT NULL,
  modele VARCHAR(60) NOT NULL,
  annee YEAR NOT NULL,
  couleur ENUM('black','white','blue','mike'),
  image VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB ;