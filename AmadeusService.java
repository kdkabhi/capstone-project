package com.example.spring_cap.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AmadeusService {

    private static final String AMADEUS_BASE_URL = "https://test.api.amadeus.com";
    private static final String API_KEY = "ITxonxMoGMz8Y2tKB2ISrvZ3Kryjuh2P";
    private static final String API_SECRET = "gUEk5nj1IEGpuDfN";

    private final RestTemplate restTemplate;

    public AmadeusService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Method to get an access token from Amadeus
    private String getAccessToken() {
        String url = AMADEUS_BASE_URL + "/v1/security/oauth2/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String requestBody = "grant_type=client_credentials&client_id=" + API_KEY + "&client_secret=" + API_SECRET;

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        // Parse the response to extract the access token
        if (response.getStatusCode() == HttpStatus.OK) {
            // Use a JSON parser (e.g., Jackson) to extract the token
            // For simplicity, assume the response is a JSON string like: {"access_token": "your_token"}
            return response.getBody(); // Replace with actual parsing logic
        } else {
            throw new RuntimeException("Failed to get access token: " + response.getStatusCode());
        }
    }

    // Method to search for flights
    public String searchFlights(String origin, String destination, String departureDate) {
        String url = AMADEUS_BASE_URL + "/v2/shopping/flight-offers";
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("originLocationCode", origin)
                .queryParam("destinationLocationCode", destination)
                .queryParam("departureDate", departureDate)
                .queryParam("adults", 1);

        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, String.class);

        return response.getBody();
    }

    // Method to search for hotels
    public String searchHotels(String cityCode, String checkInDate, String checkOutDate) {
        String url = AMADEUS_BASE_URL + "/v2/shopping/hotel-offers";
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("cityCode", cityCode)
                .queryParam("checkInDate", checkInDate)
                .queryParam("checkOutDate", checkOutDate);

        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, String.class);

        return response.getBody();
    }

    // Method to search for cars
    public String searchCars(String pickUpLocation, String dropOffLocation, String pickUpDate, String dropOffDate) {
        String url = AMADEUS_BASE_URL + "/v2/shopping/car-offers";
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("pickUpLocation", pickUpLocation)
                .queryParam("dropOffLocation", dropOffLocation)
                .queryParam("pickUpDate", pickUpDate)
                .queryParam("dropOffDate", dropOffDate);

        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, String.class);

        return response.getBody();
    }
}