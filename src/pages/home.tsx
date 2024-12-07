import { useSelector } from 'react-redux';
import '../App.css';
import { Card, Container, Header } from '../components/shared';
import { fetchCard } from '../redux/slice/cardSlice';
import React from 'react';
import { RootState, useAppDispatch } from '../redux/store';

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { data, status, filter, favorites } = useSelector((state: RootState) => state.cards);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchCard());
  }, [dispatch]);

  const filteredCards = (filter: string) => {
    switch (filter) {
      case 'all':
        return data;
      case 'liked':
        return favorites;
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading data.</p>;

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="flex justify-center mt-10">
        <Container>
          <div className="flex flex-col gap-10">
            {filteredCards(filter)
              ?.filter((item) =>
                item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
              )
              .map((item) => (
                <Card {...item} key={item._id} />
              ))}
          </div>
        </Container>
      </div>
    </>
  );
};
