import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ReactElement } from 'react';

type EditButtonProps = React.ComponentProps<typeof Button> & {
    url: string;
    label?: string | ReactElement;
};

export default function EditButton({
    url,
    label = 'Edit',
    ...props
}: EditButtonProps) {
    return (
        <Button
            size="sm"
            variant="outline"
            onClick={() => router.get(url)}
            {...props}
        >
            {label}
        </Button>
    );
}
