package com.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = "com")
@EnableMongoRepositories(basePackages = "com.repository")
public class CorporateCreditManagementPlatformApplication {

    private static final Logger logger =
            LoggerFactory.getLogger(CorporateCreditManagementPlatformApplication.class);


    public static void main(String[] args) {
		SpringApplication.run(CorporateCreditManagementPlatformApplication.class, args);

        logger.info("spring app is up...");
	}

}
