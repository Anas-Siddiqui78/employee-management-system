package com.anas.employee_management_system.service;

import com.anas.employee_management_system.entity.Employee;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Long id);

    Employee updateEmployee(Long id, Employee employee);

    void deleteEmployee(Long id);

    List<Employee> searchEmployeeByName(String name);

    Page<Employee> getAllEmployeesWithPagination(int page, int size);

    Page<Employee> searchEmployeesByNameWithPagination(String name, int page, int size);
}