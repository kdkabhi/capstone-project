package com.example.spring_cap.repository;


import com.example.spring_cap.model.TripBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripBookingRepository extends JpaRepository<TripBooking, Long> {
    List<TripBooking> findByDestinationAndDate(String destination, String date);
}
