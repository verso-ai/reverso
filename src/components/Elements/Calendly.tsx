import React, { FC, useContext, useEffect, useState, useMemo } from 'react';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../ReversoForm/ReversoForm';
import { PageContext } from '../ReversoPage/ReversoPage';
import { setSubmissionValue } from '../../lib/elements';
import DatePicker from './DatePicker';
import AvailableTimes from './AvailableTimes';
// import { twMerge } from 'tailwind-merge';
import dayjs, { Dayjs } from '../../packages/dayjs';

interface Props {
  name: string;
  label?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
}

export type EventType = {
  id: number;
  /**
   * @zod.nonempty()
   */
  title: string;
  /**
   * @zod.custom(imports.eventTypeSlug)
   */
  slug: string;
  description: string | null;
  position: number;
  /**
   * @zod.custom(imports.eventTypeLocations)
   */
  locations: object | null;
  length: number;
  hidden: boolean;
  userId: number | null;
  teamId: number | null;
  eventName: string | null;
  timeZone: string | null;
  periodType: 'UNLIMITED';
  periodStartDate: Date | null;
  periodEndDate: Date | null;
  periodDays: number | null;
  periodCountCalendarDays: boolean | null;
  requiresConfirmation: boolean;
  /**
   * @zod.custom(imports.recurringEventType)
   */
  recurringEvent: object | null;
  disableGuests: boolean;
  hideCalendarNotes: boolean;
  minimumBookingNotice: number;
  beforeEventBuffer: number;
  afterEventBuffer: number;
  seatsPerTimeSlot: number | null;
  schedulingType: object | null;
  scheduleId: number | null;
  price: number;
  currency: string;
  slotInterval: number | null;
  metadata: object | null;
  /**
   * @zod.custom(imports.successRedirectUrl)
   */
  successRedirectUrl: string | null;
};

export function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ');
}

