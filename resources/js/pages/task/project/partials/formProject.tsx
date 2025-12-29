import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string(),
    description: z.string().nullable().optional(),
    status: z.string(),
});

export type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
    initialData?: ProjectFormValues & { id?: number };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function ProjectForm({
    initialData,
    submitUrl,
    method = 'post',
}: ProjectFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(formSchema) as Resolver<ProjectFormValues>,
        defaultValues: initialData
            ? initialData
            : {
                  name: '',
                  description: '',
                  status: '',
              },
    });

    const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
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
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                placeholder="Enter project name"
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
                                Description{' '}
                                <span className="text-xs">(Optional)</span>
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
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/projects')}
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
