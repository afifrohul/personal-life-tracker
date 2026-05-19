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
import { Trash } from 'lucide-react';
import { ReactElement, useState } from 'react';

type DeleteButtonProps = React.ComponentProps<typeof Button> & {
    url: string;
    confirmMessage?: string;
    label?: string | ReactElement;
};

export default function DeleteButton({
    url,
    confirmMessage = 'Are you sure to delete this item?',
    label,
    ...props
}: DeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const displayLabel = label ?? <Trash />;
    const handleDelete = () => {
        setIsSubmitting(true);
        router.delete(url, {
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
                    <Button disabled={isSubmitting} onClick={handleDelete}>
                        {isSubmitting ? 'Loading...' : 'Continue'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
