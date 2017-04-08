/**
 * Created by alexandermann on 2017-04-03.
 */
import gql from 'graphql-tag';

export default gql`
  mutation submitFireStarterSuggestionMutation($input: CreateFirestarterSuggestionsInput!) {
    createFirestarterSuggestions(input: $input) {
      clientMutationId
    }
  }
`;
