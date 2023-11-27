
CREATE TABLE IF NOT EXISTS `contiq`.`file` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `type` ENUM('pdf', 'ppt', 'img') NULL,
  `content` BLOB NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `uploaded_by` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_file_user1_idx` (`uploaded_by` ASC) VISIBLE,
  CONSTRAINT `fk_file_user1`
    FOREIGN KEY (`uploaded_by`)
    REFERENCES `contiq`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
