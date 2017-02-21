/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LaunchPadItem from './LaunchPadItem';
import './index.css';
import computer from './105_Reading.png';
import pencil from './009_Pencil.png';
import tap from './129_Tap.png';
import diamond from './049_Diamond.png';
import notes from './045_Notes.png';
import selection from './057_Selection.png';

class LaunchPad extends React.Component {

  render() {
    return (
      <Container>
        <Header as="h1" color="teal" textAlign="center" className="LaunchPadHeader">
          My Launch Pad
        </Header>
        <Grid className="LaunchPad" verticalAlign="middle" columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Link to="/chat">
                <LaunchPadItem
                  imgSrc={computer}
                  header="Join my Shift"
                />
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/dashboard/watch">
                <LaunchPadItem
                  imgSrc={diamond}
                  header="Watch your Firestarter"
                />
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/dashboard/availability">
                <LaunchPadItem
                  imgSrc={selection}
                  header="When are you available?"
                />
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link to="/dashboard/request">
                <LaunchPadItem
                  imgSrc={tap}
                  header="Request a Shift"
                />
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/dashboard/reflect">
                <LaunchPadItem
                  imgSrc={pencil}
                  header="Reflect on your last Shift"
                />
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/dashboard/profile">
                <LaunchPadItem
                  imgSrc={notes}
                  header="Add to your profile"
                />
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default LaunchPad;
