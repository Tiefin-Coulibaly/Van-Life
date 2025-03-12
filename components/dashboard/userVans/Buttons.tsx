"use client";

import React from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

/**
 * CreateInvoice Component
 *
 * A button that navigates to the invoice creation page.
 *
 * Features:
 * - **Responsive Design:** Displays text only on larger screens (md+).
 * - **Accessible:** Uses focus-visible for better keyboard navigation.
 * - **Hover and transition effects** for better UX.
 *
 * @returns {React.ReactElement} A button linking to the invoice creation page.
 */
export function CreateInvoice(): React.ReactElement {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

/**
 * UpdateInvoice Component
 *
 * A button that navigates to the invoice editing page.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.id - The unique ID of the invoice.
 * @returns {React.ReactElement} A button linking to the invoice editing page.
 */
export function UpdateInvoice({ id }: { id: string }): React.ReactElement {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

/**
 * DeleteInvoice Component
 *
 * A form button that submits a request to delete an invoice.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.id - The unique ID of the invoice to be deleted.
 * @returns {React.ReactElement} A form with a delete button for the invoice.
 */
export function DeleteInvoice({ id }: { id: string }): React.ReactElement {
  return (
    <form action="">
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
