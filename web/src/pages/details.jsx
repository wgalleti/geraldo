import { useParams } from 'react-router-dom';

export default function PriceDetailsPage() {
  let { priceID } = useParams();
  return <h1>Price Details {priceID}</h1>;
}
