"use client";

import React from 'react';

interface NotificationProps {
  message: React.ReactNode;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div className="notification-container">
      {message && (
        <div className="notification" dangerouslySetInnerHTML={{ __html: message as string }} />
      )}
    </div>
  );
};

export default Notification;
