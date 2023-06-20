import React, { useState, useEffect, useRef} from 'react';
import { Authenticator, ThemeProvider} from '@aws-amplify/ui-react';
import { Amplify, Hub} from 'aws-amplify';
import './css/login.css'

const theme = {
    name: 'Custom Theme',
    tokens: {
      colors: {
        background: {
          primary: {
            value: '#20232a',
          },
          secondary: {
            value: '#282c34',
          },
        },
        border: {
          primary: {
            value: '#000000',
          },
          secondary: {
            value: '#20232a',
          },
        },
        font: {
          primary: {
            value: '#cccccc',
          },
          secondary: {
            value: '#929cb9',
          },
          interactive: {
            value: '#949cb8',
          },
        },
        brand: {
          primary: {
            '10': '#373c49',
            '20': '#586074',
            '60': '#000000',
            '80': '#5e6ea1',
            '90': '#7e8bb4',
            '100': '#808bb3',
          },
        },
      },
      components: {
        tabs: {
          itemActiveColor: '#cccccc',
          itemFocusColor: '#838eaf',
          itemHoverColor: '#f2f2f2',
          item: {
            borderRadius: '100px', // Adjust the border radius values as per your preference
          },
        },
        autocomplete: {
          menuBorderRadius: '150px',
        },
        button: {
          borderRadius: '150px',
        },
        badge: {
          borderRadius: '150px',
        },
        fieldControl: {
          borderRadius: '150px',
        },
        input: {
          borderRadius: '150px',
        },
        select: {
          borderRadius: '150px',
        },
        textarea: {
          borderRadius: '150px',
        },
      },
    },
  };
  

  export const useLogin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const authenticatorRef = useRef(null);
  
    useEffect(() => {
      const checkAuthState = async () => {
        try {
          const user = await Amplify.Auth.currentAuthenticatedUser();
          setLoggedIn(!!user);
        } catch (error) {
          setLoggedIn(false);
        }
      };
  
      checkAuthState();
  
      const authListener = (data) => {
        switch (data.payload.event) {
          case 'signIn':
            handleLogin();
            break;
          case 'signOut':
            setLoggedIn(false);
            break;
          default:
            break;
        }
      };
  
      Hub.listen('auth', authListener);
  
      return () => {
        Hub.remove('auth', authListener);
      };
    }, []);
  
    const triggerLogin = () => {
      if (!loggedIn) {
        setShowLogin(true);
      }
    };
  
    const handleLogin = () => {
      setShowLogin(false);
      setLoggedIn(true);
      window.location.reload(false);
    };
  
    const LoginButton = () => (
      <>
        {!loggedIn && showLogin && (
          <ThemeProvider theme={theme}>
            <div
              style={{
                position: 'absolute',
                top: -80,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 50,
              }}
            >
              <Authenticator />
            </div>
          </ThemeProvider>
        )}
      </>
    );
  
    return {
      triggerLogin,
      LoginButton,
    };
  };