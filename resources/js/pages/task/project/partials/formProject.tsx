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
import type { Project } from '@/types/data';
import { router, useForm } from '@inertiajs/react';

interface ProjectFormProps {
    initialData?: Project;
    submitUrl: string;
    method?: 'post' | 'put';
}

export function ProjectForm({
    initialData,
    submitUrl,
    method = 'post',
}: ProjectFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialData?.name || '',
        description: initialData?.description || '',
        status: initialData?.status || '',
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
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Enter project name"
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
                    <FieldLabel htmlFor="description">
                        Description <span className="text-xs">(Optional)</span>
                    </FieldLabel>
                    <Input
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        autoComplete="off"
                        className={`${errors.description ? 'border-destructive' : ''}`}
                    />
                    {errors.description && (
                        <FieldDescription className="text-xs text-destructive">
                            {errors.description}
                        </FieldDescription>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <Select
                        value={data.status}
                        onValueChange={(value) => setData('status', value)}
                    >
                        <SelectTrigger id="status" className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">
                                In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/projects')}
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
