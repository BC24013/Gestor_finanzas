package com.gestorfinanzas.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Salud Financiera")
                        .version("1.0")
                        .description("Sistema de salud financiera")
                        .contact(new Contact()
                                .name("""
                                      Alisson Patricia Barillas Castillo - BC24013,
                                      Oscar Miguel Herrera Valladares - HV22011,
                                      Franklin Esteban Perez Fuentes - PF24001,
                                      Héctor Danilo Benítez Ortéz - BO16004,
                                      Jonás Eduardo Villalobos Morán - VM24042
                                      """))
                )
                .servers(List.of(
                        new Server().url("http://localhost:8081").description("Servidor Local de Desarrollo")
                ));
    }
}