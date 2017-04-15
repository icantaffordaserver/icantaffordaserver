/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import ThumbsRating from './ThumbsRating';

const View = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const propTypes = {};

const defaultProps = {};

class EditReflectionView extends React.Component {
  render() {
    return (
      <View>
        <Header textAlign="center" content="You rated your conversation:" />
        <ThumbsRating rating={3} viewOnly />
        <Header textAlign="center" content="Your Comment" />
        <Header textAlign="center" content="Ya the conversation sucked!" color="grey" />
      </View>
    );
  }
}

EditReflectionView.propTypes = propTypes;
EditReflectionView.defaultProps = defaultProps;

export default EditReflectionView;
