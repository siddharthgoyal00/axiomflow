package com.axiomflow.axiomflow_backend.auth.dto;

import com.axiomflow.axiomflow_backend.auth.entity.User;

public record UserResponse(
    String id,
    String name,
    String email,
    String plan,
    long tokensUsed,
    long tokenQuota
) {
    public static UserResponse from(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPlan().name().toLowerCase(),
            user.getTokensUsed(),
            user.getTokenQuota()
        );
    }
}
