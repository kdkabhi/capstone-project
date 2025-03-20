package com.example.spring_cap;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Name of the booking (e.g., a package name)
    private String date; // Date of the booking

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Constructors, getters, and setters
    public Booking() {}

    public Booking(String name, String date, User user) {
        this.name = name;
        this.date = date;
        this.user = user;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDate() { return date; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDate(String date) { this.date = date; }
    public void setUser(User user) { this.user = user; }
}