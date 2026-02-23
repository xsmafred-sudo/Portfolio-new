'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useDictionary } from '@/hooks/use-dictionary';

const dayNamesMap: Record<string, string[]> = {
  en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  fr: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
  zh: ['日', '一', '二', '三', '四', '五', '六'],
  ja: ['日', '月', '火', '水', '木', '金', '土'],
};

interface CalendarDayProps {
  day: number | string;
  isHeader?: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, isHeader }) => {
  const isActive = !isHeader && day === new Date().getDate();

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center rounded-xl ${
        isHeader
          ? ''
          : isActive
            ? 'bg-indigo-500 text-white'
            : 'text-muted-foreground'
      }`}
    >
      <span className={`font-medium ${isHeader ? 'text-xs' : 'text-sm'}`}>
        {day}
      </span>
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  linkTo?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  linkTo,
}) => {
  const cardContent = (
    <div
      className={`group relative flex flex-col rounded-2xl border border-border bg-card p-6 hover:bg-accent/10 h-auto ${className}`}
    >
      {linkTo && (
        <div className="absolute bottom-4 right-6 z-[999] flex h-12 w-12 rotate-6 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
          <svg
            className="h-6 w-6 text-indigo-600"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.25 15.25V6.75H8.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L6.75 17.25"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </div>
  );

  if (linkTo) {
    return linkTo.startsWith('/') ? (
      <Link href={linkTo} className="block">
        {cardContent}
      </Link>
    ) : (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

interface CalendarProps {
  calLink?: string;
}

export function Calendar({ calLink }: CalendarProps) {
  const dict = useDictionary();
  const bookingLink =
    calLink || process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com/prosper20';

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString(
    dict.nav.home === 'Accueil'
      ? 'fr-FR'
      : dict.nav.home === '首页'
        ? 'zh-CN'
        : dict.nav.home === 'ホーム'
          ? 'ja-JP'
          : 'en-US',
    { month: 'long' }
  );
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const lang =
    dict.nav.home === 'Accueil'
      ? 'fr'
      : dict.nav.home === '首页'
        ? 'zh'
        : dict.nav.home === 'ホーム'
          ? 'ja'
          : 'en';
  const dayNames = dayNamesMap[lang] || dayNamesMap.en;

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array(firstDayOfWeek)
        .fill(null)
        .map((_, i) => (
          <div
            key={`empty-start-${i}`}
            className="col-span-1 row-span-1 h-8 w-8"
          />
        )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => <CalendarDay key={`date-${i + 1}`} day={i + 1} />),
    ];
    return days;
  };

  return (
    <BentoCard linkTo={bookingLink}>
      <div className="grid h-full gap-5">
        <div>
          <h2 className="mb-4 text-lg md:text-3xl font-semibold">
            {dict.booking?.title || 'Book a Meeting'}
          </h2>
          <p className="mb-2 text-xs md:text-md text-muted-foreground">
            {dict.booking?.subtitle || "Let's discuss your project!"}
          </p>
          <Button className="mt-3 rounded-2xl">
            {dict.booking?.bookNow || 'Book Now'}
          </Button>
        </div>
        <div className="transition-all duration-500 ease-out">
          <div>
            <div className="h-full w-full max-w-[550px] rounded-[24px] border border-border p-2 transition-colors duration-100 group-hover:border-indigo-400">
              <div
                className="h-full rounded-2xl border-2 border-[#A5AEB81F]/10 p-3"
                style={{ boxShadow: '0px 2px 1.5px 0px #A5AEB852 inset' }}
              >
                <div className="flex items-center space-x-2">
                  <p className="text-sm">
                    <span className="font-medium">
                      {currentMonth}, {currentYear}
                    </span>
                  </p>
                  <span className="h-1 w-1 rounded-full">&nbsp;</span>
                  <p className="text-xs text-muted-foreground">
                    {dict.booking?.callDuration || '30 min call'}
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-7 grid-rows-5 gap-2 px-4">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
