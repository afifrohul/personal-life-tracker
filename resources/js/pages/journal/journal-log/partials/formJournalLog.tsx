import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import type { JournalLog } from '@/types/data';
import { router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface JournalFormProps {
    initialData?: JournalLog;
    submitUrl: string;
    method?: 'post' | 'put';
}

export function JournalLogForm({
    initialData,
    submitUrl,
    method = 'post',
}: JournalFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        date: initialData?.date || '',
        content: initialData?.content || '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (method === 'post') {
            post(submitUrl);
        } else {
            put(submitUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
                <Field>
                    <FieldLabel>Date</FieldLabel>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between text-left font-normal"
                            >
                                {data.date
                                    ? format(new Date(data.date), 'PPP')
                                    : 'Pick a date'}
                                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={
                                    data.date ? new Date(data.date) : undefined
                                }
                                onSelect={(date) => {
                                    setData(
                                        'date',
                                        date ? format(date, 'yyyy-MM-dd') : '',
                                    );
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field>
                    <FieldLabel htmlFor="content">Journal Log</FieldLabel>
                    <Textarea
                        id="content"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        placeholder="Enter journal log"
                        autoComplete="off"
                        required
                    />
                    <FieldDescription>
                        Share your thoughts about today.
                    </FieldDescription>
                </Field>
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get(`/journal-logs`)}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing
                        ? 'Saving...'
                        : method === 'post'
                          ? 'Create'
                          : 'Update'}
                </Button>
            </div>
        </form>
    );
}
