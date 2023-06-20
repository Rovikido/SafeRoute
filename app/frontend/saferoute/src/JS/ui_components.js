import React, {useState, useEffect} from 'react';
import { Amplify } from '@aws-amplify/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Menu, Container, Link, Divider, Grid, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { styled } from '@mui/system';
import { useLogin } from '../LoginButton';

import signoutImage from '../images/signout.png';
import settingsImage from '../images/settings.png';
import profileImage from '../images/profile.png';
import logo from '../images/logo.png';
import BGImage from '../images/background.jpg';

export const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#3d4d5c',
  color: '#e6e6e6',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginTop: '50px',
  marginBottom: '110px'
}));

export const StyledSubContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#1c2833',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

export const StyledDataItem = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

export const StyledDivider = styled(Divider)({
  width: '100%',
  height: '2px',
  backgroundColor: '#e6e6e6',
  marginBottom: '10px'
});

export const StyledLink = styled(Link)({
  color: '#e6e6e6',
  textDecoration: 'none',
  '&:hover': {
    color: '#90a7d5',
  },
});

export const StyledBackground = styled('div')({
  overflow: 'hidden',
  backgroundImage: `url(${BGImage})`,
  backgroundSize: 'cover',
});

const HeaderContainer = styled('header')({
  backgroundColor: 'black',
  padding: 0,
  margin: 0,
});

const LogoImage = styled('img')({
  width: '36px',
  height: '36px',
  marginRight: '8px',
});

const NavLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  padding: '22px',
  color: '#e6e6e6',
  textDecoration: 'none',
  fontSize: '20px',
  borderRadius: '5px',
  transition: 'background-color 0.175s ease',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const CustomNavLink = styled(NavLink)({
  padding: '16px', 
});

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px',
});

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    zIndex: 10,
    overflow: 'hidden',
  },
});

const StyledMenuItem = styled(MenuItem)({
  padding: '25px',
  color: '#e6e6e6',
  textDecoration: 'none',
  fontSize: '18px',
  transition: 'background-color 0.175s ease',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const StyledMenuText = styled(MenuItem)({
  padding: '25px',
  color: '#a6a6a6',
  textDecoration: 'none',
  fontSize: '18px',
  borderRadius: '5px',
  pointerEvents: 'none',
  textTransform: 'uppercase',
});



const checkInitialAuthState = async () => {
  try {
    const user = await Amplify.Auth.currentAuthenticatedUser();
    return true;
  } catch (error) {
    return false;
  }
};

const signOutUser = async () => {
  try {
    await Amplify.Auth.signOut();
  } catch (error) {
    console.log(`Error signing out. \n${error}`);
  }
};

const getUsername = async () => {
  try {
    const user = await Amplify.Auth.currentAuthenticatedUser();
    const username = user.username;
    return username;
  } catch (error) {
    return 'no-user';
  }
};

const DropDownMenu = ({ signIn }) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const fetchedUsername = await getUsername();
      setUsername(fetchedUsername);
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const checkAuthState = async () => {
      const isAuthenticated = await checkInitialAuthState();
      setLoggedIn(isAuthenticated);
    };

    checkAuthState();
  }, []);

  const handleAccountClick = () => {
    navigate('/profile');
  };

  const handleSignOutClick = async () => {
    await signOutUser();
    setLoggedIn(false);
    window.location.reload(false);
  };

  const handleSignInClick = () => {
    signIn();
  };

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <React.Fragment>
          <CustomNavLink {...bindTrigger(popupState)}>
            <IconButton style={{ pointerEvents: 'none'}}>
              <img src={profileImage} width='28px' height='28px' />
            </IconButton>
          </CustomNavLink>
          <StyledMenu {...bindMenu(popupState)}>
            {/* <StyledMenuItem onClick={handleAccountClick}>
              <img src={settingsImage} width='24px' height='24px' style={{ marginRight: '12px' }} />
              <span>Account</span>
            </StyledMenuItem> */}
            <StyledMenuText style={{marginBottom: '-5px', marginTop: '-5px'}}>
              <div width='24px' height='24px' style={{ marginRight: '8px' }} />
              <span>{username}</span>
            </StyledMenuText>
            <Divider style={{ width: '100%', height: '2px', backgroundColor: '#e6e6e6', marginBottom: '0px', marginTop: '0px' }}></Divider>
            {!loggedIn && (
              <StyledMenuItem onClick={() => {
                handleSignInClick();
                popupState.close();
              }}>
                <img src={settingsImage} width='24px' height='24px' style={{ marginRight: '12px' }} />
                <span>Sign-In</span>
              </StyledMenuItem>
            )}
            {loggedIn && (
              <StyledMenuItem onClick={() => {
                handleSignOutClick();
                popupState.close();
              }} style={{marginBottom: '-10px'}}>
                <img src={signoutImage} width='24px' height='24px' style={{ marginRight: '12px' }} />
                <span>Sign-Out</span>
              </StyledMenuItem>
            )}
          </StyledMenu>
        </React.Fragment>
      )}
    </PopupState>
  );
};



export const Header = ({ }) => {
  const { triggerLogin, LoginButton } = useLogin();

  return (
    <>
    <HeaderContainer>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ pr: '20px' }}>
        <Grid item xs={12} sm={6} textAlign="left">
          <LogoContainer>
            <NavLink href="/map">
              <LogoImage src={logo} alt="Logo" />
              SAFEROUTE
            </NavLink>
          </LogoContainer>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Grid container justifyContent="flex-end" alignItems="center">
            <NavLink href="/map">Map</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/used_data">Used data</NavLink>
            <NavLink href="https://33faoddqwe4bjauetiiaatreye0uirjf.lambda-url.eu-central-1.on.aws/docs" target="_blank">SWAGGER UI</NavLink>
            <DropDownMenu signIn={triggerLogin} />
          </Grid>
        </Grid>
      </Grid>
    </HeaderContainer>
    <LoginButton>
    </LoginButton>
    </>
  );
};
