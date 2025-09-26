import * as React from "react";
import {
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "./type/user.type";
import { users } from "./data/users";
import {
    DropdownMenu,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "identityId",
        header: "Identity ID",
    },
    {
        accessorKey: "loginId",
        header: "Login ID",
    },
    {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
    },
    {
        accessorKey: "token",
        header: "Token",
    },
];

const UsersPage = () => {
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
    });

    /* helpers for numeric page bar */
    const lastPage = table.getPageCount();
    const current = table.getState().pagination.pageIndex + 1;

    return (
        <div className="container mx-auto p-8 space-y-6">
            <h1 className="text-2xl font-bold">User Management</h1>

            {/* Search row */}
            <div className="flex items-center gap-0 justify-end">
                <Input
                    placeholder="Search…"
                    value={globalFilter ?? ""}
                    autoComplete="off"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-xs rounded-none border-2 shadow-none focus-visible:ring-0 border-r-0 "
                />

                <Button
                    size="sm"
                    variant="default"
                    className="rounded-none p-2 border-r-2"
                    style={{ paddingTop: "18px", paddingBottom: "18px" }}
                    onClick={() => console.log("search")}>
                    <Search className="w-4 h-4 " />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="default"
                            size="sm"
                            className="rounded-l-none p-4"
                            style={{
                                paddingTop: "18px",
                                paddingBottom: "18px",
                            }}
                            aria-label="Toggle advanced filters">
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-4">
                        <p className="text-sm text-muted-foreground">
                            Advanced search filters go here.
                        </p>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Data table */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    title="First">
                    <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                {[1, 2, 3, lastPage > 4 && "…", lastPage > 4 && lastPage].map(
                    (v, idx) =>
                        typeof v === "number" ? (
                            <Button
                                key={idx}
                                variant={current === v ? "default" : "outline"}
                                size="sm"
                                onClick={() => table.setPageIndex(v - 1)}>
                                {v}
                            </Button>
                        ) : (
                            v && (
                                <span key={idx} className="px-1 text-sm">
                                    …
                                </span>
                            )
                        )
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(lastPage - 1)}
                    disabled={!table.getCanNextPage()}
                    title="Last">
                    <ChevronsRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default UsersPage;
