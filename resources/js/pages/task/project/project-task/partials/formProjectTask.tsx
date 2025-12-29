import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    due_date: z.string().nullable().optional(),
    priority: z.string(),
    status: z.string(),
});

export type ProjectTaskFormValues = z.infer<typeof formSchema>;

interface ProjectTaskFormProps {
    projectId: number;
    initialData?: ProjectTaskFormValues & { id?: number };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function ProjectTaskForm({
    projectId,
    initialData,
    submitUrl,
    method = 'post',
}: ProjectTaskFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProjectTaskFormValues>({
        resolver: zodResolver(formSchema) as Resolver<ProjectTaskFormValues>,
        defaultValues: initialData
            ? initialData
            : {
                  title: '',
                  description: '',
                  due_date: '',
                  priority: '',
                  status: '',
              },
    });

    const onSubmit: SubmitHandler<ProjectTaskFormValues> = (data) => {
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
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                {...field}
                                id="title"
                                placeholder="Enter project task title"
                                autoComplete="off"
                                required
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="description">
                                Description <span className='text-xs'>(Optional)</span>
                            </FieldLabel>
                            <Input
                                {...field}
                                value={field.value || ''}
                                id="description"
                                placeholder="Enter description"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <FieldGroup className="grid grid-cols-3 gap-4">
                    <Controller
                        name="priority"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="priority">
                                    Priority
                                </FieldLabel>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="priority"
                                        aria-invalid={fieldState.invalid}
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="status">Status</FieldLabel>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="status"
                                        aria-invalid={fieldState.invalid}
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                    <Controller
                        name="due_date"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Due Date <span className='text-xs'>(Optional)</span></FieldLabel>

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
                                                        ? format(
                                                              date,
                                                              'yyyy-MM-dd',
                                                          )
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
                </FieldGroup>
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get(`/projects/${projectId}/show`)}
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
