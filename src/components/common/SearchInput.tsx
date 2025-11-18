'use client';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useState, useEffect, useCallback, useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  fullWidth?: boolean;
  maxWidth?: number | string;
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 0,
  fullWidth = false,
  maxWidth,
  onClear,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const onChangeRef = useRef(onChange);

  // Keep onChange ref up to date
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange
  useEffect(() => {
    if (debounceMs > 0) {
      const timer = setTimeout(() => {
        onChangeRef.current(localValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    }
  }, [localValue, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // If no debounce, call onChange immediately
    if (debounceMs === 0) {
      onChangeRef.current(newValue);
    }
  };

  const handleClear = useCallback(() => {
    setLocalValue('');
    if (debounceMs === 0) {
      onChangeRef.current('');
    }
    if (onClear) {
      onClear();
    }
  }, [onClear, debounceMs]);

  return (
    <TextField
      fullWidth={fullWidth}
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: localValue && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClear}
              aria-label="clear search"
              edge="end"
            >
              <Clear fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={maxWidth ? { maxWidth } : undefined}
    />
  );
};

