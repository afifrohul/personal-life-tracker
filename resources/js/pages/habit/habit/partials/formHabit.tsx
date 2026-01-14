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
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    habit_category_id: z.string(),
    name: z
        .string()
        .min(3, 'Name must be at least 5 characters.')
        .max(12, 'Name must be at most 12 characters.'),
    color: z.string(),
    difficulty: z.string(),
    icon: z.string(),
});

export type HabitFormValues = z.infer<typeof formSchema>;

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface HabitFormProps {
    initialData?: HabitFormValues & { id?: number };
    submitUrl: string;
    method?: 'post' | 'put';
    categories?: Category[];
}

export function HabitForm({
    categories,
    initialData,
    submitUrl,
    method = 'post',
}: HabitFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<HabitFormValues>({
        resolver: zodResolver(formSchema) as Resolver<HabitFormValues>,
        defaultValues: initialData
            ? {
                  ...initialData,
                  habit_category_id: String(initialData.habit_category_id),
              }
            : {
                  habit_category_id: '',
                  name: '',
                  color: '',
                  difficulty: '',
                  icon: '',
              },
    });

    const onSubmit: SubmitHandler<HabitFormValues> = (data) => {
        setIsSubmitting(true);

        router[method](
            submitUrl,
            {
                ...data,
                habit_category_id: Number(data.habit_category_id),
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
                        name="habit_category_id"
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
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    placeholder="Enter habit name"
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

                <FieldGroup className="grid grid-cols-2 gap-4">
                    <Controller
                        name="color"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="color">Color</FieldLabel>

                                <div className="flex items-center gap-3">
                                    {/* Color Picker */}
                                    <input
                                        type="color"
                                        value={field.value || '#000000'}
                                        onChange={(e) =>
                                            field.onChange(e.target.value)
                                        }
                                        className="h-10 w-10 cursor-pointer"
                                    />

                                    {/* HEX Input */}
                                    <Input
                                        {...field}
                                        id="color"
                                        placeholder="#059669"
                                        className="flex-1"
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <a
                                        href="https://tailscan.com/colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-500 underline"
                                    >
                                        Click this to get tailwind color reference
                                    </a>
                                </div>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="difficulty"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="difficulty">
                                    Difficulty
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
                                        id="difficulty"
                                        aria-invalid={fieldState.invalid}
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select a difficulty" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="easy">
                                            Easy
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="hard">
                                            Hard
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                </FieldGroup>

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
                                <Input
                                    {...field}
                                    id="icon"
                                    placeholder="Enter icon name using PascalCase. Example: BriefcaseMedical"
                                    autoComplete="off"
                                    required
                                />
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
