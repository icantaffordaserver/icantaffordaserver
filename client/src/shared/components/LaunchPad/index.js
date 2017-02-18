/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
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
      <div>
        <Header as="h1" color="teal" textAlign="center" className="LaunchPadHeader">
          My Launch Pad
        </Header>
        <Container className="LaunchPad">
          <Grid verticalAlign="middle" columns={3}>
            <Grid.Row>
              <Grid.Column>
                <LaunchPadItem
                  imgSrc={computer}
                  header="Join my Shift"
                />
              </Grid.Column>
              <Grid.Column>
                <LaunchPadItem
                  imgSrc={diamond}
                  header="Watch your Firestarter"
                />
              </Grid.Column>
              <Grid.Column>
                <LaunchPadItem
                  imgSrc={selection}
                  header="When are you available?"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <LaunchPadItem
                  imgSrc={tap}
                  header="Request a Shift"
                />
              </Grid.Column>
              <Grid.Column>
                <LaunchPadItem
                  imgSrc={pencil}
                  header="Reflect on your last Shift"
                />
              </Grid.Column>
              <Grid.Column>
                <LaunchPadItem
                  imgSrc={notes}
                  header="Add to your profile"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default LaunchPad;
