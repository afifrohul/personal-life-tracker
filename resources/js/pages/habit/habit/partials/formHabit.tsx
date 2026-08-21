import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
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
import { router, useForm } from '@inertiajs/react';
import { icons } from 'lucide-react';

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface HabitFormProps {
    initialData?: {
        id?: number;
        name: string;
        color: string;
        difficulty: string;
        icon: string;
        habit_category_id: string;
    };
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
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialData?.name || '',
        color: initialData?.color || '',
        difficulty: initialData?.difficulty || '',
        icon: initialData?.icon || '',
        habit_category_id: String(initialData?.habit_category_id) || '',
    });

    const IconComponent = data.icon
        ? icons[data.icon as keyof typeof icons]
        : null;

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
                <FieldGroup className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Select
                            value={data.habit_category_id}
                            onValueChange={(value) =>
                                setData('habit_category_id', value)
                            }
                        >
                            <SelectTrigger id="category" className="w-full">
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
                    <Field>
                        <FieldLabel
                            htmlFor="name"
                            className={`${errors.name ? 'text-destructive' : ''}`}
                        >
                            Name
                        </FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter habit name"
                            autoComplete="off"
                            className={`${errors.name ? 'border-destructive' : ''}`}
                            required
                        />
                        {errors.name && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.name}
                            </FieldDescription>
                        )}
                    </Field>
                </FieldGroup>

                <FieldGroup className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel
                            htmlFor="color"
                            className={`${errors.name ? 'text-destructive' : ''}`}
                        >
                            Color
                        </FieldLabel>

                        <div className="flex items-center gap-3">
                            {/* Color Picker */}
                            <Input
                                name="color"
                                type="color"
                                value={data.color || '#000000'}
                                onChange={handleChange}
                                className="h-10 w-10 cursor-pointer"
                            />

                            {/* HEX Input */}
                            <Input
                                id="color"
                                type="text"
                                name="color"
                                value={data.color}
                                onChange={handleChange}
                                placeholder="#059669"
                                autoComplete="off"
                                className={`flex-1 ${errors.name ? 'border-destructive' : ''}`}
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

                        {errors.color && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.color}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel
                            htmlFor="difficulty"
                            className={`${errors.difficulty ? 'text-destructive' : ''}`}
                        >
                            Difficulty
                        </FieldLabel>
                        <Select
                            value={data.difficulty}
                            onValueChange={(value) =>
                                setData('difficulty', value)
                            }
                        >
                            <SelectTrigger id="difficulty" className="w-full">
                                <SelectValue placeholder="Select a difficulty" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>

                <Field>
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
                        id="icon"
                        type="text"
                        name="icon"
                        value={data.icon}
                        onChange={handleChange}
                        placeholder="Enter icon name using PascalCase (case-sensitive). Example: BriefcaseMedical"
                        autoComplete="off"
                        className={`${errors.name ? 'border-destructive' : ''}`}
                        required
                    />
                    <div className="mt-2 flex h-16 items-center gap-3 rounded-md border p-3">
                        <p className="text-xs text-muted-foreground">
                            Preview:
                        </p>

                        {IconComponent ? (
                            <div className="flex items-center gap-2">
                                <IconComponent className="size-8" />
                                <span className="text-xs text-green-500">
                                    {data.icon ? 'Icon found!' : ''}
                                </span>
                            </div>
                        ) : (
                            <span className="text-xs text-destructive">
                                {data.icon
                                    ? 'Icon not found!'
                                    : 'Enter icon name first'}
                            </span>
                        )}
                    </div>
                    {errors.icon && (
                        <FieldDescription className="text-xs text-destructive">
                            {errors.icon}
                        </FieldDescription>
                    )}
                </Field>
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/habits')}
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
