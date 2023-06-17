import React, { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Container, Typography, Link, Divider, Button, TextField } from '@mui/material';
import { Header, StyledContainer, StyledSubContainer, StyledDataItem, StyledDivider, StyledLink, StyledBackground } from './JS/ui_components';
import { styled } from '@mui/system';
import signoutImage from './images/signout.png';
import logo from './images/logo.png';

const Profile = ({ signOut, user }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    password: '',
    confirmPassword: '',
    previousPassword: '',
    error: ''
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value, error: '' });
  };

  const handleSaveChanges = () => {
    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, error: "Passwords don't match" });
      return;
    }

    // Validate previous password
    if (formData.previousPassword !== user.password) {
      setFormData({ ...formData, error: 'Incorrect previous password' });
      return;
    }

    // Handle save changes logic here
    // You can access the updated username and password using formData.username and formData.password
  };

  return (
    <>
      <Header signOut={signOut} />
      <StyledContainer>
        <StyledDataItem>
          <StyledSubContainer>
            <Typography variant="h6" component="h3" color="primary">
              <StyledLink href="https://hub.worldpop.org/geodata/summary?id=6545" target="_blank">
                Worldpop
              </StyledLink>
            </Typography>
            <StyledDivider />
            <Typography variant="body1">
              WorldPop (www.worldpop.org - School of Geography and Environmental Science, University of Southampton;
              Department of Geography and Geosciences, University of Louisville; Departement de Geographie, Universite
              de Namur) and Center for International Earth Science Information Network (CIESIN), Columbia University
              (2018). Global High Resolution Population Denominators Project - Funded by The Bill and Melinda Gates
              Foundation (OPP1134076).
            </Typography>
          </StyledSubContainer>
        </StyledDataItem>
        <StyledDataItem>
          <StyledSubContainer>
            <Typography variant="h6" component="h3" color="primary">
              Account Settings
            </Typography>
            <StyledDivider />
            <form>
              <TextField
                id="username"
                label="Username"
                value={formData.username}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                disabled={!formData.previousPassword} // Disable until previous password is entered
              />
              <TextField
                id="password"
                label="New Password"
                type="password"
                value={formData.password}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                disabled={!formData.previousPassword} // Disable until previous password is entered
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                disabled={!formData.previousPassword} // Disable until previous password is entered
              />
              <TextField
                id="previousPassword"
                label="Previous Password"
                type="password"
                value={formData.previousPassword}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              {formData.error && (
                <Typography variant="body2" color="error" gutterBottom>
                  {formData.error}
                </Typography>
              )}
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </form>
          </StyledSubContainer>
        </StyledDataItem>
      </StyledContainer>
    </>
  );
};

export default withAuthenticator(Profile, {
  socialProviders: ['google'],
});
