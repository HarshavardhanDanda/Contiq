package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.dto.NotificationDTO;
import com.contiq.notificationservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","https://bc127fe.spcluster.tk"},methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.PATCH})
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }


    @PostMapping
    public ResponseEntity<NotificationDTO> addNotification(@RequestBody NotificationDTO notificationDTO) {
        NotificationDTO newNotification = notificationService.addNotification(notificationDTO);
        return new ResponseEntity<>(newNotification, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getNotificationsByUserId(@RequestParam("userId") int userId) {
        List<NotificationDTO> notifications = notificationService.getNotificationsByUserId(userId);
        if (notifications.isEmpty()) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(notifications, HttpStatus.OK);
        }
    }
    @PatchMapping("/{notificationId}")
    public ResponseEntity<NotificationDTO> markNotificationAsRead(@PathVariable int notificationId) {
        NotificationDTO markedNotification = notificationService.markNotificationAsRead(notificationId);

        if (markedNotification != null) {
            return new ResponseEntity<>(markedNotification, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new NotificationDTO(), HttpStatus.NOT_FOUND);
        }
    }
}
