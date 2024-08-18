import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import useTheme from '../hooks/useTheme';

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <ButtonIcon onClick={toggleTheme}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
