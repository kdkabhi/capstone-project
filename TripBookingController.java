package com.example.spring_cap;

import com.example.spring_cap.model.TripBooking;
import com.example.spring_cap.service.TripBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Adjust if frontend runs on a different port
@RestController
@RequestMapping("/api/trip-bookings")
public class TripBookingController {

    @Autowired
    private TripBookingService tripBookingService;

    @PostMapping("/search")
    public List<TripBooking> searchBookings(@RequestBody TripBooking tripBookingRequest) {
        return tripBookingService.searchBookings(tripBookingRequest);
    }
}