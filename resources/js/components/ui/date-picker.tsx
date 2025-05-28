import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface DatePickerProps {
    startYear?: number;
    endYear?: number;
    date?: Date;
    setDate: (date: Date) => void;
}

export function DatePicker({ startYear = getYear(new Date()) - 100, endYear = getYear(new Date()) + 100, date, setDate }: DatePickerProps) {
    // const [date, setDate] = useState<Date>(new Date());
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    const baseDate = date ?? new Date();

    const handleMonthChange = (month: string) => {
        const newDate = setMonth(baseDate, months.indexOf(month));
        setDate(newDate);
    };

    const handleYearChange = (year: string) => {
        const newDate = setYear(baseDate, parseInt(year));
        setDate(newDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={'text-left ' + !date ? 'text-muted-foreground' : ''}>
                    {date ? format(date, 'dd-MM-yyyy') : <span>Pilih tanggal</span>}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="flex items-center justify-between p-2">
                    <Select onValueChange={handleMonthChange} value={months[getMonth(baseDate)]}>
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month, index) => (
                                <SelectItem key={index} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleYearChange} value={getYear(baseDate).toString()}>
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year, index) => (
                                <SelectItem key={index} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Calendar
                    mode="single"
                    onMonthChange={setDate}
                    month={date}
                    selected={date}
                    onSelect={(date) => {
                        if (date) {
                            setDate(date);
                        }
                    }}
                    disabled={(date) => date > new Date() || date < new Date('1990-01-01')}
                />
            </PopoverContent>
        </Popover>
    );
}
