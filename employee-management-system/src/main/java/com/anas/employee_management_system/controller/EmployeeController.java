package com.anas.employee_management_system.controller;

import com.anas.employee_management_system.entity.Employee;
import com.anas.employee_management_system.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // CREATE EMPLOYEE
    @PostMapping
    public Employee saveEmployee(@Valid @RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    // GET ALL EMPLOYEES
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // GET EMPLOYEE BY ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // UPDATE EMPLOYEE
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id,
                                   @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    // DELETE EMPLOYEE
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return "Employee deleted successfully";
    }

    // SEARCH EMPLOYEE BY NAME
    @GetMapping("/search")
    public List<Employee> searchEmployeeByName(@RequestParam String name) {
        return employeeService.searchEmployeeByName(name);
    }

    // PAGINATION
    @GetMapping("/page")
    public Page<Employee> getEmployeesWithPagination(
            @RequestParam int page,
            @RequestParam int size) {

        return employeeService.getAllEmployeesWithPagination(page, size);
    }

    // SEARCH + PAGINATION
    @GetMapping("/search/page")
    public Page<Employee> searchEmployeesWithPagination(
            @RequestParam String name,
            @RequestParam int page,
            @RequestParam int size) {

        return employeeService.searchEmployeesByNameWithPagination(
                name, page, size);
    }
}