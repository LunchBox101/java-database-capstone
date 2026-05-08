package com.project.back_end.services;

import java.util.HashMap;
import java.util.Map;

@org.springframework.stereotype.Service
public class Service {

    private final TokenService tokenService;

    public Service(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    public Map<String, Object> validateToken(String token, String role) {
        Map<String, Object> response = new HashMap<>();
        if (!tokenService.validateToken(token, role)) {
            response.put("error", "Unauthorized: Invalid or expired token");
            response.put("status", 401);
        }
        return response;
    }
}
