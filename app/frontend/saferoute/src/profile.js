import React, { useState, useEffect } from 'react';
import { Typography, TextField, Divider, Paper, FormHelperText, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Auth } from 'aws-amplify';
import { Header, StyledSubContainer, StyledDataItem, StyledBackground, StyledButtonContainer, StyledButton, StyledDisabledButton} from './JS/ui_components';
import BGImage from './images/background.jpg';

const StyledHeader = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(0),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#282c34',
  color: '#929cb9',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  marginTop: '50px',
  marginBottom: '110px'
}));

const Profile = () => {
  const [user, setUser] = useState(null);
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginConfirmed, setIsLoginConfirmed] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState(false);
  const [passwordChangeErrorMessage, setPasswordChangeErrorMessage] = useState('');
  const [prevPasswordError, setPrevPasswordError] = useState(false);
  const [prevPasswordErrorMessage, setPrevPasswordErrorMessage] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successPasswordChangeMessage, setSuccessPasswordChangeMessage] = useState('');

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordChangeError(true);
      setPasswordChangeErrorMessage('New password and confirm password do not match')
      return;
    }

    if (!isLoginConfirmed) {
      setLoginError(true);
      return;
    }

    try {
      setSuccessMessage('');
      await Auth.changePassword(user, prevPassword, newPassword);
      setSuccessPasswordChangeMessage('Password changed successfully');
      setPrevPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsLoginConfirmed(false);
      setPasswordChangeError(false);
      setPrevPasswordError(false);
      setLoginError(false);
    } catch (error) {
      console.log('Error: ', error);
      if (error.code === 'NotAuthorizedException'){
        setPrevPasswordError(true);
        setPrevPasswordErrorMessage('Incorrect prevoius password')
      }
      else {
        setPrevPasswordError(true);
        setPrevPasswordErrorMessage(error.message);
      }
    }
  };

  const checkForLogin = async () => {
    try{
      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (currentUser) {
        setIsLoginConfirmed(true);
        setLoginError(false);
        setSuccessMessage('Password confirmed successfully');
        return;
      }

      setIsLoginConfirmed(true);
      setLoginError(false);
    }
    catch(error){
      setIsLoginConfirmed(false);
      setLoginError(true);
    }
  };

  return (
    <StyledBackground>
      <Header />
      <Paper
        sx={{
          height: '110vh',
          marginTop: '0px',
          overflow: 'auto',
          backgroundImage: `url(${BGImage})`,
          backgroundSize: 'cover',
        }}
      >
        <StyledContainer maxWidth="sm">
          <StyledSubContainer>
            <StyledHeader>
              <Typography variant="h4">Profile Page</Typography>
            </StyledHeader>
            <StyledDataItem>
              <Typography variant="h6" style={{ display: 'inline' }}>
                Welcome,{' '}
                <Typography variant="h6" style={{ color: 'white', display: 'inline' }}>
                  @{user?.username}
                </Typography>
                !
              </Typography>
            </StyledDataItem>
            <Divider
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'black',
                marginBottom: '20px',
                marginTop: '-25px',
                borderRadius: '100px',
              }}
            />
            <StyledButtonContainer>
              <StyledButton variant="contained" onClick={checkForLogin}>
                Confirm Login
              </StyledButton>
            </StyledButtonContainer>
            {/* FormHelperText for previous password error */}
            {loginError && (
                <FormHelperText error>User not logged in</FormHelperText>
            )}
            <StyledDataItem>
              {/* FormHelperText for successful password change */}
              {successMessage && (
                <FormHelperText sx={{ color: 'green', marginTop: '-15px'}}>{successMessage}</FormHelperText>
              )}

              <TextField
                type="password"
                label="Prevoius Password"
                value={prevPassword}
                onChange={(e) => setPrevPassword(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!isLoginConfirmed}
                inputProps={{
                  style: {
                    color: isLoginConfirmed ? '#929cb9' : '#737373',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: isLoginConfirmed ? '#929cb9' : '#737373',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '150px',
                      borderColor: '#000000',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#808bb3',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#808bb3',
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: isLoginConfirmed ? '#000000' : '#737373',
                    },
                    '&.Mui-focused': {
                      color: '#808bb3',
                    },
                  },
                }}
              />
              {prevPasswordError && (
                <FormHelperText error sx={{marginTop: '-7px'}}>
                  {prevPasswordErrorMessage}
                </FormHelperText>
              )}
              <TextField
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!isLoginConfirmed}
                inputProps={{
                  style: {
                    color: isLoginConfirmed ? '#929cb9' : '#737373',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: isLoginConfirmed ? '#929cb9' : '#737373',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '150px',
                      borderColor: '#000000',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#808bb3',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#808bb3',
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: isLoginConfirmed ? '#000000' : '#737373',
                    },
                    '&.Mui-focused': {
                      color: '#808bb3',
                    },
                  },
                }}
              />

              {/* FormHelperText for password mismatch error */}
              {passwordChangeError && (
                <FormHelperText error sx={{marginTop: '-7px'}}>
                  {passwordChangeErrorMessage}
                </FormHelperText>
              )}

              <TextField
                type="password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!isLoginConfirmed}
                inputProps={{
                  style: {
                    color: isLoginConfirmed ? '#929cb9' : '#737373',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: isLoginConfirmed ? '#929cb9' : '#737373',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '150px',
                      borderColor: '#000000',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#808bb3',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#808bb3',
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: isLoginConfirmed ? '#000000' : '#737373',
                    },
                    '&.Mui-focused': {
                      color: '#808bb3',
                    },
                  },
                }}
              />
            </StyledDataItem>
            <StyledButtonContainer>
            {isLoginConfirmed && (
              <StyledButton variant="contained" onClick={handleChangePassword}>
                Change Password
              </StyledButton>
            )}
            {!isLoginConfirmed && (
              <StyledDisabledButton variant="contained" >
                Change Password
              </StyledDisabledButton>
            )}
            </StyledButtonContainer>
            {successPasswordChangeMessage && (
              <FormHelperText sx={{ color: 'green'}}>{successPasswordChangeMessage}</FormHelperText>
            )}
          </StyledSubContainer>
        </StyledContainer>
      </Paper>
    </StyledBackground>
  );
};

export default Profile;