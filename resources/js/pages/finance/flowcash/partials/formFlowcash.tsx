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
import { router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface FlowcashFormProps {
    initialData?: {
        id?: number;
        description: string;
        date: string;
        type: string;
        amount: number;
        flowcash_category_id: string;
    };
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
    const { data, setData, post, put, processing, errors } = useForm({
        description: initialData?.description || '',
        date: initialData?.date || '',
        type: initialData?.type || '',
        amount: initialData?.amount || '',
        flowcash_category_id: String(initialData?.flowcash_category_id) || '',
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
                <FieldGroup className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Select
                            value={data.flowcash_category_id}
                            onValueChange={(value) =>
                                setData('flowcash_category_id', value)
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
                        <FieldLabel htmlFor="description">
                            Description
                        </FieldLabel>
                        <Input
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            autoComplete="off"
                            required
                        />
                        {errors.description && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.description}
                            </FieldDescription>
                        )}
                    </Field>
                </FieldGroup>
                <FieldGroup className="grid grid-cols-3 gap-4">
                    <Field>
                        <FieldLabel>Date</FieldLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between text-left font-normal"
                                >
                                    {data.date
                                        ? format(new Date(data.date), 'PPP')
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
                                        data.date
                                            ? new Date(data.date)
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        setData(
                                            'date',
                                            date
                                                ? format(date, 'yyyy-MM-dd')
                                                : '',
                                        );
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="type">Type</FieldLabel>
                        <Select
                            value={data.type}
                            onValueChange={(value) => setData('type', value)}
                        >
                            <SelectTrigger id="type" className="w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="amount">Amount</FieldLabel>
                        <Input
                            id="amount"
                            name="amount"
                            value={data.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            autoComplete="off"
                            type="number"
                            required
                        />
                        {errors.amount && (
                            <FieldDescription className="text-xs text-destructive">
                                {errors.amount}
                            </FieldDescription>
                        )}
                    </Field>
                </FieldGroup>
            </FieldGroup>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() => router.get('/flowcashes')}
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
