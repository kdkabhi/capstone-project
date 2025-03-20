package com.example.spring_cap.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trip_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TripBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destination;
    private String date;
    private String travelers;
    private boolean addFlight;
    private boolean addCar;
}