import React, {useState} from 'react';
import styled from '@emotion/styled';
import {NavLink} from 'react-router-dom';

import DvrIcon from '@mui/icons-material/Dvr';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

export default function SideBar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handelSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <>
      <MenuIconWrap onClick={handelSideMenu}>
        <MenuIcon />
      </MenuIconWrap>
      <SidebarContainer sideMenuOpen={sideMenuOpen}>
        <LogoWrapper>
          <Logo>Logo</Logo>
          <CloseIcon onClick={handelSideMenu} />
        </LogoWrapper>
        <StyledNavLink
          to=""
          className={({isActive}) => (isActive ? 'active' : '')}
          onClick={handelSideMenu}
        >
          <DvrIcon />
          <Menu>대시보드</Menu>
        </StyledNavLink>
        <StyledNavLink
          to="manage"
          className={({isActive}) => (isActive ? 'active' : '')}
          onClick={handelSideMenu}
        >
          <LeaderboardIcon />
          <Menu>광고관리</Menu>
        </StyledNavLink>
      </SidebarContainer>
      <SidebarCover sideMenuOpen={sideMenuOpen} onClick={handelSideMenu} />
    </>
  );
}

const SidebarContainer = styled.div<{sideMenuOpen: boolean}>`
  grid-area: sidebar;
  position: relative;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: ${props => props.theme.background.sidebar};
  @media ${({theme}) => theme.size.mobile} {
    position: absolute;
    left: ${({sideMenuOpen}) => (sideMenuOpen ? '0px' : '-250px')};
    transition: 0.4s;
    width: 200px;
  }
  z-index: 4;
  .active {
    background-color: ${({theme}) => theme.hover.menu};
  }
`;
const MenuIconWrap = styled.div`
  position: absolute;
  top: 18px;
  left: 30px;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
  z-index: 4;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 15px 30px;
  margin-bottom: 10px;
  svg {
    margin-right: 20px;
  }
  &:hover {
    background-color: ${({theme}) => theme.hover.menu};
  }
`;

const LogoWrapper = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  margin-bottom: 100px;
  svg {
    cursor: pointer;
    color: #fff;
    display: none;
  }
  @media ${({theme}) => theme.size.mobile} {
    width: 200px;
    svg {
      display: block;
    }
  }
`;

const Logo = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 36px;
`;

const Menu = styled.p`
  font-size: 18px;
  font-weight: 500;
  @media ${({theme}) => theme.size.mobile} {
    font-size: 15px;
  }
`;

const SidebarCover = styled.div<{sideMenuOpen: boolean}>`
  display: none;
  position: absolute;
  left: 200px;
  top: 70px;
  background: transparent;
  transition: 0.4s;
  width: calc(100% - 200px);
  height: calc(100% - 70px);
  @media ${({theme}) => theme.size.mobile} {
    display: ${({sideMenuOpen}) => (sideMenuOpen ? 'block' : 'none')};
  }
  z-index: 4;
`;
