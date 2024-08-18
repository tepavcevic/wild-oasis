import {
  createContext,
  Dispatch,
  LegacyRef,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { styled } from 'styled-components';

import useOutsideClick from '../hooks/useOutsideClick';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: Position }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type Position = {
  x: number;
  y: number;
};

type MenusContextType = {
  openId: string | undefined;
  open: (id: string) => void;
  close: () => void;
  position: null | { x: number; y: number };
  setPosition: Dispatch<SetStateAction<null | Position>>;
};

const MenusContext = createContext({} as MenusContextType);

type MenusProps = {
  children: ReactNode;
};

export default function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>();
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

type ToggleProps = {
  id: string;
};

function Toggle({ id }: ToggleProps) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const rect = (event?.target as HTMLButtonElement)
      ?.closest('button')
      ?.getBoundingClientRect() as DOMRect;

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.height + rect.y + 8,
    });

    openId === '' || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

type ListProps = {
  id: string;
  children: ReactNode;
};

function List({ id, children }: ListProps) {
  const { openId, position, close } = useContext(MenusContext);
  const { ref } = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList
      position={position as Position}
      ref={ref as LegacyRef<HTMLUListElement>}
    >
      {children}
    </StyledList>,
    document.body
  );
}

type ButtonProps = {
  onClick?: () => void;
  icon: ReactElement;
  children: ReactNode;
};

function Button({ onClick, icon, children }: ButtonProps) {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
