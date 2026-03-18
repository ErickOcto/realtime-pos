import { LIMIT_LIST } from "@/constants/data-table-constant";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import DataTablePagination from "./data-table-pagination";

export default function DataTable({header, data, isLoading, currentLimit, currentPage, onChangeLimit, onChangePage, totalPage}: {header: string[], data?: (React.ReactNode | string)[][], isLoading?: boolean, currentLimit: number, currentPage: number, onChangeLimit: (limit: number) => void, onChangePage: (page: number) => void, totalPage: number}) {
    return (
        <div className="w-full flex-col flex gap-4">
            <Card className="p-0">
                <Table className="w-full rounded-lg overflow-hidden">
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            {header.map((column) => (
                                <TableHead key={`th-${column}`} className="px-6 py-3">{column}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((row, rowIndex) => (
                            <TableRow key={`tr-${rowIndex}`}>
                                {row.map((column, columnIndex) => (
                                    <TableCell className="px-6 py-3" key={`tc-${rowIndex}-${columnIndex}`}>{column}</TableCell>
                                ))}                             
                            </TableRow>
                        ))}
                        {data?.length === 0 && !isLoading && (
                            <TableRow>
                                <TableCell className="h-24 text-center" colSpan={header.length}>
                                    No Data
                                </TableCell>
                            </TableRow>
                        )}
                        {isLoading && (
                            <TableRow>
                                <TableCell className="h-24 text-center" colSpan={header.length}>
                                    Loading...
                                </TableCell>
                            </TableRow>
                        )}                           
                    </TableBody>
                </Table>
            </Card>
            <div className="flex items-center justify-between">
                <div>
                    <Label>Display</Label>
                    <Select value={currentLimit.toString()} onValueChange={(value) => onChangeLimit(Number(value))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a limit"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>
                                    Limit
                                </SelectLabel>
                                {
                                    LIMIT_LIST.map((limit) => (
                                        <SelectItem key={limit} value={limit.toString()}>{limit}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {totalPage > 1 &&
                    <div className="flex justify-end">
                        <DataTablePagination currentPage={currentPage} onChangePage={onChangePage} totalPage={totalPage}/>
                    </div>                
                }
            </div>
        </div>
    );
}