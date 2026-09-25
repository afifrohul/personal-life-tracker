import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Pagination } from '@/types/data';
import type {
    RowData,
    SortingState,
    TableFeatures,
    TableOptions,
} from '@tanstack/react-table';

import { functionalUpdate, useTable } from '@tanstack/react-table';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { Button } from './ui/button';

interface DataTableProps<
    TFeature extends TableFeatures,
    TData extends RowData,
> {
    options: TableOptions<TFeature, TData>;
    pagination?: Pagination<TData>;
    onPaginationChange?: {
        page: (url: string) => void;
        perPage: (value: number) => void;
    };
    onSortingChange?: (sorting: SortingState) => void;
}

export default function DataTable<
    TFeature extends TableFeatures,
    TData extends RowData,
>({
    options,
    pagination,
    onPaginationChange,
    onSortingChange,
}: DataTableProps<TFeature, TData>) {
    const table = useTable({
        ...options,

        onSortingChange: (updater) => {
            const currentSorting: SortingState =
                options.state && 'sorting' in options.state
                    ? ((options.state.sorting as SortingState | undefined) ??
                      [])
                    : [];

            const newSorting = functionalUpdate(updater, currentSorting);

            onSortingChange?.(newSorting);
        },
    });

    return (
        <div className="w-full space-y-4">
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead className="border-b bg-accent">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-2 text-left select-none"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                style={{
                                                    cursor:
                                                        'getCanSort' in
                                                            header.column &&
                                                        header.column.getCanSort()
                                                            ? 'pointer'
                                                            : undefined,
                                                }}
                                                onClick={
                                                    'getToggleSortingHandler' in
                                                    header.column
                                                        ? header.column.getToggleSortingHandler()
                                                        : undefined
                                                }
                                            >
                                                <table.FlexRender
                                                    header={header}
                                                />
                                                {{
                                                    asc: ' ↑',
                                                    desc: ' ↓',
                                                }[
                                                    ('getIsSorted' in
                                                    header.column
                                                        ? header.column.getIsSorted()
                                                        : undefined) as string
                                                ] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b">
                                    {row.getAllCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-2">
                                            <table.FlexRender cell={cell} />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={options.columns.length}
                                    className="py-4 text-center"
                                >
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <div className="flex items-center justify-between">
                    <div className="rounded-md border p-2 text-xs">
                        <span className="font-medium">
                            {pagination.from} - {pagination.to}
                        </span>{' '}
                        <span className="text-muted-foreground">
                            of {pagination.total} data
                        </span>{' '}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-xs">Rows per page</p>

                            <Select
                                value={String(pagination.per_page)}
                                onValueChange={(value) => {
                                    onPaginationChange?.perPage(Number(value));
                                }}
                            >
                                <SelectTrigger className="w-18">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {[10, 25, 50, 100].map((num) => (
                                        <SelectItem
                                            key={num}
                                            value={String(num)}
                                        >
                                            {num}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={pagination.current_page === 1}
                                onClick={() =>
                                    onPaginationChange?.page(
                                        pagination.first_page_url,
                                    )
                                }
                            >
                                <MdKeyboardDoubleArrowLeft />
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                disabled={pagination.current_page === 1}
                                onClick={() => {
                                    if (pagination.prev_page_url) {
                                        onPaginationChange?.page(
                                            pagination.prev_page_url,
                                        );
                                    }
                                }}
                            >
                                <MdKeyboardArrowLeft />
                            </Button>

                            <div className="rounded-md border px-3 py-2 text-xs">
                                <span className="font-medium">
                                    {pagination.current_page} /{' '}
                                </span>
                                <span className="text-muted-foreground">
                                    {pagination.last_page}
                                </span>
                            </div>

                            <Button
                                size="sm"
                                variant="outline"
                                disabled={
                                    pagination.current_page ===
                                    pagination.last_page
                                }
                                onClick={() => {
                                    if (pagination.next_page_url) {
                                        onPaginationChange?.page(
                                            pagination.next_page_url,
                                        );
                                    }
                                }}
                            >
                                <MdKeyboardArrowRight />
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                disabled={
                                    pagination.current_page ===
                                    pagination.last_page
                                }
                                onClick={() =>
                                    onPaginationChange?.page(
                                        pagination.last_page_url,
                                    )
                                }
                            >
                                <MdKeyboardDoubleArrowRight />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
