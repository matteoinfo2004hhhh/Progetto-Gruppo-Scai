package com.videogioco.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080") // Imposta l'origine consentita per le richieste CORS
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Imposta i metodi HTTP consentiti
                .allowedHeaders("*"); // Imposta gli header consentiti
    }
}