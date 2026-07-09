import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { ReactElement, useState } from 'react';

type GenerateHabitLogButtonProps = React.ComponentProps<typeof Button> & {
    confirmMessage?: string;
    label?: string | ReactElement;
    data: {
        date: string;
    };
};

export default function GenerateHabitLogButton({
    confirmMessage = "This will generate habit logs for all habits for today. Please make sure today's habit logs are empty before continuing.",
    label,
    data,
    ...props
}: GenerateHabitLogButtonProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);   
    const displayLabel = label;
    const handleClick = () => {
        setIsSubmitting(true);
        router.post('/habit-logs-generate', data, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
            }}
        >
            <DialogTrigger asChild>
                <Button size="sm" variant="default" {...props}>
                    {displayLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>{confirmMessage}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={isSubmitting} onClick={handleClick}>
                        {isSubmitting ? 'Loading...' : 'Continue'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
