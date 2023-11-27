package com.contiq.userservice.entity;

import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;


import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class UserTest {
    @Rule
    public MockitoRule mockitoRule = MockitoJUnit.rule();

    @BeforeEach
    public void setup() {
        user = new User();
        MockitoAnnotations.initMocks(this);
    }

    private User user;

    @Test
    void testAllArgsConstructor() {
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        User user = new User(1, "John", "Doe", "password", currentDateTimeIST, currentDateTimeIST);

        assertEquals(1, user.getId());
        assertEquals("John", user.getUsername());
        assertEquals("Doe", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals(currentDateTimeIST, user.getCreatedAt());
        assertEquals(currentDateTimeIST, user.getUpdatedAt());
    }

    @Test
    void testUser() {
        assertNotNull(user);
    }

    @Test
    void testId() {
        user.setId(1);
        assertEquals(1, user.getId());
    }

    @Test
    void testUsername() {
        user.setUsername("John");
        assertEquals("John", user.getUsername());
    }

    @Test
    void testEmail() {
        user.setEmail("john@example.com");
        assertEquals("john@example.com", user.getEmail());
    }
    @Test
    void testPassword() {
        user.setPassword("password123");
        assertEquals("password123", user.getPassword());
    }

    @Test
    void testCreatedAt() {
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        user.setCreatedAt(currentDateTimeIST);
        assertEquals(currentDateTimeIST, user.getCreatedAt());
    }

    @Test
    void testUpdatedAt() {
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        user.setUpdatedAt(currentDateTimeIST);
        assertEquals(currentDateTimeIST, user.getUpdatedAt());
    }

    @Test
    void testDefaultConstructor() {
        User user = new User();
        assertNotNull(user);
        assertEquals(0, user.getId());
    }

}
