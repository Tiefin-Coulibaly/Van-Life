"use client";

import React, { useEffect } from "react";
import { formatDate } from "@/app/lib/actions/dashboardActions";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Notification } from "@prisma/client";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/app/lib/actions/dashboardActions";
import { useRouter } from "next/navigation";

const Notifications = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [notifications]);

  const filteredNotifications = React.useMemo(() => {
    if (!notifications) return [];
    return notifications.filter(
      (notification) => notification.type === "Booking",
    );
  }, [notifications]);

  const sortedNotifications = React.useMemo(() => {
    return [...filteredNotifications].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [filteredNotifications]);

  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Booking Notifications
      </h2>

      <ul className="divide-y divide-gray-200">
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`cursor-pointer py-4 ${
                notification.read
                  ? "text-gray-600"
                  : "font-medium text-gray-800"
              }`}
              onClick={async () => {
                if (!notification.read) {
                  await markNotificationAsRead(notification.id);
                }
              }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  {notification.title && (
                    <p className="font-semibold">{notification.title}</p>
                  )}
                  <p className={`${notification.title ? "mt-1" : ""}`}>
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </p>

                  {/* Link if available */}
                  {notification.link && (
                    <a
                      href={notification.link}
                      className="mt-2 block text-sm text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View details
                    </a>
                  )}
                </div>
                {!notification.read && (
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="py-8 text-center text-gray-500">
            No booking notifications
          </li>
        )}
      </ul>

      {sortedNotifications.some((notification) => !notification.read) && (
        <div className="mt-4 flex justify-end">
          <button
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            onClick={async () => await markAllNotificationsAsRead()}
          >
            Mark all as read
          </button>
        </div>
      )}
    </section>
  );
};

export default Notifications;
