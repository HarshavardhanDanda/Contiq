
CREATE TABLE IF NOT EXISTS `contiq`.`notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_read` TINYINT NULL,
  `uploaded_by` INT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `user_id` INT NOT NULL,
  `file_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notification_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_notification_file1_idx` (`file_id` ASC) VISIBLE,
  CONSTRAINT `fk_notification_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `contiq`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notification_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `contiq`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;