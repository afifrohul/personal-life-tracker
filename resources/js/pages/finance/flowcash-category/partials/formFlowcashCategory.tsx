import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be at least 5 characters.')
        .max(12, 'Name must be at most 12 characters.'),
    icon: z.string(),
});

export type FlowcashCategoryFormValues = z.infer<typeof formSchema>;

interface FlowcashCategoryFormProps {
    initialData?: {
        id?: number;
        name?: string;
        icon?: string;
    };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function FlowcashCategoryForm({
    initialData,
    submitUrl,
    method = 'post',
}: FlowcashCategoryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FlowcashCategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            name: '',
        },
    });

    const onSubmit = (data: FlowcashCategoryFormValues) => {
        setIsSubmitting(true);

        router[method](submitUrl, data, {
            onSuccess: () => {
                setIsSubmitting(false);
                if (method === 'post') form.reset();
            },
            onError: () => {
                setIsSubmitting(false);
            },
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
                                placeholder="Enter flowcash category name"
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
                    name="icon"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        const IconComponent =
                            typeof field.value === 'string'
                                ? (Icons as any)[field.value]
                                : undefined;
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="icon">Icon</FieldLabel>
                                <div>
                                    <a
                                        href="https://lucide.dev/icons/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-500 underline"
                                    >
                                        Click this to get icons list name
                                    </a>
                                </div>
                                <Input
                                    {...field}
                                    id="icon"
                                    placeholder="Enter icon name using PascalCase. Example: BriefcaseMedical"
                                    autoComplete="off"
                                    required
                                />
                                <div className="mt-2 flex h-10 flex-col gap-2">
                                    <p className="text-xs">Preview icon</p>
                                    <div>
                                        {IconComponent ? (
                                            <div className="flex items-center gap-2">
                                                <IconComponent className="h-6 w-6" />
                                                <span className="text-xs text-green-600">
                                                    Icon found!
                                                </span>
                                            </div>
                                        ) : field.value ? (
                                            <span className="text-xs text-destructive">
                                                Icon not found
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        );
                    }}
                />
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/flowcash-categories')}
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
