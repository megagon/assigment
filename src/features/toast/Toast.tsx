import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../../app/hooks';

export function useToast() {
  const status = useAppSelector((state) => state.lauches.status);
  if (status === 'error') toast('Something went wrong');
}
