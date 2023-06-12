import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Container, Typography, Link, Divider } from '@mui/material';
import { styled } from '@mui/system';
import signoutImage from './images/signout.png';
import logo from './images/logo.png';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#3d4d5c',
  color: '#e6e6e6',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginTop: '50px'
}));

const StyledSubContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#1c2833',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const StyledDataItem = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

const StyledDivider = styled(Divider)({
  width: '100%',
  height: '2px',
  backgroundColor: '#e6e6e6',
  marginBottom: '10px'
});

const StyledLink = styled(Link)({
    color: '#e6e6e6',
    textDecoration: 'none',
    '&:hover': {
      color: '#90a7d5',
    },
  });
  

const UsedData = ({ signOut, user }) => {
  return (
    <>
      <header>
        <nav>
            <ul>
                <li style={{ textAlign: 'left', float: 'left' }}>
                <a href="/map"><img src={logo} style={{width: '24px', height: '24px'}} /></a>
                </li>
                <li style={{ textAlign: 'left', float: 'left', transform: 'translateX(-20%)' }}>
                <a href="/map">SAFEROUTE</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a href="/map">Map</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a className="navHover" href="/about">About</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a href="/used_data">Used data</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a href="https://33faoddqwe4bjauetiiaatreye0uirjf.lambda-url.eu-central-1.on.aws/docs" target="_blank">SWAGGER UI</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}><img
                    className="navHover"
                    src={signoutImage}
                    alt="Signout"
                    onClick={signOut} 
                    style={{ textAlign: 'right', cursor: 'pointer', width: '20px', height: '20px', transform: 'translateY(20%)'}}
                    />
                </li>
            </ul>
        </nav>
    </header>

      <StyledContainer>
        <StyledDataItem>
          <StyledSubContainer>
            <Typography variant="h6" component="h3" color="primary">
              <StyledLink href="https://hub.worldpop.org/geodata/summary?id=6545" target="_blank">Worldpop</StyledLink>
            </Typography>
            <StyledDivider />
            <Typography variant="body1">
              WorldPop (www.worldpop.org - School of Geography and Environmental Science, University of Southampton; Department of Geography and Geosciences, University of Louisville; 
              Departement de Geographie, Universite de Namur) and Center for International Earth Science Information Network (CIESIN), Columbia University (2018). 
              Global High Resolution Population Denominators Project - Funded by The Bill and Melinda Gates Foundation (OPP1134076).
            </Typography>
          </StyledSubContainer>
        </StyledDataItem>

        <StyledDataItem>
          <StyledSubContainer>
            <Typography variant="h6" component="h3" color="primary">
              <StyledLink href="https://catalog.data.gov/dataset/nypd-arrests-data-historic" target="_blank">Crime data</StyledLink>
            </Typography>
            <StyledDivider />
            <Typography variant="body1">
            List of every arrest in NYC going back to 2006 through the end of the previous calendar year. 
            This is a breakdown of every arrest effected in NYC by the NYPD going back to 2006 through the end of the previous calendar year. 
            This data is manually extracted every quarter and reviewed by the Office of Management Analysis and Planning before being posted on the NYPD website. 
            Each record represents an arrest effected in NYC by the NYPD and includes information about the type of crime, the location and time of enforcement. 
            In addition, information related to suspect demographics is also included. This data can be used by the public to explore the nature of police enforcement activity.
            </Typography>
          </StyledSubContainer>
        </StyledDataItem>

        <StyledDataItem>
          <StyledSubContainer>
            <Typography variant="h6" component="h3" color="primary">
              <StyledLink href="https://data.census.gov/table?q=b19013&g=040XX00US50$0600000&tid=ACSDT5Y2021.B19013&tp=true" target="_blank">Income data</StyledLink>
            </Typography>
            <StyledDivider />
            <Typography variant="body1">
            Original data came from here, but project used GEOCODIO to retrieve info from this table.
            </Typography>
          </StyledSubContainer>
        </StyledDataItem>
      </StyledContainer>
    </>
  );
};

export default withAuthenticator(UsedData, {
  socialProviders: ['google'],
});
