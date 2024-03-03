import { useParams } from 'react-router-dom';

export const PriceDetailsPage = () => {
  let { priceID } = useParams();
  return <h1>Price Details {priceID}</h1>;
}
