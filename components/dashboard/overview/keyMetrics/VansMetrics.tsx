import React from 'react'
import Card from '../../Card';
import {
    TruckIcon,
  } from "@heroicons/react/24/outline";

const VansMetrics = ({vansTotal}) => {
  return (
    <Card
        className="bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm"
        content={
          <div>
            <div className="flex items-center justify-between">
              <div className="text-amber-600">
                <TruckIcon className="h-8 w-8" />
              </div>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              {vansTotal}
            </h3>
            <p className="text-sm font-medium text-gray-600">Total Vans booked</p>
          </div>
        }
      />
  )
}

export default VansMetrics