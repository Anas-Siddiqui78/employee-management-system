package com.anas.employee_management_system.repository;

import com.anas.employee_management_system.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByName(String name);

    // Paginated search
    Page<Employee> findByName(String name, Pageable pageable);
}