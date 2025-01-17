CREATE TABLE `recado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `autor` varchar(100) NOT NULL,
  `recado` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `recado` (`id`, `autor`, `recado`) VALUES
(1, 'miguel', 'odeio o js'),
(2, 'André Lacerda', 'Odeio o JavaScripto'),
(3, 'João Miguel', 'Pow, mas eu curto PHP'),
(4, 'Anonino3Coracoes', 'Vcs só falam de TI, asm a situaçãum no Brasil tá ossu, bro!');
