create database loja_peruca;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(12) NOT NULL,
  `dataNasc` date NOT NULL,
  `email` varchar(70) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `sexo` varchar(12) NOT NULL,
  `endereco` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `loja_peruca`.`funcionarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(100) NOT NULL,
  `registro` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `loja_peruca`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(200) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `loja_peruca`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` TEXT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `estoque` INT NOT NULL DEFAULT 0 CHECK (`estoque` >= 0),
  `categoria_id` INT NOT NULL,
  `imagem` VARCHAR(255) NULL,
  `ativo` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_produto_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `loja_peruca`.`categorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `loja_peruca`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `data_pedido` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'pendente',
  `endereco_entrega` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pedido_cliente`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `loja_peruca`.`clientes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `loja_peruca`.`itens_pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pedido_id` INT NOT NULL,
  `produto_id` INT NOT NULL,
  `quantidade` INT NOT NULL DEFAULT 1 CHECK (`quantidade` > 0),
  `preco_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_item_pedido`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `loja_peruca`.`pedidos` (`id`),
  CONSTRAINT `fk_item_produto`
    FOREIGN KEY (`produto_id`)
    REFERENCES `loja_peruca`.`produtos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed: initial categories
INSERT INTO `loja_peruca`.`categorias` (`nome`, `descricao`) VALUES
  ('Perucas Naturais', 'Perucas confeccionadas com cabelo 100% natural'),
  ('Perucas Sintéticas', 'Perucas em fibra sintética de alta qualidade'),
  ('Apliques', 'Apliques para alongamento e volume'),
  ('Acessórios', 'Toucas, sprays e kits de cuidados capilares');

-- Seed: initial products
INSERT INTO `loja_peruca`.`produtos` (`nome`, `descricao`, `preco`, `estoque`, `categoria_id`) VALUES
  ('Peruca Lisa Longa',    'Cabelo 100% natural, liso e sedoso. Comprimento longo.', 349.90, 15, 1),
  ('Peruca Cacheada Média','Cachos naturais volumosos e despojados.',                 289.90,  8, 1),
  ('Peruca Ruiva Sintética','Ruiva vibrante em fibra sintética de alta qualidade.',  149.90, 20, 2),
  ('Peruca Curta Bob',     'Corte chanel moderno e elegante.',                       119.90, 12, 2),
  ('Aplique Liso 60cm',    'Aplique de cabelo liso para alongar e dar volume.',       89.90, 30, 3),
  ('Aplique Cacheado',     'Aplique cacheado para integrar ao cabelo natural.',       99.90, 18, 3),
  ('Touca para Peruca',    'Touca confortável que mantém a peruca fixada.',           19.90, 50, 4),
  ('Kit Cuidados Capilar', 'Kit completo: shampoo, condicionador e spray.',           69.90, 25, 4);
