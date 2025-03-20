package com.example.spring_cap.service;


import com.example.spring_cap.model.TripBooking;
import com.example.spring_cap.repository.TripBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripBookingService {

    @Autowired
    private TripBookingRepository tripBookingRepository;

    public List<TripBooking> searchBookings(TripBooking tripBookingRequest) {
        return tripBookingRepository.findByDestinationAndDate(
                tripBookingRequest.getDestination(),
                tripBookingRequest.getDate()
        );
    }
}