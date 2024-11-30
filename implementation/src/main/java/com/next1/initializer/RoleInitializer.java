package com.next1.initializer;

import com.next1.entities.ERole;
import com.next1.entities.RoleEntity;
import com.next1.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class RoleInitializer implements CommandLineRunner {

        @Autowired
        RoleRepository roleRepository;

        @Override
        public void run(String... args) throws Exception {

            if (!roleRepository.existsByName(ERole.RROLE_PASSAGER)) {
                roleRepository.save(new RoleEntity(ERole.RROLE_PASSAGER));
            }

            if (!roleRepository.existsByName(ERole.ROLE_ADMIN)) {
                roleRepository.save(new RoleEntity(ERole.ROLE_ADMIN));
            }
        }
}
