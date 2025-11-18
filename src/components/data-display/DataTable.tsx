'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ReactNode } from 'react';
import { EmptyState } from '../common/EmptyState';

export interface TableColumn<T> {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => ReactNode;
  minWidth?: number;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  getRowKey: (row: T) => string | number;
  hover?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage = 'No data available',
  onRowClick,
  getRowKey,
  hover = true,
}: DataTableProps<T>) {
  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'action.hover' }}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                sx={{ fontWeight: 600, minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 0 }}>
                <EmptyState message={emptyMessage} />
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={getRowKey(row)}
                onClick={() => handleRowClick(row)}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  '&:hover': hover
                    ? {
                        backgroundColor: 'action.hover',
                      }
                    : {},
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {column.render
                      ? column.render(row)
                      : String((row as Record<string, unknown>)[column.id] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