const useSlots = ({}: {
  eventTypeId: number;
  eventTypeSlug: string;
  startTime?: Dayjs;
  endTime?: Dayjs;
  timeZone?: string;
}) => {
  const { data, isLoading, isIdle } = {
    data: {
      slots: {
        '2022-09-01': [],
        '2022-09-02': [],
        '2022-09-03': [],
        '2022-09-04': [],
        '2022-09-05': [],
        '2022-09-06': [],
        '2022-09-07': [],
        '2022-09-08': [],
        '2022-09-09': [],
        '2022-09-10': [],
        '2022-09-11': [],
        '2022-09-12': [],
        '2022-09-13': [],
        '2022-09-14': [],
        '2022-09-15': [],
        '2022-09-16': [],
        '2022-09-17': [],
        '2022-09-18': [],
        '2022-09-19': [],
        '2022-09-20': [
          {
            time: '2022-09-20T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-20T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-21': [
          {
            time: '2022-09-21T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-21T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-22': [
          {
            time: '2022-09-22T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-22T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-23': [
          {
            time: '2022-09-23T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-23T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-24': [],
        '2022-09-25': [],
        '2022-09-26': [
          {
            time: '2022-09-26T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-26T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-27': [
          {
            time: '2022-09-27T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-27T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-28': [
          {
            time: '2022-09-28T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-28T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-29': [
          {
            time: '2022-09-29T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-29T15:30:00.000Z',
            users: ['test'],
          },
        ],
        '2022-09-30': [
          {
            time: '2022-09-30T08:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T08:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T09:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T09:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T10:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T10:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T11:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T11:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T12:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T12:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T13:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T13:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T14:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T14:30:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T15:00:00.000Z',
            users: ['test'],
          },
          {
            time: '2022-09-30T15:30:00.000Z',
            users: ['test'],
          },
        ],
      },
    },
    isLoading: false,
    isIdle: false,
  };
  const [cachedSlots, setCachedSlots] = useState<any>({});

  useEffect(() => {
    if (data?.slots) {
      setCachedSlots((c: any) => ({ ...c, ...data?.slots }));
    }
  }, [data]);

  // The very first time isIdle is set if auto-fetch is disabled, so isIdle should also be considered a loading state.
  return { slots: cachedSlots, isLoading: isLoading || isIdle };
};

const SlotPicker = ({
  eventType,
  // timeFormat,
  timeZone,
  // recurringEventCount,
  // seatsPerTimeSlot,
  weekStart = 0,
}: // ethSignature,
{
  eventType: Pick<EventType, 'id' | 'schedulingType' | 'slug'>;
  timeFormat: string;
  timeZone?: string;
  seatsPerTimeSlot?: number;
  recurringEventCount?: number;
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  ethSignature?: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [browsingDate, setBrowsingDate] = useState<Dayjs>();
  // const { date, setQuery: setDate } = useRouterQuery('date');
  // const { month, setQuery: setMonth } = useRouterQuery('month');
  const [date, setDate] = useState('2022-09-27');
  const [month, setMonth] = useState('2022-09');

  useEffect(() => {
    // Etc/GMT is not actually a timeZone, so handle this select option explicitly to prevent a hard crash.
    if (timeZone === 'Etc/GMT') {
      setBrowsingDate(
        dayjs
          .utc(month)
          .set('date', 1)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
      );
      if (date) {
        setSelectedDate(dayjs.utc(date));
      }
    } else {
      // Set the start of the month without shifting time like startOf() may do.
      setBrowsingDate(
        dayjs
          .tz(month, timeZone)
          .set('date', 1)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
      );
      if (date) {
        // It's important to set the date immediately to the timeZone, dayjs(date) will convert to browsertime.
        setSelectedDate(dayjs.tz(date, timeZone));
      }
    }
  }, [month, date, timeZone]);

  const { slots: _1 } = useSlots({
    eventTypeId: eventType.id,
    eventTypeSlug: eventType.slug,
    startTime: selectedDate?.startOf('day'),
    endTime: selectedDate?.endOf('day'),
    timeZone,
  });
  const { slots: _2, isLoading } = useSlots({
    eventTypeId: eventType.id,
    eventTypeSlug: eventType.slug,
    startTime: browsingDate?.startOf('month'),
    endTime: browsingDate?.endOf('month'),
    timeZone,
  });

  const slots = useMemo(() => ({ ..._2, ..._1 }), [_1, _2]);

  return (
    <>
      <DatePicker
        isLoading={isLoading}
        className={classNames(
          'mt-8 w-full px-4 sm:mt-0 sm:min-w-[455px] md:px-5',
          true ? 'sm:w-1/2 sm:p-4 sm:pr-6 md:w-1/3' : 'sm:p-4'
        )}
        includedDates={Object.keys(slots).filter(k => slots[k].length > 0)}
        locale={'en'}
        selected={selectedDate}
        onChange={newDate => {
          setDate(newDate.format('YYYY-MM-DD'));
        }}
        onMonthChange={newMonth => {
          setMonth(newMonth.format('YYYY-MM'));
        }}
        browsingDate={browsingDate}
        weekStart={weekStart}
      />

      {selectedDate && (
        <AvailableTimes
          isLoading={isLoading}
          slots={slots[selectedDate.format('YYYY-MM-DD')]}
          date={selectedDate}
          timeFormat={'HH:mm'}
          eventTypeId={eventType.id}
          eventTypeSlug={eventType.slug}
          seatsPerTimeSlot={1}
          recurringCount={undefined}
        />
      )}
    </>
  );
};

export const Calendly: FC<Props> = ({
  name,
  label,
  //   Icon,
  classNames,
  //   placeholder,
  //   required,
}) => {
  const [checked] = useState<string[]>([]);
  const { setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  useEffect(() => {
    setSubmissionValue(checked, pageName, name, setSubmission);
  }, [checked]);

  return (
    <div className="flex">
      {label && (
        <label
          htmlFor={name}
          className={
            classNames.label || 'block text-sm font-medium text-gray-700'
          }
        >
          {label}
        </label>
      )}

      <SlotPicker
        weekStart={1}
        eventType={{
          // title: '30 Min Meeting',
          slug: '30min',
          // hidden: false,
          // recurringEvent: null,
          // length: 30,
          // locations: [],
          id: 20,
          // description: null,
          // price: 0,
          // currency: 'usd',
          // requiresConfirmation: false,
          schedulingType: null,
          // metadata: {},
          // seatsPerTimeSlot: null,
          // users: [
          //   {
          //     name: 'test',
          //     username: 'test',
          //     hideBranding: false,
          //     plan: 'FREE',
          //     timeZone: 'Europe/London',
          //   },
          // ],
          // descriptionAsSafeHTML: null,
        }}
        timeFormat={'HH:mm'}
        timeZone={'America/New_York'}
      />
    </div>
  );
};
