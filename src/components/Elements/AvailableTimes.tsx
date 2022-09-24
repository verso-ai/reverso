import { FC, useEffect, useState } from 'react';

import dayjs, { Dayjs } from '../../packages/dayjs';
import { nameOfDay } from '../../lib/weekday';
import { timeZone } from '../../lib/clock';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Slot = {
  time: string;
  attendees?: number;
  bookingUid?: string;
  users?: string[];
};

type AvailableTimesProps = {
  timeFormat: string;
  eventTypeId: number;
  recurringCount: number | undefined;
  eventTypeSlug: string;
  date: Dayjs;
  seatsPerTimeSlot?: number | null;
  slots?: Slot[];
  isLoading: boolean;
  ethSignature?: string;
};

const AvailableTimes: FC<AvailableTimesProps> = ({
  slots = [],
  isLoading,
  date,
  eventTypeId,
  eventTypeSlug,
  recurringCount,
  timeFormat,
  seatsPerTimeSlot,
  ethSignature,
}) => {
  const rescheduleUid = 12345;

  const [brand, setBrand] = useState('#292929');
  const [selectedSlot, setSelectedSlot] = useState<any>();

  useEffect(() => {
    setBrand(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--brand-color')
        .trim()
    );
  }, []);

  return (
    <div className="dark:bg-darkgray-100 mt-8 flex flex-col px-4 text-center sm:mt-0 sm:w-1/3 sm:p-5 md:-mb-5">
      <div className="mb-4 text-left text-sm">
        <span className="text-bookingdarker dark:text-darkgray-800 mb-8 w-1/2 break-words font-semibold text-gray-900">
          {nameOfDay('es', Number(date.format('d')))}
        </span>
        <span className="text-bookinglight font-medium">
          {date.format(', D ')}
          {date.toDate().toLocaleString('es', { month: 'long' })}
        </span>
      </div>
      <div className="grid flex-grow grid-cols-1 gap-x-2 overflow-y-auto sm:block md:h-[364px]">
        {slots.length > 0 &&
          slots.map(slot => {
            type BookingURL = {
              pathname: string;
              query: Record<string, string | number | string[] | undefined>;
            };
            const bookingUrl: BookingURL = {
              pathname: 'book',
              query: {
                // ...router.query,
                date: dayjs(slot.time).format(),
                type: eventTypeId,
                slug: eventTypeSlug,
                /** Treat as recurring only when a count exist and it's not a rescheduling workflow */
                count:
                  recurringCount && !rescheduleUid ? recurringCount : undefined,
                ethSignature,
              },
            };

            if (rescheduleUid) {
              bookingUrl.query.rescheduleUid = (rescheduleUid as unknown) as string;
            }

            // If event already has an attendee add booking id
            if (slot.bookingUid) {
              bookingUrl.query.bookingUid = slot.bookingUid;
            }

            return (
              <div key={dayjs(slot.time).format()}>
                {/* Current there is no way to disable Next.js Links */}
                {seatsPerTimeSlot &&
                slot.attendees &&
                slot.attendees >= seatsPerTimeSlot ? (
                  <div
                    className={twMerge(
                      'text-gray dark:bg-darkgray-200 dark:text-darkgray-900 mb-2 block rounded-sm border bg-white py-2  font-medium opacity-25 dark:border-transparent ',
                      brand === '#fff' || brand === '#ffffff' ? '' : ''
                    )}
                  >
                    {dayjs(slot.time)
                      .tz(timeZone())
                      .format(timeFormat)}
                    {!!seatsPerTimeSlot && (
                      <p className="text-xs">{'Fully Booked'}</p>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => setSelectedSlot(dayjs(slot.time).format())}
                    className={twMerge(
                      'text-primary-500 hover:border-gray-900 hover:bg-gray-50 cursor-pointer',
                      'dark:bg-darkgray-200 dark:hover:bg-darkgray-300 dark:hover:border-blue mb-2 block rounded-md border bg-white py-2 text-xs font-regular dark:border-transparent dark:text-neutral-200',
                      brand === '#fff' || brand === '#ffffff' ? '' : '',
                      selectedSlot === dayjs(slot.time).format() ? 'bg-blue font-white' : '',
                    )}
                    data-testid="time"
                  >
                    {dayjs(slot.time)
                      .tz(timeZone())
                      .format(timeFormat)}
                    {!!seatsPerTimeSlot && (
                      <p
                        className={`${
                          slot.attendees &&
                          slot.attendees / seatsPerTimeSlot >= 0.8
                            ? 'text-rose-600'
                            : slot.attendees &&
                              slot.attendees / seatsPerTimeSlot >= 0.33
                            ? 'text-yellow-500'
                            : 'text-emerald-400'
                        } text-xs`}
                      >
                        {slot.attendees
                          ? seatsPerTimeSlot - slot.attendees
                          : seatsPerTimeSlot}{' '}
                        / {seatsPerTimeSlot} {'puestos disponibles'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        {!isLoading && !slots.length && (
          <div className="-mt-4 flex h-full w-full flex-col content-center items-center justify-center">
            <h1 className="my-6 text-xl text-black dark:text-white">
              {'No hay horarios disponibles'}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableTimes;
