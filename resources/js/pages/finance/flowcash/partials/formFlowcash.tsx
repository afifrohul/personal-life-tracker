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
    flowcash_category_id: z.string(),
    description: z
        .string()
        .min(3, 'Name must be at least 5 characters.')
        .max(50, 'Name must be at most 50 characters.'),
    date: z.string(),
    type: z.string(),
    amount: z.string(),
});

export type FlowcashFormValues = z.infer<typeof formSchema>;

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface FlowcashFormProps {
    initialData?: FlowcashFormValues & { id?: number };
    submitUrl: string;
    method?: 'post' | 'put';
    categories?: Category[];
}

export function FlowcashForm({
    categories,
    initialData,
    submitUrl,
    method = 'post',
}: FlowcashFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FlowcashFormValues>({
        resolver: zodResolver(formSchema) as Resolver<FlowcashFormValues>,
        defaultValues: initialData
            ? {
                  ...initialData,
                  flowcash_category_id: String(
                      initialData.flowcash_category_id,
                  ),
              }
            : {
                  flowcash_category_id: '',
                  description: '',
                  date: '',
                  type: '',
                  amount: '',
              },
    });

    const onSubmit: SubmitHandler<FlowcashFormValues> = (data) => {
        setIsSubmitting(true);

        router[method](
            submitUrl,
            {
                ...data,
                flowcash_category_id: Number(data.flowcash_category_id),
                amount: Number(data.amount),
            },
            {
                onSuccess: () => setIsSubmitting(false),
                onError: () => setIsSubmitting(false),
            },
        );
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldGroup className="grid grid-cols-2 gap-4">
                    <Controller
                        name="flowcash_category_id"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="category">
                                    Category
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
                                        id="category"
                                        aria-invalid={fieldState.invalid}
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {categories?.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                                value={String(item.id)}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="description">
                                    Description
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="description"
                                    placeholder="Enter description"
                                    autoComplete="off"
                                    required
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup className="grid grid-cols-3 gap-4">
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

                    <Controller
                        name="type"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="type">Type</FieldLabel>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="type"
                                        aria-invalid={fieldState.invalid}
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="income">
                                            Income
                                        </SelectItem>
                                        <SelectItem value="expense">
                                            Expense
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                    <Controller
                        name="amount"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                                <Input
                                    {...field}
                                    id="amount"
                                    placeholder="Enter amount"
                                    autoComplete="off"
                                    type="number"
                                    required
                                />
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
                    onClick={() => router.get('/habits')}
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
