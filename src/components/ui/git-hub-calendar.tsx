'use client';

import { useState, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';

interface ContributionDay {
  date: string;
  count: number;
}

interface GitHubCalendarProps {
  data: ContributionDay[];
  colors?: string[];
}

const GitHubCalendar = ({
  data,
  colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
}: GitHubCalendarProps) => {
  const [contributions, setContributions] = useState<Date[]>([]);
  const today = new Date();
  const startDate = subDays(today, 364);

  useEffect(() => {
    setContributions(data.map((item) => new Date(item.date)));
  }, [data]);

  const getColor = (count: number) => {
    if (count === 0) return colors[0];
    if (count === 1) return colors[1];
    if (count === 2) return colors[2];
    if (count === 3) return colors[3];
    return colors[4] || colors[colors.length - 1];
  };

  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < 53; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      });

      weeksArray.push(
        <div key={i} className="flex flex-col gap-0.5 sm:gap-1">
          {weekDays.map((day, index) => {
            const contribution = data.find((d) =>
              isSameDay(new Date(d.date), day)
            );
            const color = contribution
              ? getColor(contribution.count)
              : colors[0];

            return (
              <div
                key={index}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-[2px] sm:rounded-[4px]"
                style={{ backgroundColor: color }}
                title={`${format(day, 'PPP')}: ${contribution?.count || 0} contributions`}
              />
            );
          })}
        </div>
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  const renderMonthLabels = () => {
    const months = [];
    let currentMonth = startDate;
    for (let i = 0; i < 12; i++) {
      months.push(
        <span key={i} className="text-xs text-gray-500">
          {format(currentMonth, 'MMM')}
        </span>
      );
      currentMonth = addDays(currentMonth, 30);
    }
    return months;
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-2 sm:p-4 border rounded-lg w-full max-w-full">
      <div className="flex">
        <div className="flex flex-col justify-between mr-1 sm:mr-2 text-[8px] sm:text-xs">
          {dayLabels.map((day, index) => (
            <span key={index} className="text-gray-500 h-2 sm:h-3">
              {index % 2 === 1 ? day : ''}
            </span>
          ))}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex w-full justify-between gap-1 sm:gap-4 mb-1 sm:mb-2 text-[8px] sm:text-xs">
            {renderMonthLabels()}
          </div>
          <div className="flex gap-0.5 sm:gap-1">{renderWeeks()}</div>
        </div>
      </div>
      <div className="mt-2 sm:mt-4 justify-center flex gap-1 sm:gap-2 text-[8px] sm:text-xs items-center">
        <span>Less</span>
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-[2px] sm:rounded-[4px]"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export { GitHubCalendar };
