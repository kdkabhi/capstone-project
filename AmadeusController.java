package com.example.spring_cap;

import com.example.spring_cap.service.AmadeusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/amadeus")
public class AmadeusController {

    @Autowired
    private AmadeusService amadeusService;

    @GetMapping("/flights")
    public String searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam String departureDate) {
        return amadeusService.searchFlights(origin, destination, departureDate);
    }

    @GetMapping("/hotels")
    public String searchHotels(
            @RequestParam String cityCode,
            @RequestParam String checkInDate,
            @RequestParam String checkOutDate) {
        return amadeusService.searchHotels(cityCode, checkInDate, checkOutDate);
    }

    @GetMapping("/cars")
    public String searchCars(
            @RequestParam String pickUpLocation,
            @RequestParam String dropOffLocation,
            @RequestParam String pickUpDate,
            @RequestParam String dropOffDate) {
        return amadeusService.searchCars(pickUpLocation, dropOffLocation, pickUpDate, dropOffDate);
    }
}