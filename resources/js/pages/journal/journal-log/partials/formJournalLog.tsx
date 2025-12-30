import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    date: z.string(),
    content: z.string(),
});

export type JournalLogsFormValues = z.infer<typeof formSchema>;

interface JournalFormProps {
    initialData?: JournalLogsFormValues & { id?: number };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function JournalLogForm({
    initialData,
    submitUrl,
    method = 'post',
}: JournalFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<JournalLogsFormValues>({
        resolver: zodResolver(formSchema) as Resolver<JournalLogsFormValues>,
        defaultValues: initialData
            ? initialData
            : {
                  date: '',
                  content: '',
              },
    });

    const onSubmit: SubmitHandler<JournalLogsFormValues> = (data) => {
        setIsSubmitting(true);

        router[method](submitUrl, data, {
            onSuccess: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false),
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="date"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Date</FieldLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between text-left font-normal"
                                    >
                                        {field.value
                                            ? format(
                                                  new Date(field.value),
                                                  'PPP',
                                              )
                                            : 'Pick a date'}
                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={
                                            field.value
                                                ? new Date(field.value)
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            field.onChange(
                                                date
                                                    ? format(date, 'yyyy-MM-dd')
                                                    : null,
                                            );
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="content">
                                Journal Log
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="content"
                                placeholder="Enter journal log"
                                autoComplete="off"
                                required
                            />
                            <FieldDescription>
                                Share your thoughts about today.
                            </FieldDescription>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get(`/journal-logs`)}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Saving...'
                        : method === 'post'
                          ? 'Create'
                          : 'Update'}
                </Button>
            </div>
        </form>
    );
}
