import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Field,
    FieldDescription,
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
import type { PersonalTask } from '@/types/data';
import { router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface PersonalTaskFormProps {
    initialData?: PersonalTask;
    submitUrl: string;
    method?: 'post' | 'put';
}

export function PersonalTaskForm({
    initialData,
    submitUrl,
    method = 'post',
}: PersonalTaskFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: initialData?.title || '',
        description: initialData?.description || '',
        due_date: initialData?.due_date || '',
        priority: initialData?.priority || '',
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
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={data.title}
                        onChange={handleChange}
                        placeholder="Enter project task title"
                        autoComplete="off"
                        required
                    />
                    {errors.title && (
                        <FieldDescription className="text-xs text-destructive">
                            {errors.title}
                        </FieldDescription>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">
                        Description <span className="text-xs">(Optional)</span>
                    </FieldLabel>
                    <Input
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        autoComplete="off"
                    />
                    {errors.description && (
                        <FieldDescription className="text-xs text-destructive">
                            {errors.description}
                        </FieldDescription>
                    )}
                </Field>
                <FieldGroup className="grid grid-cols-3 gap-4">
                    <Field>
                        <FieldLabel htmlFor="priority">Priority</FieldLabel>
                        <Select
                            value={data.priority}
                            onValueChange={(value) =>
                                setData('priority', value)
                            }
                        >
                            <SelectTrigger id="priority" className="w-full">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
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
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <FieldLabel>
                            Due Date <span className="text-xs">(Optional)</span>
                        </FieldLabel>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between text-left font-normal"
                                >
                                    {data.due_date
                                        ? format(new Date(data.due_date), 'PPP')
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
                                        data.due_date
                                            ? new Date(data.due_date)
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        setData(
                                            'due_date',
                                            date
                                                ? format(date, 'yyyy-MM-dd')
                                                : '',
                                        );
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>
                </FieldGroup>
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/personal-tasks')}
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
