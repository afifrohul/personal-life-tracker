import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { icons } from 'lucide-react';

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
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialData?.name || '',
        icon: initialData?.icon || '',
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
                        placeholder="Enter flowcash category name"
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
                        className={`${errors.icon ? 'border-destructive' : ''}`}
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
                    onClick={() => router.get('/habit-categories')}
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
