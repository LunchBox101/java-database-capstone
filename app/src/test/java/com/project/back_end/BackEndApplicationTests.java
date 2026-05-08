package com.project.back_end;

import com.project.back_end.repo.PrescriptionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
class BackEndApplicationTests {

	@MockitoBean
	private PrescriptionRepository prescriptionRepository;

	@Test
	void contextLoads() {
	}

}
