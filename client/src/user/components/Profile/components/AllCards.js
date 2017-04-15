/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
 
`;

const Card = styled.div`
  margin: 15px;
  padding: 10px;
  flex-grow: 1;
  max-width: 250px;
  border: 2px solid;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  
  &:hover {
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

const propTypes = {
  profileResponses: React.PropTypes.object,
};

const defaultProps = {
  profileResponses: {},
};

class AllCards extends React.Component {
  renderQuestion(questionText) {
    return <strong>{questionText}</strong>;
  }

  renderAnswer(answerArray) {
    return (
      <div>
        {answerArray.map(answer => <div key={answer}>{answer}</div>)}
      </div>
    );
  }

  render() {
    const { profileResponses } = this.props;
    return (
      <CardContainer>
        {Object.keys(profileResponses).map(key => (
          <Card key={key}>

            {this.renderQuestion(profileResponses[key].questionText)}

            {this.renderAnswer(profileResponses[key].answer)}

          </Card>
        ))}
      </CardContainer>
    );
  }
}

AllCards.propTypes = propTypes;
AllCards.defaultProps = defaultProps;

export default AllCards;
