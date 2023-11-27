package com.contiq.userservice.exception;

import lombok.Data;

@Data
public class UserErrorResponse {
    private int status;
    private String message;
    private long timeStamp;

    public UserErrorResponse(int status, String message, long timeStamp) {
        this.status = status;
        this.message = message;
        this.timeStamp = timeStamp;
    }

}
