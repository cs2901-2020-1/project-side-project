import java.io.File;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import config.Constants;

@SpringBootApplication
@ComponentScan({"controller", "services", "config" })
@EntityScan("data.entities")
@EnableJpaRepositories("data.repositories")
public class ApprendoApplication extends SpringBootServletInitializer implements WebMvcConfigurer {

	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        File uploads = new File(Constants.IMAGE_PATH);
        uploads.mkdir();
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:"+ Constants.IMAGE_PATH);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/files/**").allowedOrigins("*");
    }

	public static void main(String[] args) {
		SpringApplication.run(ApprendoApplication.class, args);
	}

}
