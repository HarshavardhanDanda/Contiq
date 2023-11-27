package com.contiq.notificationservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.contiq.notificationservice.dto.NotificationDTO;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.repository.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

 class NotificationServiceImplTest {

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
     void setup() {
        notificationRepository = mock(NotificationRepository.class);
        modelMapper = mock(ModelMapper.class);
        notificationService = new NotificationServiceImpl(notificationRepository, modelMapper);
    }


        @Test
         void testAddNotification() {
            NotificationDTO requestDTO = new NotificationDTO();
            NotificationDTO notificationDTO = new NotificationDTO();

            when(modelMapper.map(requestDTO, Notification.class)).thenReturn(new Notification());
            when(notificationRepository.save(any(Notification.class))).thenReturn(new Notification());
            when(modelMapper.map(any(Notification.class), eq(NotificationDTO.class))).thenReturn(notificationDTO);

            NotificationDTO responseDTO = notificationService.addNotification(requestDTO);

            verify(modelMapper, times(1)).map(requestDTO, Notification.class);
            verify(notificationRepository, times(1)).save(any(Notification.class));
            verify(modelMapper, times(1)).map(any(Notification.class), eq(NotificationDTO.class));

            assertNotNull(responseDTO);
        }


        @Test
         void testGetNotificationsByUserId() {
            int userId = 1;

            Notification notification1 = new Notification();
            notification1.setId(1);
            notification1.setUserId(userId);
            notification1.setIsRead(false);

            Notification notification2 = new Notification();
            notification2.setId(2);
            notification2.setUserId(userId);
            notification2.setIsRead(true);

            List<Notification> notifications = Arrays.asList(notification1, notification2);

            when(notificationRepository.findByUserId(userId)).thenReturn(notifications);

            List<NotificationDTO> notificationDTOList = notificationService.getNotificationsByUserId(userId);

            assertNotNull(notificationDTOList);
            assertEquals(2, notificationDTOList.size());
        }

        @Test
         void testMarkNotificationAsRead() {
            int notificationId = 1;

            Notification notification = new Notification();
            notification.setId(notificationId);
            notification.setIsRead(false);

            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setId(notificationId);
            notificationDTO.setIsRead(true);

            when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(notification));
            when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
            when(modelMapper.map(notification, NotificationDTO.class)).thenReturn(notificationDTO);

            NotificationDTO markedAsRead = notificationService.markNotificationAsRead(notificationId);

            assertNotNull(markedAsRead);
            assertTrue(markedAsRead.getIsRead());
        }
        @Test
         void testMarkNotificationAsRead_NotFound() {
            int notificationId = 1;

            when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());
            assertThrows(NotificationNotFoundException.class, () -> {
                notificationService.markNotificationAsRead(notificationId);
            });

            verify(notificationRepository, times(1)).findById(notificationId);
        }


}
