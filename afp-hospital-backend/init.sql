-- SQLBook: Code
USE apss;

/**
 * Taballe:
 * 	- ospedale
 * 		- id PK int -- 9
 * 		- nome
 
 * 	- anagrafica
 * 		- id PK int -- 9
 * 		- nome 
 * 		- cognome
 * 		- data_nascita
 * 		- codice_fiscale
 * 
 *  - reparto
 * 		- id PK
 * 		- nome
 * 		- descrizione
 * 
 *  - paziente
 * 		- id PK
 * 		- codice 'PR001'
 * 		- codice_colore [''] NUULL
 * 		- stato ['']
 * 		- reparto_id 
 * 		- anag_id
 * 		- FK reparto_id
 * 		- FK anag_id
 */

-- OSPEDALE
CREATE TABLE ospedale(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
);

-- ANAGRAFICA
CREATE TABLE anagrafica(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	cognome VARCHAR(50) NOT NULL,
	data_nascita DATE NOT NULL,
	codice_fiscale VARCHAR(16) UNIQUE NOT NULL
);

-- REPARTO
CREATE TABLE reparto(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	descrizione TEXT,
	ospedale_id INT,

	FOREIGN KEY (ospedale_id) REFERENCES ospedale(id)
);

-- PAZIENTE
CREATE TABLE paziente(
	id INT AUTO_INCREMENT PRIMARY KEY,
	codice VARCHAR(32),
	codice_colore ENUM('BIANCO', 'VERDE', 'AZZURRO', 'ARANCIONE', 'ROSSO'),
	stato ENUM('IN ATTESA', 'IN CARICO', 'TRASFERITO', 'DIMESSO'),
    data_inserimento DATE NOT NULL,
	reparto_id INT,
    ospedale_id INT,
	anagrafica_id INT NOT NULL,
	
	FOREIGN KEY (reparto_id) REFERENCES reparto(id),
	FOREIGN KEY (ospedale_id) REFERENCES ospedale(id),
	FOREIGN KEY (anagrafica_id) REFERENCES anagrafica(id)
);

 INSERT INTO ospedale (nome) VALUES
 ('Trento'),
 ('Arco'),
 ('Cavalese'),
 ('Tione'),
 ('Rovereto'),
 ('Cles'),
 ('Borgo Valsugana');

INSERT INTO anagrafica (nome, cognome, data_nascita, codice_fiscale) VALUES
('Mario', 'Rossi', '1980-05-15', 'RSSMRA80M15H501Z'),
('Luigi', 'Verdi', '1975-09-23', 'VRDLGU75P23F205X'),
('Anna', 'Bianchi', '1990-12-11', 'BNCHNN90T51L736Y'),
('Carla', 'Neri', '1985-07-30', 'NRECRL85L70A662W'),
('Giorgio', 'Gialli', '1992-03-20', 'GLLGRG92C20H501Y'),
('Paola', 'Blu', '1988-11-25', 'BLUPLA88S65F205V'),
('Stefano', 'Marroni', '1970-01-10', 'MRRSTF70A10L736U'),
('Elena', 'Azzurri', '1995-06-05', 'ZZRLNE95H45A662T'),
('Roberto', 'Viola', '1982-04-17', 'VLARRT82D17H501S'),
('Laura', 'Arancioni', '1978-08-29', 'RNCLEU78M29F205R'),
('Pietro', 'Rocchio', '2001-01-19', 'RCCPTR01A19H612K');

INSERT INTO reparto (nome, descrizione, ospedale_id) VALUES
('Cardiologia', 'Reparto specializzato nelle malattie cardiovascolari', 1),
('Neurologia', 'Reparto dedicato alle patologie del sistema nervoso', 2),
('Ortopedia', 'Reparto focalizzato su ossa e muscoli', 2),
('Pediatria', 'Reparto dedicato alla cura dei bambini', 1),
('Chirurgia Generale', 'Reparto per interventi chirurgici di varia natura', 1),
('Pronto Soccorso', 'Reparto emergenza/urgenza', 1),
('Cardiologia', 'Reparto specializzato nelle malattie cardiovascolari', 2),
('Neurologia', 'Reparto dedicato alle patologie del sistema nervoso', 3),
('Ortopedia', 'Reparto focalizzato su ossa e muscoli', 4),
('Pediatria', 'Reparto dedicato alla cura dei bambini', 3),
('Chirurgia Generale', 'Reparto per interventi chirurgici di varia natura', 5),
('Pronto Soccorso', 'Reparto emergenza/urgenza', 2),
('Pronto Soccorso', 'Reparto emergenza/urgenza', 4),
('Pronto Soccorso', 'Reparto emergenza/urgenza', 6);

-- Assegnazione Pazienti
INSERT INTO paziente (anagrafica_id, reparto_id, codice, codice_colore, stato, data_inserimento, ospedale_id) VALUES
(1, NULL, 'MR515', 'VERDE', 'IN ATTESA', '1111-11-11', 1),
(3, 4, 'AB901', 'ARANCIONE', 'TRASFERITO', '1111-11-11', 2),
(4, NULL, 'CN730', 'BIANCO', 'DIMESSO', '1111-11-11', 3),
(11, 6, 'PR191', 'AZZURRO', 'IN CARICO', '1111-11-11', 4),
(5, NULL, 'GG320', 'ROSSO', 'IN CARICO', '1111-11-11', 5);