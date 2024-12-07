import React from 'react';
import { Container } from './container';
import { Input } from '../ui';
import { Link } from 'react-router';
import { SelectFilter } from './select-filter';
import { BadgePlus } from 'lucide-react';

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export const Header: React.FC<Props> = ({ searchValue, setSearchValue, className }) => {
  return (
    <header className={className}>
      <Container>
        <div className="flex items-center  justify-between mt-3">
          <Link to="/">
            <h1 className="text-xl font-bold text-red-500">ALPHA</h1>
          </Link>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-[400px]"
            type="text"
            placeholder="Поиск..."
          />
          <div className="flex items-center gap-4">
            <SelectFilter />
            <Link
              to="/create-card"
              className="flex items-center gap-1 bg-red-500 p-2 rounded-[8px] text-white font-bold"
            >
              <span>Create card</span> <BadgePlus />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
