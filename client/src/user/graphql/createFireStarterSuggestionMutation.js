/**
 * Created by alexandermann on 2017-04-03.
 */
import gql from 'graphql-tag';

export default gql`
  mutation submitFireStarterSuggestionMutation($input: CreateFireStarterSuggestionsInput!) {
    createFireStarterSuggestions(input: $input) {
      clientMutationId
    }
  }
`;
