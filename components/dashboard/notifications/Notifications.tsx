"use client";

import React from "react";

/**
 * Notification Type
 *
 * Defines the structure of a notification message.
 */
interface Notification {
  id: number;
  message: string;
}

/**
 * Notifications Component
 *
 * Displays a list of notifications, such as booking confirmations or updates.
 * - **Renders notifications in a structured format.**
 * - **Provides a clean and responsive UI.**
 * - **Easily extendable for future notification types.**
 *
 * @returns {React.ReactElement} A styled section displaying user notifications.
 */
const Notifications: React.FC = (): React.ReactElement => {
  // Mocked notification data (Replace with real data from an API or state management)
  const notifications: Notification[] = [
    { id: 1, message: "Your booking for 'Nomadic Spirit' has been confirmed!" },
    { id: 2, message: "Payment for 'Adventure Van' was successful." },
  ];

  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Notifications</h2>

      {/* Notification List */}
      <ul className="divide-y divide-gray-200">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id} className="py-3 text-gray-800">
              {notification.message}
            </li>
          ))
        ) : (
          <li className="py-3 text-gray-500">No new notifications</li>
        )}
      </ul>
    </section>
  );
};

export default Notifications;
