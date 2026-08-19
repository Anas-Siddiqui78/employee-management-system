package com.anas.employee_management_system.service;

import com.anas.employee_management_system.entity.Employee;
import com.anas.employee_management_system.exception.EmployeeNotFoundException;
import com.anas.employee_management_system.repository.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(
                                "Employee not found with id: " + id));
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public List<Employee> searchEmployeeByName(String name) {
        return employeeRepository.findByName(name);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);

        if (existingEmployee != null) {
            existingEmployee.setName(employee.getName());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setDepartment(employee.getDepartment());
            existingEmployee.setSalary(employee.getSalary());

            return employeeRepository.save(existingEmployee);
        }

        return null;
    }

    // ==================== NEW PAGINATION METHODS ====================

    /**
     * Get all employees with pagination
     * @param page - page number (0-indexed)
     * @param size - number of employees per page
     * @return Page of employees
     */
    @Override
    public Page<Employee> getAllEmployeesWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return employeeRepository.findAll(pageable);
    }

    /**
     * Search employees by name with pagination
     * @param name - employee name to search
     * @param page - page number (0-indexed)
     * @param size - number of employees per page
     * @return Page of employees matching the name
     */
    @Override
    public Page<Employee> searchEmployeesByNameWithPagination(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return employeeRepository.findByName(name, pageable);
    }



}