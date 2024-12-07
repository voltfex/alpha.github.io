import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setFilter } from '@/redux/slice/cardSlice';
import { RootState, useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';

export function SelectFilter() {
  const dispatch = useAppDispatch();
  const { filter } = useSelector((state: RootState) => state.cards);

  return (
    <Select value={filter} onValueChange={(e) => dispatch(setFilter(e))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filtrers</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="liked">Liked</SelectItem>
          <SelectItem value="del">Deleted</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
