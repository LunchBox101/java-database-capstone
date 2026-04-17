package com.project.back_end;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
		"spring.autoconfigure.exclude="
				+ "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,"
				+ "org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,"
				+ "org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,"
				+ "org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration"
})
class BackEndApplicationTests {

	@Test
	void contextLoads() {
	}

}
